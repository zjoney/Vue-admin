﻿/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.

 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license

*/
(function(){CKEDITOR.plugins.add("uploadwidget",{lang:"en",requires:"widget,clipboard,filetools,notificationaggregator",init:function(a){a.filter.allow("*[!data-widget,!data-cke-upload-id]")}});CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools,{addUploadWidget:function(a,c,f){var h=CKEDITOR.fileTools,b=a.uploadRepository,m=f.supportedTypes?10:20;if(f.fileToElement)a.on("paste",function(d){d=d.data;var l=a.widgets.registered[c],k=d.dataTransfer,f=k.getFilesCount(),
g=l.loadMethod||"loadAndUpload",e,n;if(!d.dataValue&&f)for(n=0;n<f;n++)if(e=k.getFile(n),!l.supportedTypes||h.isTypeSupported(e,l.supportedTypes)){var m=l.fileToElement(e);e=b.create(e,void 0,l.loaderType);m&&(e[g](l.uploadUrl,l.additionalRequestParameters),CKEDITOR.fileTools.markElement(m,c,e.id),"loadAndUpload"!=g&&"upload"!=g||l.skipNotifications||CKEDITOR.fileTools.bindNotifications(a,e),d.dataValue+=m.getOuterHtml())}},null,null,m);CKEDITOR.tools.extend(f,{downcast:function(){return new CKEDITOR.htmlParser.text("")},
init:function(){var d=this,c=this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"),k=b.loaders[c],f=CKEDITOR.tools.capitalize,g,e;k.on("update",function(b){if(d.wrapper&&d.wrapper.getParent()){a.fire("lockSnapshot");b="on"+f(k.status);if("function"!==typeof d[b]||!1!==d[b](k))e="cke_upload_"+k.status,d.wrapper&&e!=g&&(g&&d.wrapper.removeClass(g),d.wrapper.addClass(e),g=e),"error"!=k.status&&"abort"!=k.status||a.widgets.del(d);a.fire("unlockSnapshot")}else a.editable().find('[data-cke-upload-id\x3d"'+
c+'"]').count()||k.abort(),b.removeListener()});k.update()},replaceWith:function(d,c){if(""===d.trim())a.widgets.del(this);else{var b=this==a.widgets.focused,f=a.editable(),g=a.createRange(),e,h;b||(h=a.getSelection().createBookmarks());g.setStartBefore(this.wrapper);g.setEndAfter(this.wrapper);b&&(e=g.createBookmark());f.insertHtmlIntoRange(d,g,c);a.widgets.checkWidgets({initOnlyNew:!0});a.widgets.destroy(this,!0);b?(g.moveToBookmark(e),g.select()):a.getSelection().selectBookmarks(h)}},_getLoader:function(){var a=
this.wrapper.findOne("[data-cke-upload-id]");return a?this.editor.uploadRepository.loaders[a.data("cke-upload-id")]:null}});a.widgets.add(c,f)},markElement:function(a,c,f){a.setAttributes({"data-cke-upload-id":f,"data-widget":c})},bindNotifications:function(a,c){function f(){h=a._.uploadWidgetNotificaionAggregator;if(!h||h.isFinished())h=a._.uploadWidgetNotificaionAggregator=new CKEDITOR.plugins.notificationAggregator(a,a.lang.uploadwidget.uploadMany,a.lang.uploadwidget.uploadOne),h.once("finished",
function(){var b=h.getTaskCount();0===b?h.notification.hide():h.notification.update({message:1==b?a.lang.uploadwidget.doneOne:a.lang.uploadwidget.doneMany.replace("%1",b),type:"success",important:1})})}var h,b=null;c.on("update",function(){!b&&c.uploadTotal&&(f(),b=h.createTask({weight:c.uploadTotal}));b&&"uploading"==c.status&&b.update(c.uploaded)});c.on("uploaded",function(){b&&b.done()});c.on("error",function(){b&&b.cancel();a.showNotification(c.message,"warning")});c.on("abort",function(){b&&
b.cancel();a.showNotification(a.lang.uploadwidget.abort,"info")})}})})();