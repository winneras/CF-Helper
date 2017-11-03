define(["CFBase"], function(CFBase) {
    return function() {
        var ZhongChouObj = CFBase;

        var titleDiv = jQuery(".jlxqTitle .jlxqTitle_h3")[0];
        if (titleDiv) {
            ZhongChouObj.setName(titleDiv.innerText);
        }
        

        var industryDiv = jQuery(".xqDetailRight .jlxqTitleText.siteIlB_box .gy.siteIlB_item a")[0];
        if (industryDiv) {
            ZhongChouObj.setIndustry(industryDiv.innerText);
        }


        var targetDiv = jQuery("#jlxqOuterBox > div > div.jlxqBox > div.xqDetailBox > div.xqDetailRight > div.xqRatioOuterBox > div.xqRatioText.clearfix > span.rightSpan > b")[0];
        if (targetDiv) {
            ZhongChouObj.setTarget(targetDiv.innerText);
            ZhongChouObj.setCurrency(targetDiv.innerText);
        }
        

        var amountDiv = jQuery("#jlxqOuterBox > div > div.jlxqBox > div.xqDetailBox > div.xqDetailRight > div.xqDetailDataBox > div:nth-child(2) > p > span.ftP")[0];
        if (amountDiv) {
        	ZhongChouObj.setAmount(amountDiv.innerText);    
        }
        

        var completenessNo = ZhongChouObj.getCompleteness(ZhongChouObj.data.pAmount, ZhongChouObj.data.pTarget);
        ZhongChouObj.setCompleteness(completenessNo);

        if(completenessNo > 1){
            ZhongChouObj.setIsSuccess(true);
        } else {
            ZhongChouObj.setIsSuccess(false);
        }

        ZhongChouObj.setGoalType("fixed");

        ZhongChouObj.setProductStage("");

        ZhongChouObj.setCountry("China");

        ZhongChouObj.setTeamSize("");

        var backersDiv = jQuery("#jlxqOuterBox > div > div.jlxqBox > div.xqDetailBox > div.xqDetailRight > div.xqDetailDataBox > div:nth-child(1) > p > span.ftP")[0];

        if (backersDiv) {
            ZhongChouObj.setBackers(backersDiv.innerText);
        }
        
        var descDiv = jQuery("#xmxqBox")[0];
        ZhongChouObj.setWordCount(descDiv.innerText, "zh");

        var videos = jQuery("video");
        ZhongChouObj.setVideoCount(videos.length);

        var commentsDiv = jQuery("#xqTabNav_ul > li:nth-child(3) > b")[0];
        ZhongChouObj.setReviewCount(commentsDiv.innerText);

        var getPublishTimeAction = function(callback) {
        	

            ZhongChouObj.setPublishTime(startDateDom[0].innerText);
            ZhongChouObj.setEndDate(endDateDom[0].innerText);
            ZhongChouObj.setLastDays("", 10));
        };

/*
        var getDeliveryTimeAction = function() {
            var timeDivs = jQuery(".NS_projects__rewards_list.js-project-rewards time.js-adjust-time");
            ZhongChouObj.setDeliveryTime(timeDivs[timeDivs.length - 1].innerText);
        };

        ZhongChouObj.setUrl();

        var getAllPledges = function(){
            var pledgesDom = jQuery("#content-wrap .NS_projects__rewards_list.js-project-rewards ol li div.pledge__info span.money");
            var i = 0;
            var str;
            for(i = 0; i < pledgesDom.length; i++){
                str = pledgesDom[i].innerText;
                ZhongChouObj.addPledge(parseInt(str.match(/\d/g).join(""), 10));
            }
        };
        getAllPledges();
        getDeliveryTimeAction();
        getTeamSizeAction(getPublishTimeAction);
        */
    };
});