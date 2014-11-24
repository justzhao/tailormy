try {

    include("common.js");
    println("_____clipdetail.js______");

    var myselect="<select id=\"select1\" name=\"牧场\">";
    var cowselect="";
   var pageScript="";
    var oRequest = fetcher.request;

        //http://192.168.61.11/main/aspdata/aspedit/kernel.asp?intaction=10&strprogramname=%B7%B1%D3%FD_%B2%CE%C5%E4%C9%E1%C9%CF%BC%D0%C2%CA_%C3%F7%CF%B8%B2%E9%BF%B4
    var url=oRequest.url;
	var uriPar=new UriParser();
	var uri=uriPar.parse(url);
	var collection= uri.queryItems;
	var after=collection.getValue("strprogramname");

	/**
    var code="%E7%B9%81%E8%82%B2_%E5%8F%82%E9%85%8D%E8%88%8D%E4%B8%8A%E5%A4%B9%E7%8E%87_%E6%98%8E%E7%BB%86%E6%9F%A5%E7%9C%8B";

	
	
	
	
*/
	var newcode=URLEncode(after); 
	println("the after is "+newcode);
   //oRequest.url="http://192.168.61.11/main/aspdata/aspedit/kernel.asp?intaction=10&strprogramname=%B7%B1%D3%FD_%B2%CE%C5%E4%C9%E1%C9%CF%BC%D0%C2%CA_%C3%F7%CF%B8%B2%E9%BF%B4";
   oRequest.url="http://192.168.61.11/main/aspdata/aspedit/kernel.asp?intaction=10&strprogramname="+newcode;
     if (oRequest.method=='GET') {

     var oDom = fetchDocumentEncoding(oRequest,"gb2312");

     //println("the dom is "+oDom.outerHTML);

     if(oDom!=null) 
     {
        var select=oDom.getElementById('select1');
          
        var optionlist=oDom.evaluate("./OPTION",select,"",0);
        //println("the optionlist lenth is "+optionlist.length);

        
        for(var i=0;i<optionlist.length;i++)
        {
            myselect+="<option >"+optionlist[i].innerHTML+"</option>";
        }
        myselect+="</select>";

        select=oDom.evaluate(".//SELECT[@name='牛群分类']",oDom,"",1);
        cowselect=select.outerHTML;

     }

 }else{

/**
    var response=fetcher.fetchText(oRequest);
    var location=response.get("Location");

    if(checkLogin(response.text))
    {//login sucess
      pageScript="window.location.href='http://localhost:1306/tailor/"+CONST_MIS_IP+"homePage'";
    }else
    {//login fail

    pageScript="alert('用户名或者密码错误!');window.location.href='http://localhost:1306/tailor/"+CONST_MIS_IP+"'";
    }

*/

 
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


 