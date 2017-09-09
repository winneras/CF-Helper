define(["CFBase"], function(CFBase) {
    return function() {
        var indiegogoObj = CFBase;

        var getTitle = function(){
        	var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div:nth-child(1) > div.campaignHeaderBasics-title.ng-binding")[0];
        	return dom.innerText;
        };

        indiegogoObj.setName(getTitle());

        var getIndustry = function(){
        	var dom = jQuery("body > div:nth-child(9) > div > div > campaign-page > div > campaign-body > div > div.campaignBody-horizontal > div > div.campaignBody-leadSection > campaign-overview > div > div > campaign-pills > div > campaign-category > div > a")[0];
        	return dom.innerText;
        };

        indiegogoObj.setIndustry(getIndustry());


        var getAmount = function(){
        	var dom = jQuery("body > div.ng-scope > div > div > campaign-page > div > div > campaign-header-basics > div > div.campaignHeaderBasics-goalProgress > div > campaign-goal-progress > div > div.campaignGoalProgress-raised.ng-binding > span.campaignGoalProgress-raisedAmount.ng-binding")[0];
        	return dom.innerText;
        };
        indiegogoObj.setCurrency(getAmount());
        indiegogoObj.setAmount(getAmount());
        console.log(indiegogoObj.data);
    };
});