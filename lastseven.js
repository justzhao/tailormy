try {

    include("common.js");
    println("_____lastseven.js______");
    var datatable="";

    var oRequest = fetcher.request;

    var url=oRequest.url;
	var uriPar=new UriParser();
	var uri=uriPar.parse(url);
	var collection= uri.queryItems;
	var after=collection.getValue("strprogramname");
	println("the after is "+after);
	var newcode=URLEncode(after); 

   // oRequest.url = "http://192.168.61.11/main/aspdata/aspedit/kernel.asp?intaction=12&strprogramname=%B7%B1%D3%FD_%B2%CE%C5%E4%C9%E1%C9%CF%BC%D0%C2%CA_%D7%EE%BD%FC7%C8%D5";
  
  oRequest.url = "http://192.168.61.11/main/aspdata/aspedit/kernel.asp?intaction=12&strprogramname="+newcode;
    if (oRequest.method=='GET') {
   
		var oDom = fetchDocumentEncoding(oRequest,"gbk");
    	var text = oDom.outerHTML;
    	
		/*var location = repse.get("Location");
		println("location is "+ location);*/
		
		var tablelist=oDom.evaluate(".//TABLE",oDom,"",0);
		//println("tablelist length is "+tablelist.length);
		if(tablelist.length==4) {
			var trs=oDom.evaluate(".//TR",tablelist[2],"",0);
			println("trs length is "+trs.length);
			var td1 = oDom.evaluate(".//TD",trs[0],"",0);
			datatable+="<tr class=\"ui-bar-d\">";
			for(var i=0;i<td1.length;i++){
				
		        datatable+="<th>"+td1[i].innerHTML +"</th>";
		       /* datatable+="<th>"+td1[1].innerHTML +"</th>";
		        datatable+="<th>"+td1[2].innerHTML +"</th>";
		        datatable+="<th>"+td1[3].innerHTML +"</th>";
		        datatable+="<th>"+td1[4].innerHTML +"</th>";
		        datatable+="<th>"+td1[5].innerHTML +"</th>";
		        datatable+="<th>"+td1[6].innerHTML +"</th>";
		        datatable+="<th>"+td1[7].innerHTML +"</th>";
		        datatable+="<th>"+td1[8].innerHTML +"</th>";
		        datatable+="<th>"+td1[9].innerHTML +"</th>";
		        datatable+="<th>"+td1[10].innerHTML +"</th>";*/
		       
			}
			datatable+="</tr>";
			
			for(var i=1;i<trs.length-1;i++) {
				var tds=oDom.evaluate(".//TD",trs[i],"",0);
				//println("tds length is "+tds.length);
                
		        datatable+="<tr>";
		        datatable+="<td>"+tds[0].innerHTML +"</td>";
		        datatable+="<td>"+tds[1].innerHTML +"</td>";
		        datatable+="<td>"+tds[2].innerHTML +"</td>";
		        datatable+="<td>"+tds[3].innerHTML +"</td>";
		        datatable+="<td>"+tds[4].innerHTML +"</td>";
		        datatable+="<td>"+tds[5].innerHTML +"</td>";
		        datatable+="<td>"+tds[6].innerHTML +"</td>";
		        datatable+="<td>"+tds[7].innerHTML +"</td>";
		        datatable+="<td>"+tds[8].innerHTML +"</td>";
		        datatable+="<td>"+tds[9].innerHTML +"</td>";
		        datatable+="<td>"+tds[10].innerHTML +"</td>";

		        datatable+="</tr>";
			}

			//获取页数表
	      	trs=oDom.evaluate(".//TR",tablelist[1],"",0);

		    tds=oDom.evaluate(".//TD",trs[0],"",0);
		    var page=tds[1].childNodes[0].innerHTML;
		    var text=new TextShears();
		    page=text.filterSegment(page,"转到","页");
		    println("the page is "+page);
		}

    } else {
    	/*var response=fetcher.fetchText(oRequest);
    	var location=response.get("Location");
    	println("page location is "+location);*/
    	//oRequest.url="http://192.168.61.11/main/aspdata/aspedit/"+location;
    	////GET /main/aspdata/aspedit/Kernel.asp?intAction=3&PageNum=2&strFdName= HTTP/1.1
    }
} catch (e) {
     var szLocation = oRequest.url;
     var szMessage = e.name + ": " + e.message + "\n at (" + e.fileName + ":" + e.lineNumber + ")";
     log.error(szLocation, szMessage);
     println(szMessage);
}