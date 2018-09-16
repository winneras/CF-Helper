define(["lib/moment.min", "CFBase"], function(moment, CFBase) {
    return function() {
        var indiegogoObj = CFBase;

        var getTitle = function() {
            var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div:nth-child(1) > div.campaignHeaderBasics-title.ng-binding")[0];
            if(!dom){
            	dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div:nth-child(1) > div.campaignHeaderBasics-title")[0];
            }
            return dom.innerText;
        };

        indiegogoObj.setName(getTitle());

        var getIndustry = function() {
            var dom = jQuery("body > div:nth-child(9) > div > div > campaign-page > div > campaign-body > div > div.campaignBody-horizontal > div > div.campaignBody-leadSection > campaign-overview > div > div > campaign-pills > div > campaign-category > div > a")[0];
            if(!dom){
            	dom = jQuery("body campaign-category div.campaignCategory a")[0];
            }
            return dom.innerText;
        };

        indiegogoObj.setIndustry(getIndustry());


        var getAmount = function() {
            var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div.campaignHeaderBasics-goalProgress > div > campaign-goal-progress > div > div.campaignGoalProgress-raised.ng-binding > span.campaignGoalProgress-raisedAmount.ng-binding")[0];
            if(!dom){
                dom = jQuery("#main > campaign-header-basics > div > div.campaignHeaderBasics-goalProgress > campaign-goal-wrapper > div > campaign-goal-progress > div > div.campaignGoalProgress-raised > div.campaignGoalProgress-raisedAmountWrapper.ng-binding > span.campaignGoalProgress-raisedAmount.ng-binding")[0];
            }
            return dom.innerText;
        };
        indiegogoObj.setCurrency(getAmount());
        indiegogoObj.setAmount(getAmount());

        var getTargetAndCompleteness = function() {
            var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div.campaignHeaderBasics-goalProgress > div > campaign-goal-progress > div > div.campaignGoalProgress-details > div.campaignGoalProgress-detailsGoal > div")[0];
            if(!dom){
            	dom = jQuery("body div.campaignHeaderBasics-goalProgress div.campaignGoalProgress-details div.campaignGoalProgress-detailsGoal > div")[0];
            }
            var str = dom.innerText;
            var idx = str.indexOf(indiegogoObj.data.pCurrency);
            var target = str.substring(idx + indiegogoObj.data.pCurrency.length, str.length - 1);
            var completeness = str.substring(0, str.indexOf("%"));
            completeness = parseInt(completeness, 10) / 100;
            return [target, completeness];
        };

        indiegogoObj.setTarget(getTargetAndCompleteness()[0]);
        indiegogoObj.setCompleteness(getTargetAndCompleteness()[1]);

        var getGoalType = function(){
        	var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div.campaignHeaderBasics-goalProgress > div > campaign-goal-progress > div > div.campaignGoalProgress-details > div.campaignGoalProgress-detailsGoal > span")[0];
        	if(!dom){
            	dom = jQuery("body div.campaignGoalProgress-details div.campaignGoalProgress-detailsGoal > span")[0];
            }
            var str = dom.innerText;
            str = str.split(" ");
            return str[0].toLowerCase();

        };
        indiegogoObj.setGoalType(getGoalType());

        var getCountry = function(){
        	var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div:nth-child(1) > div.campaignHeaderBasics-assurance > campaign-header-trust > div > purchasable-trust > div > div > div.campaignTrust-detailsLocation")[0];
        	if(!dom){
            	dom = jQuery("body campaign-header-trust div.campaignTrust-detailsLocation")[0];
            }
            var str = dom.innerText;
            str = str.split(",");
            str = str[str.length - 1];
            return str.trim();
        };
        indiegogoObj.setCountry(getCountry());

        var setTeamSize = function(callback){
        	var doms;
        	var link = jQuery("body campaign-header-basics div.campaignHeaderBasics-assurance > campaign-header-trust > div > purchasable-trust > div > div > div.campaignTrust-detailsLinks > a");
        	link.click();
        	window.setTimeout(function(){
        		doms = jQuery("body campaign-modal div.campaignTrustInfo-sectionContent div.campaignTrustInfo-campaigner");
        		indiegogoObj.setTeamSize(doms.length + 1);
        		if(callback){
        			callback();
        		}
        		jQuery("body div.modal campaign-modal div.campaignTrustModal-header > a").click();
        	}, 1000);
        };
        

        var getBackers = function(){
        	var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div.campaignHeaderBasics-goalProgress > div > campaign-goal-progress > div > div.campaignGoalProgress-raised.ng-binding > span:nth-child(2)")[0];
        	if(!dom){
        		dom = jQuery("body campaign-page campaign-header-basics div.campaignHeaderBasics-goalProgress campaign-goal-progress div.campaignGoalProgress-raised span:nth-child(2)")[0];
        	}
        	var num = indiegogoObj.getNumberFromString(dom.innerText);
        	return num;
        };
        indiegogoObj.setBackers(getBackers());

        var getDescription = function(){
        	var dom = jQuery(".campaignBody-leadSection");
        	return dom[0].innerText;
        };
        indiegogoObj.setWordCount(getDescription());

        var getVideos = function(){
        	var iframes = jQuery("iframe");
        	var videos = jQuery("video");
        	return videos.length + indiegogoObj.videoFinder(iframes);
        };
        indiegogoObj.setVideoCount(getVideos());

        var getReviews = function(){
        	var dom = jQuery("body campaign-page campaign-body div.campaignBody-leadSection > campaign-navigation > tab-navigation > div > ul > li:nth-child(3) > a")[0];
        	if(!dom){
                dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > campaign-body > div > div.campaignBody-horizontal > div > div.campaignBody-leadSection > campaign-navigation > filter-tabs > div > ul:nth-child(4) > li > filter-tab > div > span")[0];
            }
            str = dom.innerText;
        	return indiegogoObj.getNumberFromString(str);

        };
        indiegogoObj.setReviewCount(getReviews());

        var getPublishDate = function(){
            try{
                var dateStr = userGon.data_layer.campaign_start_date;
                return moment(dateStr).format("DD/MM/YYYY");
            } catch(e) {
                var dateStr = window.gon.campaign.funding_started_at;
                return moment(dateStr).format("DD/MM/YYYY");
            }
        	
        };
        indiegogoObj.setPublishTime(getPublishDate());

        var getDeliveryDate = function(){
            try{
                var dateStr = userGon.data_layer.estimated_delivery_date;
                return moment(dateStr).format("DD/MM/YYYY");
            } catch(e) {
                var dateStr = window.gon.perks.estimated_delivery_date;
                return moment(dateStr).format("DD/MM/YYYY");
            }
        };
        indiegogoObj.setDeliveryTime(getDeliveryDate());


        var setIsSuccess = function(){
        	var is = false;
        	if(indiegogoObj.data.pCompleteness > 1){
        		is = true;
        	}
        	indiegogoObj.setIsSuccess(is);
        };
        setIsSuccess();

        indiegogoObj.setUrl();

        var getEndDate = function(){
            try{
                var dateStr = userGon.data_layer.campaign_end_date;
                return moment(dateStr).format("DD/MM/YYYY");
            } catch(e) {
                var dateStr = window.gon.campaign.funding_ends_at;
                return moment(dateStr).format("DD/MM/YYYY");
            }
        };
        indiegogoObj.setEndDate(getEndDate());

        var getLastDays = function(){
            var start, end;
            try{
                start = moment(userGon.data_layer.campaign_start_date);
                end = moment(userGon.data_layer.campaign_end_date);
            } catch(e){
                start = moment(window.gon.campaign.funding_started_at);
                end = moment(window.gon.campaign.funding_ends_at);
            }
        	
        	var diff = end - start;
        	return Math.ceil(diff/(24*60*60*1000));
        };

        indiegogoObj.setLastDays(getLastDays());

        var getAllPledges = function(){
            var pledgesDom = jQuery("campaign-page campaign-body campaign-perks > div campaign-next-perk div.campaignNextPerk-amount");
            var i = 0;
            var str;
            var length = pledgesDom.length / 2;
            for(i = 0; i < length; i++){
                str = pledgesDom[i].innerText;
                indiegogoObj.addPledge(parseInt(str.match(/\d/g).join(""), 10));
            }
        };
        getAllPledges();

        setTeamSize(function(){
        	indiegogoObj.copyToClip();
        });
        console.log(indiegogoObj.data);
    };
});