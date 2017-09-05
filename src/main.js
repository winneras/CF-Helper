var scripts = ["lib/require.js", "US_States.js", "cf-helper.js"];
var basePath = chrome.runtime.getURL("/");
var app = {};
var hostname = window.location.hostname;
var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "var basePath = \"" + basePath + "\"";
    document.getElementsByTagName("body")[0].appendChild(s);

app.loadScript = function(scriptName) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = basePath + scriptName;
    document.getElementsByTagName("body")[0].appendChild(script);
};
for (var i = 0; i < scripts.length; i++) {
    app.loadScript(scripts[i]);
}
if(hostname.indexOf("kickstarter") > 0){
  app.loadScript("KickstarterHandler.js");
}
