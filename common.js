///////////////////////////生产环境开始////////////////////////////////

const CONST_MIS_IP="http://192.168.61.11/";
//接本地环境地址
 
const CONST_TAILOR_IP="localhost"; 
const CONST_TAILOR_BASEURL="http://" + CONST_TAILOR_IP + ":1306/tailor/"; 
const CONST_TAILOR_RES_BASEURL="http://" + CONST_TAILOR_IP + ":8080/other/mis/";

     
 
 

//wl 1111
function logInfo(url, message) {
    /*
     var szMessage=application.get("LOG.Message.SUBJECT");

     if(szMessage)
     {
     log.detail(url,szMessage + ":" + message + ".");
     }
     else
     {
     log.detail(url, message);
     }
     */

}

function fetchDocument(request) {
    var oWebResponse = fetcher.fetchDocument(request);
    var oDocument = oWebResponse.document;
    return oDocument;
}

//wl 1111
function fetchText(request) {
    var szText = "";
    if (request.url.toLowerCase().endWith(".mht")) {
        var oWebResponse = fetcher.fetchStream(request);
        var oStream = oWebResponse.stream;
        szText = parseMHToHTML(oStream);
    }
    else {
        var oWebResponse = fetcher.fetchText(request);
        szText = oWebResponse.text;
    }

    return szText;

}

function fetchDocumentEncoding(request, encoding) {

    var szText = fetchTextEncoding(request,encoding);
    var oDOMParser=new DOMParser();
	var oDocument= oDOMParser.parseFromString(szText,"text/html")
     return oDocument;
 }
 function fetchXmlDocumentEncoding(request, encoding) {

    var szText = fetchTextEncoding(request,encoding);
    var oDOMParser=new DOMParser();
	var oDocument= oDOMParser.parseFromString(szText,"text/xml")
     return oDocument;


}
//wl 1111
function fetchTextEncoding(request, encoding) {

    var szText = "";
    if (request.url.toLowerCase().endWith(".mht")) {
        var oWebResponse = fetcher.fetchStream(request);
        var oStream = oWebResponse.stream;
        szText = parseMHToHTML(oStream);
    }
    else {
        var oWebResponse = fetcher.fetchText(request, encoding);
        szText = oWebResponse.text;
    }

    return szText;


}

//将字符串转换为unicode字符串
function getUnicodeString(sstr) {
    unicodestr = "";
    for (i = 0; i < sstr.length; i++) {
        unicodestr = unicodestr + sstr.charCodeAt(i) + ";";
    }

    return unicodestr;

}
 
 
 /*
 函数：把字符串转换为日期对象
 参数：yyyy-mm-dd hh:MM:ss或dd/mm/yyyy形式的字符串
 返回：Date对象
 注：IE下不支持直接实例化日期对象，如new Date("2011-04-06")
  */
 Date.prototype.convertDate = function (date) {
     var flag = true;
	 var dateParts =date.split(" ");
     var datefrontParts = dateParts[0].split("-");
     if (datefrontParts.length != 3) {
         datefrontParts = dateParts[0].split("/");
         if (datefrontParts.length != 3) {
             return null;
         }
         flag = false;
     }
     var newDate = new Date();
     if (flag) {
         // month从0开始
          newDate.setFullYear(datefrontParts[0], datefrontParts[1] - 1, datefrontParts[2]);
     }
     else {
         newDate.setFullYear(datefrontParts[2], datefrontParts[1] - 1, datefrontParts[0]);
     }
	 if(date.indexOf(":")>-1)
	 {
	     var dateBackParts = dateParts[1].split(":");
 		 var iHour=parseInt(dateBackParts[0] ,10);
		 var iMinute=parseInt(dateBackParts[1] ,10);
		 var iSecond=parseInt( dateBackParts[2],10);
		  newDate.setHours(iHour, iMinute,iSecond);
	 }
	 else
	 {
        newDate.setHours(0, 0, 0);
	 }
     return newDate;
 };
 
 
 /*
 函数：计算两个日期之间的差值
 参数：date是日期对象
       flag：ms-毫秒，s-秒，m-分，h-小时，d-天，M-月，y-年
 返回：当前日期和date两个日期相差的毫秒/秒/分/小时/天
  */
 Date.prototype.dateDiff = function (date, flag) {
     var msCount;
     var diff = this.getTime() - date.getTime();
     switch (flag) {
         case "ms":
             msCount = 1;
             break;
         case "s":
             msCount = 1000;
             break;
         case "m":
             msCount = 60 * 1000;
             break;
         case "h":
             msCount = 60 * 60 * 1000;
             break;
         case "d":
             msCount = 24 * 60 * 60 * 1000;
             break;
     }
     return Math.floor(diff / msCount);
 };
 

