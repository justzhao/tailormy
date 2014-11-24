try {

    include("common.js");
    println("_____login.js______");

   var pageScript="";
    var oRequest = fetcher.request;
    println("the method is "+oRequest.method);

     if (oRequest.method=='GET') {
        globalSession.clearCookie();

     // globalsession.clearCookie();

     var oDom = fetchDocument(oRequest);

       if(oDom!=null)
       {
     var oForm=oDom.getElementById('frm_Verify');

     var action=oForm.getAttribute("action");

     var oInputCollector  =new InputCollector();
     var hiddenArea= oInputCollector.collectHiddenOuterHTML(oDom);

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

   //pageScript="window.location.href='http://localhost:1306/tailor/"+CONST_MIS_IP+"homePage'";
  //pageScript="window.location.href='http://localhost:1306/tailor/http://192.168.61.11/homePage'";
  // oRequest.url=CONST_MIS_IP+"main/"+location;
  // var res=fetcher.fetchText(oRequest);

  // println("the res is "+res.text);
  // tailor.setTextResult(res.text);
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
