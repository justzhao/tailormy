try {

    include("common.js");
    println("_____ratequery.js______");

   var pageScript="";
    var oRequest = fetcher.request;
   // println("the method is "+oRequest.method);

     if (oRequest.method=='GET') {

     var oDom = fetchDocument(oRequest);

     // println(oDom.outerHTML);

       if(oDom!=null)
       {
     
        var aList=oDom.getElementsByTagName('A');
        var detailHref=aList[2].getAttribute('href');
        var lastSeven=aList[3].getAttribute('href');
        var sixAverage=aList[4].getAttribute('href');
        var milkCowAverage=aList[5].getAttribute('href');
        var yonCowAverage=aList[6].getAttribute('href');

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
