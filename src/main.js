var scripts = ["US_States.js", "cf-helper.js"];
for (var i = 0; i < scripts.length; i++) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.extension.getURL(scripts[i]);
  window.setTimeout(function(){
  	document.getElementsByTagName("body")[0].appendChild(script);
  }, 1000);
  
}