function TimeNow() {
    var d, s = "&Time=";
    var c = ":";
    d = new Date();
    s += d.getHours() + c;
    s += d.getMinutes() + c;
    s += d.getSeconds() + c;
    s += d.getMilliseconds();
    return (s);
}

function trimAll(s1) {
    re = / /g;
    return s1.replace(re, "");
}

function trim(str){//jiabei add 131206 for trim error
	return str.replace(/(^\s*)|(\s*$)/g, "")
}

function allTrim(str) {
    if (str != "" | str != null) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

function clearrn(str) {
    if (str != "" | str != null) {
        reg = /\n/g;
        var szTemp = str.replace(reg, "");
        reg = /\r/g;
        szTemp = szTemp.replace(reg, "");
        return szTemp;
    } else {
        return str;
    }
}

/*******************************************************************************
 * 名称: getCurrentTime
 * 功能: 取得当前时间
 * 输入: 无
 * 输出: 无
 * 返回: String
 ******************************************************************************/
function getCurrentTime() {
    var oNow = new Date()
    var hours = oNow.getHours()
    var minutes = oNow.getMinutes()
    var seconds = oNow.getSeconds()
    var timeValue = hours
    timeValue += ((minutes < 10) ? ":0" : ":") + minutes
    timeValue += ((seconds < 10) ? ":0" : ":") + seconds
    return timeValue
};

//time=" + this.getCurrentTime() + Math.random();
function getCurrentTimeAndRandom() {
    return getCurrentTime() + Math.random();
};

function removeScripts(dom, nsStr) {
    var xpath = ".//NS:SCRIPT";
    if (null == nsStr || nsStr.isEmpty()) {
        nsStr = "";
        xpath = ".//SCRIPT";
    }
    var oScripts = dom.evaluate(xpath, dom, nsStr.trim(), 0);
    if (oScripts) {
        for (var i = 0; i < oScripts.length; i++) {
            var oScript = oScripts.item(i);
            oScript.parentNode.removeChild(oScript);
        }
    }
}

/******************** string 的相关操作扩展 ****************************/

String.prototype.isEmpty = function () {
    return /^\s*$/.test(this);
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}

String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}

String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}
/******************** end of  string 的相关操作扩展 ****************************/

//功能介绍：检查第一个日期是否小于第二个日期
//参数说明：要检查的字符串(YYYY-MM-DD)
//返回值：false:不是 true:是
function datecompare(strDate1, strDate2) {
    //var  nYear2,   nMonth2,   nDay2, nMonth1,nDay1,nYear1;
    var nYear1 = strDate1.substr(0, 4);
    var nMonth1 = strDate1.substr(5, 2);
    var nDay1 = strDate1.substr(8, 2);
    var nYear2 = strDate2.substr(0, 4);
    var nMonth2 = strDate2.substr(5, 2);
    var nDay2 = strDate2.substr(8, 2);
    if (nYear1 > nYear2) {
        return false;
    }
    if (nYear1 == nYear2) {
        if (nMonth1 == nMonth2) {
            if (nDay1 >= nDay2)
                return false;
        }
        if (nMonth1 > nMonth2) {
            return false;
        }
    }
    return true;
}

//@获得单选框的值
function getRadioValue(doc, radioName) {
    var obj = doc.getElementsByName(radioName);
    if (null != obj && undefined != obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                return obj[i].value;
            }
        }
    } else {
        return "";
    }
}

//@设定单选框的值
function setCheckedValue(doc, radioName, newValue) {
    if (!radioName)
        return;
    var radios = doc.getElementsByName(radioName);
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
        if (radios[i].value == newValue.toString()) {
            radios[i].checked = true;
        }
    }
}

/*******************************************************************************
 * 功能: 将日期转换成大写
 * 输入: 例：2009-10-11
 * 输出: 例：二零零九年十月十一日
 ******************************************************************************/
var chinese = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var len = ['十'];
var ydm = ['年', '月', '日'];
function num2chinese(s) {
    //将单个数字转成中文.
    s = "" + s;
    slen = s.length;
    var result = "";
    for (var i = 0; i < slen; i++) {
        result += chinese[s.charAt(i)];
    }
    return result;
}
//wl 1111
function isUrlFilterable(text, url) {

    var filterable = false;


    var oManifest = eval('(' + text + ')');
    var content_scripts = oManifest.content_scripts;
    if (!content_scripts) {

        return false;
    }
    for (var i = 0; i < content_scripts.length; i++) {

        var content_script = content_scripts[i];
        if (content_script && content_script.filterable && content_script.filterable == true) {
            var szMatch = content_script.matches[0];
            var oUrlPattern = new UrlPattern();
            filterable = oUrlPattern.match(szMatch, url);
            if (filterable) {
                break;
            }
        }
    }
    return filterable;
}

