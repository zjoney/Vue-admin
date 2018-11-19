import { Loading } from 'element-ui';

let HOST = process.env.HOST;
export const phoneRegExp = /^\(\d{3}\)\d{3}\-\d{4}$/
export const getDownloadPrefix = () => {
  switch (HOST) {
    case 'prod':
      return 'https://developer.pax.us/api/v1/files/download?isDownload=false&path='
    case 'test':
      return 'http://192.168.6.72:8090/api/v1/files/download?isDownload=false&path='
    default:
      return '/api/v1/files/download?isDownload=false&path='
  }
}

export const showPdf = () => {
  let elements = document.getElementsByClassName('pdf-container')
  for (let index = 0; index < elements.length; index++) {
    let container = elements[index]
    let desiredWidth = container.parentNode.offsetWidth;
    if (container.childNodes.length <= 1) {
      //显示转圈
      let loadingInstance = Loading.service({ target: container, text: 'Loading...' })
      PDFJS.getDocument(container.getAttribute('file')).then((pdf) => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf.getPage(pageNum).then((page) => {
            let viewport = page.getViewport(1);
            let scale = desiredWidth / viewport.width;
            let scaledViewport = page.getViewport(scale);

            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;

            let renderContext = {
              canvasContext: context,
              viewport: scaledViewport
            };
            page.render(renderContext);

            container.appendChild(canvas);
          });
        }
        loadingInstance.close()
      })
    }
  }
}
export const drawPdf = () => {
  var pdfObj = document.getElementsByClassName('ppn-pdf-link');
  PDFJS.disableTextLayer = false;
  for (var j = 0; j < pdfObj.length; j++) {
    var nowsrc = pdfObj[j].getAttribute('href');
    var nowPdf = pdfObj[j];
    var isRendered = pdfObj[j].getAttribute('data-rendered');



    if (!isRendered && nowsrc && nowPdf.innerHTML.indexOf('.pdf') != '-1') {


      nowPdf.setAttribute('data-rendered', "1");
      // var options = {
      //   height: "400px"
      // };
      // PDFObject.embed(nowsrc, nowPdf, options);

      var domFrag = document.createElement('div');

      var loadingDiv = document.createElement('div');
      loadingDiv.style.width = '0%'
      loadingDiv.style.height = "5px";
      loadingDiv.style.marginBottom = "5px";
      loadingDiv.style.background = "skyblue";
      loadingDiv.style.transition = "width .2s linear";
      nowPdf.appendChild(loadingDiv);
      var nowTime = new Date().getTime();
      //pdfjs
      PDFJS.getDocument(nowsrc).then(function getPdfHelloWorld(pdf) {

        var t = { loadedPageCount: 0 };
        t.totalPage = pdf.numPages;//总页数
        function getStyle(element, attr) {
          if (window.getComputedStyle) {
            return window.getComputedStyle(element)[attr];
          } else {
            return getComputedStyle(element, false)[attr];
          }
        }
        var nowContainerWidth = getStyle(document.getElementById('doc-container'), 'width');

        if (nowContainerWidth) {
          console.warn(nowContainerWidth)
          nowContainerWidth = parseInt(nowContainerWidth) - 40;
        }
        //我是一次加载了所有页，网上一些是一页页加载的，因为我的pdf页数不多
        // for (let i = 1; i <= t.totalPage; i++) {
        // console.log(loadingDiv, nowLoadingStatus);
        // }

        var nowIndex = 1;
        function renderPage(i, nowContainerWidth, pdf) {
          pdf.getPage(i).then(function getPageHelloWorld(page) {
            var scale = 0.35;//缩放倍数，1表示原始大小
            var viewport = page.getViewport((nowContainerWidth) / page.getViewport(1.0).width);
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.style.maxWidth = '100%';
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            var canvasContainer = document.createElement('div');
            canvasContainer.style.position = "relative";

            var textDiv = document.createElement('div');
            textDiv.setAttribute('class', 'textLayer')
            textDiv.style.zIndex = "100";

            page.render(renderContext).promise.then(function () {
              t.loadedPageCount++;//加载一个+1，最后总数和totalPage一样了，表示pdf加载完了
              var nowLoadingStatus = t.loadedPageCount / t.totalPage;
              if (nowLoadingStatus >= 1) {
                nowLoadingStatus = 1;

              };
              var afterTime = new Date().getTime();
              // if (t.loadedPageCount > 10) {
              //   canvasContainer.style.display = "none";
              // }
              loadingDiv.style.width = nowLoadingStatus * 100 + '%'
              // loadingDiv.innerHTML = parseInt(nowLoadingStatus * 100) + '%';
              if (t.loadedPageCount < t.totalPage) {
                nowIndex++
                renderPage(nowIndex, nowContainerWidth, pdf);
              } else {
                setTimeout(() => {
                  loadingDiv.style.background = "transparent";
                  nowPdf.removeChild(loadingDiv);
                }, 350)
              }
            });

            page.getTextContent().then(function (textContent) {

              PDFJS.renderTextLayer({
                textContent,
                container: textDiv,
                viewport,
                textDivs: []
              });
              // var textLayer = new TextLayerBuilder({
              //   textLayerDiv: textDiv,
              //   pageIndex: i - 1,
              //   viewport: viewport
              // });

              // textLayer.setTextContent(textContent);
              // textLayer.render();
            })
            // console.log(page.textLayer);

            canvasContainer.appendChild(canvas);
            canvasContainer.appendChild(textDiv);
            canvasContainer.setAttribute('class', 'canvas-container')
            // domFrag.appendChild(canvasContainer);
            nowPdf.appendChild(canvasContainer);

          });
        }
        renderPage(nowIndex, nowContainerWidth, pdf);
        // console.log(domFrag, nowPdf)
        // nowPdf.removeChild(loadingDiv);
        // nowPdf.appendChild(domFrag);
      })

    }

  }
}
export const handlePhoneChangeEvent = function (event) {
  // handlePhoneChange(event) {
  var keyCode = event.keyCode;
  var beforeValue = event.target.value;
  var nowValue = event.target.value;
  if (nowValue.length > 13) {
    nowValue = nowValue.slice(0, 13)
  }
  var nowValueStr = event.target.value;
  if (keyCode == 8 || keyCode == 37 || keyCode == 39) {
    // this.phoneDelete = false;
    // var val = nowValue;
    // if (val.slice(-2, -1) == "-") {
    //   nowValue = val.slice(0, -2);//''//val.slice(0, -2);
    // }
    // if (nowValue.length == 1) {
    //   event.target.value = ''
    // } else if (nowValue.length == 5) {
    //   event.target.value = nowValue.slice(0, 4)
    // } else if (nowValue.length == 9) {
    //   event.target.value = nowValue.slice(0, 8)
    // }
  } else {
    // console.log(keyCode);
    nowValue = nowValue.replace(/[\(\)\-]/g, '')

    var valArr = nowValue.split('');
    var norMounseStart = event.target.selectionEnd;
    // console.log("event.target.selectionEnd",event.target.selectionEnd)
    var norMounseEnd = event.target.selectionStart;

    var isEdit = 0;
    if (nowValue.length >= 1 && nowValue.indexOf('(') == -1) {
      valArr.splice(0, 0, '(')
      // console.log(valArr)
      nowValueStr = valArr.join('');
      isEdit = 1;
    }
    if (nowValue.length >= 3 && nowValue.indexOf(')') == -1) {
      valArr.splice(4, 0, ')')
      nowValueStr = valArr.join('');
      isEdit = 1;
    }
    if (nowValue.length >= 6 && nowValue.indexOf('-') == -1) {
      valArr.splice(8, 0, '-');
      nowValueStr = valArr.join('');
      isEdit = 1;
    }
    event.target.value = nowValueStr;
    if (norMounseEnd == norMounseStart) {
      if (event.target.value.length - 1 > norMounseStart) {
        event.target.selectionEnd = norMounseStart;
        event.target.selectionStart = norMounseStart
        if (beforeValue.indexOf('(') == -1) {
          event.target.selectionEnd = event.target.value.length
          event.target.selectionStart = event.target.value.length
        }
      } else {
        event.target.selectionEnd = norMounseStart + 1;
        event.target.selectionStart = norMounseStart + 1;
      }
    }
  }
  // this.phoneDelete = true;


  if (this.form && this.form.businessContactPhone) {
    this.form.businessContactPhone = event.target.value;
  } else if (this.form && this.form.phone) {
    this.form.phone = event.target.value;
  }else if(this.userForm&&this.userForm.phone){
    this.userForm.phone = event.target.value;
  }
  // return event.target.value;
  // }
  // }
}
