try {

    include("common.js");
    println("_____ratequery.js______");

   var pageScript="";
    var oRequest = fetcher.request;

    var url = oRequest.url;    
    println("url is "+url);   //http://192.168.61.11/main/menumain.asp?CaiDan_ID=ROOT000700020017
    var title = ""; //查询标题
    var aArray = new Array();
    var a_html = "";
   // println("the method is "+oRequest.method);

     if (oRequest.method=='GET') {

     var oDom = fetchDocument(oRequest);

     // println(oDom.outerHTML);

       if(oDom!=null)
       {
     
        /*var aList=oDom.getElementsByTagName('A');
        var detailHref=aList[2].getAttribute('href');
        println("the detailHref is "+detailHref);
        var lastSeven=aList[3].getAttribute('href');
        var sixAverage=aList[4].getAttribute('href');
        var milkCowAverage=aList[5].getAttribute('href');
        var yonCowAverage=aList[6].getAttribute('href');*/
        var tblist = oDom.evaluate(".//TABLE",oDom,"",0);   
        title = oDom.evaluate(".//TD",tblist[0],"",1).innerHTML;
        aArray = getTrs(oDom, url,tblist[1]);
        for(var i=0;i<aArray.length;i++) {
            
            aArray[i] = (aArray[i])? aArray[i] : "";
            a_html += "<li>"+aArray[i]+"</li>";
            //println("a_html is "+a_html);
        }

        /**
     var oForm=oDom.getElementById('frm_Verify');

     var action=oForm.getAttribute("action");

     var oInputCollector  =new InputCollector();
     var hiddenArea= oInputCollector.collectHiddenOuterHTML(oDom);
    */
         }
 }else{


    var response=fetcher.fetchText(oRequest);
    var location=response.get("Location");

    if(checkLogin(response.text))
    {//login sucess
      pageScript="window.location.href='http://localhost:1306/tailor/"+CONST_MIS_IP+"homePage'";
    }else
    {//login fail

    pageScript="alert('用户名或者密码错误!');window.location.href='http://localhost:1306/tailor/"+CONST_MIS_IP+"'";
    }

;

 
 }
    


  

} catch (e) {
     var szLocation = oRequest.url;
     var szMessage = e.name + ": " + e.message + "\n at (" + e.fileName + ":" + e.lineNumber + ")";
     log.error(szLocation, szMessage);
     println(szMessage);
}
function  checkLogin(str)
{
    if(str.indexOf('menu.asp?')!=-1){
    return true;  
  }
  return false;

}
function  getTrs(dom, url,tblist_1) 
{
    //var td_a = "";
    var aArray = new Array();
    if(null!=url) {
        if(url.indexOf('20017') > -1) {
            trs = dom.evaluate(".//TR",tblist_1,"",0);
            //println("trs length "+trs.length);
            var j=0
            for(var i=2;i<trs.length;i++) {
                var tds = dom.evaluate(".//A",trs[i],"",1);
                aArray[j] = tds.outerHTML;
                //println("td href "+aArray[j]);
                j++;
            }
            //return aArray;
        } else if(url.indexOf('20019') > -1) {
            trs = dom.evaluate(".//TR",tblist_1,"",0);
            //println("trs length "+trs.length);
            var j=0
            for(var i=0;i<trs.length;i++) {
                var tds = dom.evaluate(".//A",trs[i],"",1);
                aArray[j] = tds.outerHTML;
                //println("td href "+aArray[j]);
                j++;
            }
            //return aArray;
        } else if(url.indexOf('20005') > -1) {
            trs = dom.evaluate(".//TR",tblist_1,"",0);
            //println("trs length "+trs.length);
            var j=0
            for(var i=3;i<trs.length-1;i++) {
                var tds = dom.evaluate(".//A",trs[i],"",1);
                aArray[j] = tds.outerHTML;
                //println("td href "+aArray[j]);
                j++;
            }
            //return aArray;
        }
        return aArray;
    }
        
}