//修正ipad中打开页面中如果标题或者其他太长，会隐藏后面的内容；
function fixedStyleWidth(text) {
    var szText = text.replaceAll("style=\"width=", "style=\"width:");
    return szText;
}
function resizeIMGBarArea(doc, bar) {

    var oImgs = doc.evaluate(".//IMG", bar, "", 0);
    for (var i = 0; i < oImgs.length; i++) {
        var oImg = oImgs.item(i);
        oImg.setAttribute("height", "50");

    }
}
function resizeIMG70BarArea(doc, bar) {

    var oImgs = doc.evaluate(".//IMG", bar, "", 0);
    for (var i = 0; i < oImgs.length; i++) {
        var oImg = oImgs.item(i);
        oImg.setAttribute("height", "70");

    }
}
/**
 * 解码POST参数并转换成JSON字符串
 * @param request 需要解码的字符串所在的request
 * @return {String} 解码后的JSON字符串
 */
function unEscapeToJson(request) {
    var postData = urlDecoder(request.postData, "utf-8").split("&");
    var temp_json = {};
    for (var i = 0; i < postData.length; i++) {
        var temp_text = postData[i];
        var key = temp_text.substring(0, temp_text.indexOf("="));
        var val = temp_text.substring(temp_text.indexOf("=") + 1, temp_text.length);
        temp_json[key] = val;
    }
    return temp_json;
}

/*
 函数：格式化日期
 参数：formatStr-格式化字符串
 d：将日显示为不带前导零的数字，如1
 dd：将日显示为带前导零的数字，如01
 ddd：将日显示为缩写形式，如Sun
 dddd：将日显示为全名，如Sunday
 M：将月份显示为不带前导零的数字，如一月显示为1
 MM：将月份显示为带前导零的数字，如01
 MMM：将月份显示为缩写形式，如Jan
 MMMM：将月份显示为完整月份名，如January
 yy：以两位数字格式显示年份
 yyyy：以四位数字格式显示年份
 h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
 hh：使用12小时制将小时显示为带前导零的数字
 H：使用24小时制将小时显示为不带前导零的数字
 HH：使用24小时制将小时显示为带前导零的数字
 m：将分钟显示为不带前导零的数字
 mm：将分钟显示为带前导零的数字
 s：将秒显示为不带前导零的数字
 ss：将秒显示为带前导零的数字
 l：将毫秒显示为不带前导零的数字
 ll：将毫秒显示为带前导零的数字
 tt：显示am/pm
 TT：显示AM/PM
 返回：格式化后的日期
 */
