/*! 20220624191759
* Dynamsoft JavaScript Library
* Product: Dynamsoft Web Twain
* Web Site: https://www.dynamsoft.com
*
* Copyright 2022, Dynamsoft Corporation
* Author: Dynamsoft Support Team
*
* Module: PDF
* Version: 17.3
* 
*/
var Dynamsoft=self.Dynamsoft||{};Dynamsoft.DWT=Dynamsoft.DWT||{},Dynamsoft.aryAddonReadyFun=Dynamsoft.aryAddonReadyFun||[],Dynamsoft.AddonReady=Dynamsoft.AddonReady||function(e){Dynamsoft.aryAddonReadyFun.push(e)},function(){for(var e=[Dynamsoft.DWT],n=0;n<1;n++){var o=e[n];o.EnumDWT_ConvertMode={CM_RENDERALL:1,CM_IMAGEONLY:2,CM_AUTO:3,CM_RENDERALLWITHANNOTATION:4},o.EnumDWT_PDFCompressionType={PDF_AUTO:0,PDF_FAX3:1,PDF_FAX4:2,PDF_LZW:3,PDF_RLE:4,PDF_JPEG:5,PDF_JP2000:6,PDF_JBIG2:7}}}(),Dynamsoft.AddonReady(function(t,e){var n;!t.product.bHTML5Edition||t.DynamicLoadAddonFuns&&t.DynamicLoadAddonFuns.push(function(i){var e,d=t.html5.Funs;n=t.env.bMac?Dynamsoft.dcp.b64bit?"libDynamicPdfCorex64_"+Dynamsoft.DWT.PdfVersion+".dylib":"libDynamicPdfCore_"+Dynamsoft.DWT.PdfVersion+".dylib":t.env.bLinux?"libDynamicPdfCore_"+Dynamsoft.DWT.PdfVersion+".so":Dynamsoft.dcp.b64bit?"DynamicPdfCorex64_"+Dynamsoft.DWT.PdfVersion+".dll":"DynamicPdfCore_"+Dynamsoft.DWT.PdfVersion+".dll",i._isMobileMode()||i._innerSend("GetAddOnVersion",d.makeParams("pdf",n),!0,!1,!1),e={PDF:{IsModuleInstalled:function(){var e=i;return e._resetErr(),e._isMobileMode()?!!Dynamsoft.pdf&&Dynamsoft.pdf.IsModuleInstalled():""!=e._innerFun("GetAddOnVersion",d.makeParams("pdf",n))},IsModuleInstalledAsync:function(){var e=i;return e._resetErr(),e._isMobileMode()?Dynamsoft.pdf?t.Promise.resolve(Dynamsoft.pdf.IsModuleInstalled()):t.Promise.resolve(!1):e._innerFunV2("GetAddOnVersion",d.makeParams("pdf",n)).then(function(e){return""!=e})},ConvertToImage:function(e,n,o,r){var e=d.replaceLocalFilename(e),t="ConvertPDFToImage",s=i;return s._resetErr(),s._isMobileMode()||(d.showMask(t),s._innerSend(t,d.makeParams(e,n),!0,function(e){return d.hideMask(t),o&&o(),!0},function(e){return d.hideMask(t),r&&r(),!1})),!0},SetPassword:function(e){var n=i;return n._resetErr(),n._isMobileMode()?(n._pdfPassword=e,!0):n._innerFun("SetPDFPassword",d.makeParams(e))},SetConvertMode:function(e){return i._setConvertMode(e)},SetConvertModeAsync:function(e){return i._setConvertModeAsync(e)},GetConvertMode:function(){var e=i;return e._resetErr(),e._pdfConvertMode},SetResolution:function(e){var n=i;return n._resetErr(),n._isMobileMode()?(n._pdfResolution=+e,!0):i._innerFun("SetPDFResolution",d.makeParams(e))},SetResolutionAsync:function(e){var n=i;return n._resetErr(),n._isMobileMode()?(n._pdfResolution=+e,t.Promise.resolve(!0)):i._innerFunV2("SetPDFResolution",d.makeParams(e))},IsTextBasedPDF:function(e,n,o){var r=i;if(r._resetErr(),r._isMobileMode())return r._mobileNotSupport("IsTextBasedPDF",o);e=d.replaceLocalFilename(e),e=i._innerFun("IsTextBasedPDF",d.makeParams(e));return 0==r.ErrorCode?t.isFunction(n)&&n(e):t.isFunction(o)&&o(r.ErrorCode,r.ErrorString),e},Write:{Setup:function(e){var e=(e=e)||{version:15},n=(2<t.stringify(e).length&&(t.isNumber(e.version)?1<=e.version&&e.version<2&&(e.version=parseInt(10*e.version)):e.version=15),t.isNumber(e.compression)&&e.compression==Dynamsoft.DWT.EnumDWT_PDFCompressionType.PDF_FAX3&&(e.compression=Dynamsoft.DWT.EnumDWT_PDFCompressionType.PDF_FAX4),i);if(n._resetErr(),n._isMobileMode())return n._pdfWriteSetting=e,!0;e=t.stringify(e),e=t.replaceAll(e,'"','\\"');return n._innerFun("SetPDFSettings",['["',e,'"]'].join(""))}}}},i.__addon=i.__addon||{},t.mix(i.__addon,e)})}),Dynamsoft.AddonReady(function(i,e){!i.product.bActiveXEdition||i.DynamicLoadAddonFuns&&i.DynamicLoadAddonFuns.push(function(t){var e,s,n;if(!t.getSWebTwain()||!t.getSWebTwain().Addon)return!1;Dynamsoft.navInfo.bWin&&(n=!Dynamsoft.navInfo.bOSx64||Dynamsoft.navInfo.bWOW64?"DynamicPdfCore_"+Dynamsoft.DWT.PdfVersion+".dll":"DynamicPdfCorex64_"+Dynamsoft.DWT.PdfVersion+".dll"),s=t.getSWebTwain(),e={PDF:{IsModuleInstalled:function(){var e=s.GetAddOnVersion("pdf",n);return i.setErrorString(t),""!=e},IsModuleInstalledAsync:function(){var e=s.GetAddOnVersion("pdf",n);return i.setErrorString(t),i.Promise.resolve(""!=e)},ConvertToImage:function(e,n,o,r){e=s.ConvertPDFToImage(e,n);return i.wrapperRet(t,e,o,r)},SetPassword:function(e){e=s.SetPDFPassword(e);return i.wrapperRet(t,e)},SetConvertMode:function(e){return t._setConvertMode(e)},SetConvertModeAsync:function(e){return Promise.resolve(t._setConvertMode(e))},GetConvertMode:function(){return t._resetErr(),t._pdfConvertMode},SetResolution:function(e){e=s.SetPDFResolution(e);return i.wrapperRet(t,e)},SetResolutionAsync:function(e){e=s.SetPDFResolution(e);return i.Promise.resolve(i.wrapperRet(t,e))},IsTextBasedPDF:function(e){e=s.IsTextBasedPDF(e);return i.wrapperRet(t,e)}}},t.Addon=t.Addon||{},i.mix(t.Addon,e)})});