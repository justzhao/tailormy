try {

    include("common.js");
    println("_____clipshow.js______");

   var datatable="";
   var pageScript="";
    var oRequest = fetcher.request;
    println("the method is "+oRequest.method);

     if (oRequest.method=='GET') {

      //var response=fetcher.fetchText(oRequest);
     //var location=response.get("Location");
     //println("THE Location IS "+location);

     //oRequest.url="http://192.168.61.11/main/aspdata/aspedit/"+location;


     var oDom = fetchDocument(oRequest);
   
     var tablelist=oDom.evaluate(".//TABLE",oDom,"",0);


     if(tablelist.length==4)
     {
      var trs=oDom.evaluate(".//TR",tablelist[2],"",0);
   
      for(var i=1;i<trs.length-1;i++)
      {

    
          var tds=oDom.evaluate(".//TD",trs[i],"",0);

           
     
        datatable+="<tr>";
        datatable+="<td>"+tds[0].innerHTML +"</td>";
        datatable+="<td>"+tds[1].innerHTML +"</td>";
        datatable+="<td>"+tds[2].innerHTML +"</td>";
        datatable+="<td>"+tds[3].innerHTML +"</td>";
        datatable+="<td>"+tds[4].innerHTML +"</td>";

        datatable+="</tr>";
     
      }

      //获取页数表
      trs=oDom.evaluate(".//TR",tablelist[1],"",0);

      tds=oDom.evaluate(".//TD",trs[0],"",0);
      var page=tds[1].childNodes[0].innerHTML;
      var text=new TextShears();
      page=text.filterSegment(page,"转到","页");
      // page= page.replace(/\s/g,"");
      println("the page is "+page);

     }

 }else{
     var response=fetcher.fetchText(oRequest);
     var location=response.get("Location");

     oRequest.url="http://192.168.61.11/main/aspdata/aspedit/"+location;


     var oDom = fetchDocument(oRequest);
    // println("the location is "+oDom.outerHTML);
     //http://192.168.61.11/main/aspdata/aspedit/Data_Show.asp?strFdName=
     var tablelist=oDom.evaluate(".//TABLE",oDom,"",0);

   //  println("the length is "+tablelist.length);
     if(tablelist.length==4)
     {
      var trs=oDom.evaluate(".//TR",tablelist[2],"",0);
     // println("the length is "+trs.length);
      for(var i=1;i<trs.length-1;i++)
      {

       // println("the child is"+trs[i].childNodes.length);
          var tds=oDom.evaluate(".//TD",trs[i],"",0);

           
     
        datatable+="<tr>";
        datatable+="<td>"+tds[0].innerHTML +"</td>";
        datatable+="<td>"+tds[1].innerHTML +"</td>";
        datatable+="<td>"+tds[2].innerHTML +"</td>";
        datatable+="<td>"+tds[3].innerHTML +"</td>";
        datatable+="<td>"+tds[4].innerHTML +"</td>";

        datatable+="</tr>";
     
      }

      //获取页数表
      trs=oDom.evaluate(".//TR",tablelist[1],"",0);

      tds=oDom.evaluate(".//TD",trs[0],"",0);
      var page=tds[1].childNodes[0].innerHTML;
        var text=new TextShears();
      page=text.filterSegment(page,"转到","页");
     page= page.replace(/\s/g,"");
     // println("the page is "+page);

     }
 
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
