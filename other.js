try {
    include("common.js");
    println("other.js");
    var request = fetcher.request;
    var oWebResponse = fetcher.fetchStream(request);
    var oStream = oWebResponse.stream;

    tailor.setStreamResult(oStream);
    tailor.contentType = oWebResponse.contentType;
} catch (e) {
    var errorMessage = e.name + ": " + e.message + "\n at (" + e.fileName + ":" + e.lineNumber + ")";
    log.error(fetcher.request.url, errorMessage);
    println(errorMessage);
    tailor.contentType = "text/html";
    tailor.setTextResult("");
}

