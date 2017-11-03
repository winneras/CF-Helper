jQuery("body").addClass('cf-helper');
require.config({ baseUrl: basePath, waitSeconds: 2 });
require(["lib/moment.min", "KickstarterHandler", "IndiegogoHandler", "ZhongChouHandler"],
    function(moment, KickstarterHandler, IndiegogoHandler, ZhongChouHandler) {
        var hostname = window.location.hostname;
        if (hostname.indexOf("kickstarter") > 0) {
            KickstarterHandler();
        } else if (hostname.indexOf("indiegogo") > 0) {
            IndiegogoHandler();
        } else if (hostname.indexOf("zhongchou") > 0) {
        	ZhongChouHandler();
        }

    }
);