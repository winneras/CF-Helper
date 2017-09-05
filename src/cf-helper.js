jQuery("body").addClass('cf-helper');
require.config({ baseUrl: basePath, waitSeconds: 2 });
require(["lib/moment.min", "KickstarterHandler"], function(moment, KickstarterHandler) {
	var hostname = window.location.hostname;
    if (hostname.indexOf("kickstarter") > 0) {
        KickstarterHandler();
    }
    
});