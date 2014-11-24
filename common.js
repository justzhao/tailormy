///////////////////////////生产环境开始////////////////////////////////

const CONST_MIS_IP="http://192.168.61.11/";
//接本地环境地址
 
const CONST_TAILOR_IP="localhost"; 
const CONST_TAILOR_BASEURL="http://" + CONST_TAILOR_IP + ":1306/tailor/"; 
const CONST_TAILOR_RES_BASEURL="http://" + CONST_TAILOR_IP + ":8081/other/mis/";

     
 
 

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
function URLEncode(vStr) {  
    var vGet = new String();  
    var gbData = [  
                          '啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥',  
                          '薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳',  
                          '病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖',  
                          '场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚',  
                          '础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮',  
                          '怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠',  
                          '丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二',  
                          '贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服',  
                          '浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹',  
                          '埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈',  
                          '骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖',  
                          '弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕',  
                          '肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱碱拣捡简俭剪减荐槛鉴践贱见键箭件',  
                          '健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸',  
                          '尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻',  
                          '俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀',  
                          '馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐',  
                          '痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿',  
                          '隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫',  
                          '谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸',  
                          '摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁',  
                          '拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗',  
                          '啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐',  
                          '恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠',  
                          '取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁',  
                          '伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳',  
                          '省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱',  
                          '恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔',  
                          '獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃',  
                          '汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威',  
                          '巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺',  
                          '稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓',  
                          '小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄',  
                          '选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶',  
                          '摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐',  
                          '印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉',  
                          '浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧',  
                          '铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政',  
                          '帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑',  
                          '住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座',  
                          '亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝',  
                          '佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼',  
                          '凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺',  
                          '邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝',  
                          '堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥',  
                          '荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺',  
                          '蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖',  
                          '摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼',  
                          '唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼',  
                          '帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉后徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺',  
                          '狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂',  
                          '恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾',  
                          '洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑',  
                          '濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣',  
                          '妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩',  
                          '纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬',  
                          '琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹',  
                          '椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋',  
                          '辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰',  
                          '搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻',  
                          '臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐',  
                          '怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨',  
                          '睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪',  
                          '铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔',  
                          '稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙',  
                          '瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃',  
                          '颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒',  
                          '蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋',  
                          '簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤',  
                          '酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜',  
                          '觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋',  
                          '鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄'  
                     ];  
    for (var i = 0; i < vStr.length; i++) {  
        var tmp = vStr.charAt(i);  
        var reg = /^[\u4e00-\u9fa5\uf900-\ufa2d]$/;  
        if (reg.test(tmp)) {  
            for (var area = 0; area < gbData.length; area++) {  
                var place = gbData[area].indexOf(tmp) + 1;  
                if (place) {  
                    area += 16;  
                    vGet += '%' + getUCase((0xA0 + area).toString(16));  
                    vGet += '%' + getUCase((0xA0 + place).toString(16));  
                    break;  
                }  
            }  
        } else {  
            var vPos = '~!@#$%^&*()-_+={}[]|\\:;"\'<>,.?/`'.indexOf(tmp);  
            vGet += vPos != -1 ? '%' + getUCase(tmp.charCodeAt(0).toString(16)) : tmp;  
        }  
    }  
    return vGet.replace(/\s/g, '+');  
    function getUCase(v) { return v.toUpperCase(); }  
}