Date.prototype.format = function (formatStr) {
    var date = this;
    /*
     函数：填充0字符
     参数：value-需要填充的字符串, length-总长度
     返回：填充后的字符串
     */
    var zeroize = function (value, length) {
        if (!length) {
            length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|T{2}|T{4}|yy(?:yy)?|([hHmst])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return date.getDate();
            case 'dd':
                return zeroize(date.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            case 'M':
                return date.getMonth() + 1;
            case 'MM':
                return zeroize(date.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
            case 'yy':
                return new String(date.getFullYear()).substr(2);
            case 'yyyy':
                return date.getFullYear();
            case 'h':
                return date.getHours() % 12 || 12;
            case 'hh':
                return zeroize(date.getHours() % 12 || 12);
            case 'H':
                return date.getHours();
            case 'HH':
                return zeroize(date.getHours());
            case 'm':
                return date.getMinutes();
            case 'mm':
                return zeroize(date.getMinutes());
            case 's':
                return date.getSeconds();
            case 'ss':
                return zeroize(date.getSeconds());
            case 'l':
                return date.getMilliseconds();
            case 'll':
                return zeroize(date.getMilliseconds());
            case 'tt':
                return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return date.getHours() < 12 ? 'AM' : 'PM';
            case 'TTTT':
            {
                var h=date.getHours();
                if(h>=0 && h<5) return "凌晨";
                if(h>=5 && h<7) return "清晨";
                if(h>=7 && h<9) return "早晨";
                if(h>=9 && h<12) return "上午";
                if(h>=12 && h<14) return "中午";
                if(h>=14 && h<18) return "下午";
                if(h>=18 && h<19) return "傍晚";
                if(h>=19) return "晚上";
                /*
                switch (date.getHours()) {
                    case 0:
                        return "凌晨";
                    case 5:
                        return "清晨";
                    case 7:
                        return "早晨";
                    case 9:
                        return "上午";
                    case 12:
                        return "中午";
                    case 14:
                        return "下午";
                    case 18:
                        return "傍晚";
                    case 19:
                        return "晚上";
                }
                */
            };
        }
    });
}


/**/ //removed by new server code 0914

/**
 add by fang 13-01-17 处理正文中表格
 将所有表格控制在显示区内，点击提示文字后弹出覆盖整个正文区域的可上下左右拖动div并将原始表格显示在上面
 doc    :
 containorObj ： 原系统中包裹需要处理的表格的容器，不一定是整个正文区域，因为有些文件表头页脚等表格不需要处理。
 outerContainorObj : 整个正文区的容器，主要用于弹出层和其中表格的定位
 如果没有包裹全部内容的容器 需要创建一个并将正文所有html放置其中，然后再调用这个函数
 */
function handleZhengWenTab(doc, containorObj, outerContainorObj) {
    //edit by fang 2013-01 解决正文中表格超宽后无法显示的问题
    var showBigTabDivId = "showBigTabDiv"; 		//弹出层的id
    if (!outerContainorObj) {
        outerContainorObj = containorObj;
    }
    if (containorObj && outerContainorObj) {
        //设置容器内文字自动折行
        containorObj.setAttribute("style", "overflow: auto;word-break:break-all;word-wrap:break-word;");
        var oTextShears = new TextShears();
        var oTables = doc.evaluate(".//TABLE", containorObj, "", 0);
        var tabsLen = oTables.length;
        if (tabsLen > 0) {
            //查看原始table就显示在这个div里
            var showBigTabDiv = doc.createElement("DIV");
            showBigTabDiv.setAttribute("id", showBigTabDivId);
            //这里只设了showBigTabDiv的基本style，需要在jst中增加对其 top height的设定，将其定位覆盖在正文折叠div上
            showBigTabDiv.setAttribute("style", "display:none;overflow:visible;position:absolute;background:#FFF;width:100%;");
            //需要在jst中增加closeBigDiv(divid)函数
            showBigTabDiv.setAttribute("onclick", "closeBigDiv('" + showBigTabDivId + "')");
            for (var i = 0; i < tabsLen; i++) {
                var otable = oTables[i];
                var tabParent = otable.parentNode;
                var tabParentName = tabParent.nodeName;
                if (tabParent && "TD" !== tabParentName) {//表格中的表格不处理
                    //取可以放大的table的id 如果没有就生成一个
                    var tabId = otable.getAttribute("id");
                    tabId = (tabId) ? tabId.trim() : "";
                    if (tabId === "") {
                        tabId = "tailorGenTabId_" + i;
                        otable.setAttribute("id", tabId);
                    }
                    //把原表格复制一份放在showBigTabDiv里，并设为display:none
                    var tmpTab = otable.cloneNode(true);
                    var tmpStyle = tmpTab.getAttribute("style");
                    tmpStyle = tmpStyle ? tmpStyle + ";" : "";
                    tmpTab.setAttribute("style", tmpStyle + "display:none");
                    tmpTab.setAttribute("id", tmpTab.getAttribute("id") + "_big");
                    //表格第一行加关闭提示
                    var firstTr = doc.evaluate(".//TR", tmpTab, "", 1);
                    if (firstTr) {
                        var fTds = doc.evaluate("./TD", firstTr, "", 0);
                        var newTr = doc.createElement("TR");
                        var newTD = doc.createElement("TD");
                        newTD.setAttribute("colspan", fTds.length);
                        var closeAttSpan = doc.createElement("SPAN");
                        closeAttSpan.setAttribute("style", "font-size:1.5em; font-weight:bolder; background-color:C0C0DB;");
                        var closeAttSpanTxt = doc.createTextNode("点击屏幕返回正文");
                        closeAttSpan.appendChild(closeAttSpanTxt);
                        newTD.appendChild(closeAttSpan);
                        newTr.appendChild(newTD);
                        firstTr.parentNode.insertBefore(newTr, firstTr);
                    }
                    showBigTabDiv.appendChild(tmpTab);
                    var attSpan = doc.createElement("SPAN");
                    attSpan.setAttribute("style", "font-size:1.5em; font-weight:bolder; background-color:C0C0DB;");
                    var spanTxt = doc.createTextNode("点击查看原始表格");
                    attSpan.appendChild(spanTxt);
                    /**showTab要求传入3个参数 : tabId, containorId, bigTabDivID
                     tabId：要显示出来的table的id；
                     containorId: 折叠区域里包裹正文内容的容器,用于弹出层的定位
                     这里showTab函数传tabId而不是tabId + "_big" 是因为在jst中显示table的时候需要取显示的table的位置
                     bigTabDivID: 弹出层的id
                     */
                    attSpan.setAttribute("onclick", "showTab('" + tabId + "', '" + outerContainorObj.id + "', '" + showBigTabDivId + "')");
                    if ("DIV" !== tabParentName) {//如果表格的容器不是div就给套上一个
                        var tabDiv = doc.createElement("DIV")
                        tabDiv.setAttribute("style", "word-break:break-all;word-wrap:break-word;");
                        tabDiv.appendChild(attSpan);
                        tabDiv.appendChild(otable.cloneNode(true));
                        tabParent.replaceChild(tabDiv, otable);
                    } else {
                        tabParent.insertBefore(attSpan, otable);
                    }
                }
                otable.setAttribute("style", styleStr);
                var oTds = doc.evaluate(".//TD", otable, "", 0);
                var otd;
                for (var j = 0; j < oTds.length; j++) {
                    otd = oTds.item(j);
                    otd.removeAttribute("nowrap");
                    otd.removeAttribute("width");
                    styleStr = otd.getAttribute("style");
                    styleStr = oTextShears.filterSegment(styleStr, "width:", ";");
                    otd.setAttribute("style", styleStr);
                }
                //修改margin-left为负数的table 在外面加个div margin-left设为table的margin-left的绝对值
                otable.removeAttribute("width");
                var styleStr = otable.getAttribute("style");
                styleStr = oTextShears.filterSegment(styleStr, "width:", ";");
                var margin = oTextShears.extractSegment(styleStr, "margin-left", ";");
                if (margin) {
                    margin = margin.trim().toLowerCase();
                    var marginUnit = "";
                    if (margin != "" && margin.indexOf("pt" > 0)) {
                        marginUnit = "pt";
                        margin = oTextShears.extractSegmentInner(styleStr, ":", "pt");
                    } else if (margin.indexOf("em" > 0)) {
                        marginUnit = "em";
                        margin = oTextShears.extractSegmentInner(styleStr, ":", "em");
                    } else {
                        margin = oTextShears.extractSegmentInner(styleStr, ":", ";");
                    }
                    if (margin < 0) {
                        if (tabParent) {
                            var tabDiv = doc.createElement("DIV")
                            tabDiv.setAttribute("style", "word-break:break-all;word-wrap:break-word;margin-left:" + Math.abs(margin) + marginUnit);
                            tabDiv.appendChild(otable.cloneNode(true));
                            tabParent.replaceChild(tabDiv, otable);
                        }
                    }
                }
            }
            //把showBigTabDiv加到容器里
            containorObj.appendChild(showBigTabDiv);
        }
    }
    return containorObj;
}

/**
 给图片加上放大缩小按钮
 dom        :    document对象
 area    :    需要处理其中图片的容器
 step    :    放大缩小的步长
 */
function reBuildAllImg(dom, area, step) {
    if (!step) {
        step = 1.5;
    }
    var imgs = dom.evaluate(".//IMG", area, "", 0);
    if (imgs) {
        for (var i = 0; i < imgs.length; i++) {
            var theImg = imgs.item(i);
            var theIid = "dcl" + i;
            theImg.setAttribute("id", theIid);
            theImg.setAttribute("ow", theImg.getAttribute("width"));
            theImg.setAttribute("oh", theImg.getAttribute("height"));
            theImg.setAttribute("width", "200");
            theImg.setAttribute("height", "100");
            var tt = "<input id=\"btn1\" type=\"button\" data-role=\"none\" value=\"放大\" onclick=\"ImageChange(true,'" + theIid + "'," + step + ")\" />&nbsp;<input id=\"btn2\" data-role=\"none\" type=\"button\" value=\"缩小\" onclick=\"ImageChange(false,'" + theIid + "'," + step + ")\" />";
            tt += "&nbsp;<input id=\"btnyuanshi\" type=\"button\" data-role=\"none\" value=\"原图\" onclick=\"ImageChange(true,'" + theIid + "'," + step + ",true)\" />";
            tt += "&nbsp;<input id=\"btnnormal\" type=\"button\" data-role=\"none\" value=\"初始\" onclick=\"ImageChange(true,'" + theIid + "'," + step + ",false)\" /><br/>";

            theImg.innerHTML = "<br />" + tt + "<br />";
        }
    }
}