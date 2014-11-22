try{
		include("common.js");
		println("");
		println("----------submit.js------------");
		println("");
		var userInfo="";
		
		var oRequest = fetcher.request;

				
		
	
		var _url = fetcher.client.request.url;
		println(_url);
		/**
		var hi = new hiddenSub_request("http://192.168.61.11/main/menu.asp?kscd_id=ROOT0007","","");
		hi.submit();
		*/
		var hi1 = new hiddenSub_request("http://192.168.61.11/main/menuhead.asp?kscd_id=ROOT0007","","");
		hi1.submit();
		/**
		var hi2 = new hiddenSub_request("http://192.168.61.11/main/menuinsert.asp","","");
		hi2.submit();
		var hi3 = new hiddenSub_request("http://192.168.61.11/main/menuleft.asp?kscd_id=ROOT0007","","");
		hi3.submit();
		*/

                                                                     
	
		
}catch(e){
		println(e+"\n");
		tailor.setTextResult("<div></div>");
}

function hiddenSub_request(postUrl,postData,type){
	this._url = postUrl;
	this.postData = postData;
	this.type = type;
	this.submit = function(){
		var request = new HttpServerRequest();
		request.method = "POST";
		request.url = this._url;
		request.postData = this.postData;
		//request.addHeader("Content-Type","application/xml");
		
		//var sz = fetchTextEncoding(request,"utf-8");
		//var sz = fetchText(request);
		var oDom=fetchDocument(request);
         if(oDom!=null)
         {
             var tables=oDom.getElementsByTagName('TABLE');
             var tds=oDom.getElementsByTagName('TD');
             userInfo=tds[7].innerHTML.substring(0,tds[7].innerHTML.indexOf('&nbsp'));
             //println("xxxxx"+tds[7].innerHTML);
         }
		//println(sz);
		
		/*
		var domParser = new DOMParser();
		var oGet = domParser.parseFromString(sz,this.type);	
		println(oGet);		
		if(oGet=="" || oGet==null){
			println("hiddenSub_request() oGet发生错误");
			return;	
		}
		return oGet;	
		*/
	}
	
}
 
 function checkSub(html){
 	             
 	if(html.indexOf('http://192.168.61.11/main/menu.asp?')!=-1){
 		return true;	
 	}
 	return false;
 }
 
 function checkIpad(str){
 		println("postParams====>"+str);
 		var s = "?"+str;
 		var ipad = getParFormUrl("Browser",s);
 		if(ipad.indexOf("ipad")!=-1){
 			application.set("Browser","ipad");	
 			println("yes ipad!!");
 			println("application get Browser-->"+application.get("Browser"));
 		}else{
 			println("not ipad!!");
 			application.set("Browser","");	
 		}
 	
 	}
 	function getParFormUrl(parName,Url){
			if(parName==null || Url==null || parName=="" || Url=="") return;
			var parameters = Url.substring(Url.indexOf("?")+1,Url.length);
			var pars = parameters.split("&");
			var result = "";
			for(var i=0;i<pars.length;i++){
				var p = pars[i];
				if(p.indexOf(parName) != -1){
					result = p.substring(p.indexOf(parName)+parName.length+1,p.length);
					return result;
				}
			}
			return false;
		}