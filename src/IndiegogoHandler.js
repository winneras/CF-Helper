define(["CFBase"], function(CFBase) {
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
        console.log(indiegogoObj.data);
    };
});