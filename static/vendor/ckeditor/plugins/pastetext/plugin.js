﻿/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.

 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license

*/
(function(){var f={canUndo:!1,async:!0,exec:function(a,b){var c=a.lang,e=CKEDITOR.tools.keystrokeToString(c.common.keyboard,a.getCommandKeystroke(CKEDITOR.env.ie?a.commands.paste:this)),d=b&&"undefined"!==typeof b.notification?b.notification:!b||!b.from||"keystrokeHandler"===b.from&&CKEDITOR.env.ie,c=d&&"string"===typeof d?d:c.pastetext.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+e.aria+'"\x3e'+e.display+"\x3c/kbd\x3e");a.execCommand("paste",{type:"text",notification:d?c:!1})}};CKEDITOR.plugins.add("pastetext",
{requires:"clipboard",lang:"en",icons:"pastetext,pastetext-rtl",hidpi:!0,init:function(a){var b=CKEDITOR.env.safari?CKEDITOR.CTRL+CKEDITOR.ALT+CKEDITOR.SHIFT+86:CKEDITOR.CTRL+CKEDITOR.SHIFT+86;a.addCommand("pastetext",f);a.setKeystroke(b,"pastetext");CKEDITOR.plugins.clipboard.addPasteButton(a,"PasteText",{label:a.lang.pastetext.button,command:"pastetext",toolbar:"clipboard,40"});if(a.config.forcePasteAsPlainText)a.on("beforePaste",function(a){"html"!=a.data.type&&(a.data.type="text")});a.on("pasteState",
function(b){a.getCommand("pastetext").setState(b.data)})}})})();