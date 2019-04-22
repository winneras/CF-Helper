define(["CFBase"], function(CFBase) {
    return function() {
        var KickstarterObj = CFBase;

        var titleDiv = jQuery("#content-wrap section div div:nth-child(2) div div div:nth-child(3) h2")[0];
        if (titleDiv) {
            
        } else {
            titleDiv = jQuery("#content-wrap > section > div.project-profile__content > div.NS_project_profile__title > h2 > span > a")[0];
        }
        if(!titleDiv){
            titleDiv = jQuery("#react-project-header > div > div > div.grid-row.pt9-lg.mt3.mt0-lg.mb6-lg.order-2-md.order-1-lg > div > div.grid-row.hide.flex-md.flex-column.flex-row-md.relative > div.col-20-24.block-md.order-2-md.col-lg-15-24 > h2")[0];
        }

        if(!titleDiv){
            titleDiv = jQuery("#react-project-header > div > div > div.grid-row.pt9-lg.mt3.mt0-lg.mb6-lg.order-2-md.order-1-lg > div > div.grid-row.hide.flex-md.flex-column.flex-row-md.relative > div.grid-col-10.grid-col-7-lg.grid-col-offset-0-md.block-md.order-2-md > h2")[0];
        }

        if(titleDiv){
            KickstarterObj.setName(titleDiv.innerText);
        }
        

        var industryDiv = jQuery("#content-wrap section .block-lg > .NS_projects__badges.mb3 a");
        if(industryDiv.length === 0){
            industryDiv = jQuery(".NS_projects__category_location a");
        }
        if(industryDiv.length === 0){
            industryDiv = jQuery("#react-project-header > div > div > div.order-1-md.hide-lg.border-top.border-bottom.border-top-none-md.border-none-lg.nested-full-width-xs.nested-full-width-sm.nested-full-width-md.mb4.mb5-sm.mb0-md > div > div > div > a");
        }
        try{
            if (industryDiv.length < 2) {
                KickstarterObj.setIndustry(industryDiv[industryDiv.length - 1].innerText);
            } else {
                KickstarterObj.setIndustry(industryDiv[industryDiv.length - 2].innerText);
            }
        } catch(e){
            industryDiv = jQuery("#react-project-header > div > div > div.grid-row.grid-row.mb5-lg.mb0-md.order-0-md.order-2-lg > div.col-full.col-lg-16-24 > div.hide.block-lg > div > div > div > div > a:nth-child(1) > span");
            KickstarterObj.setIndustry(industryDiv[0].innerText)
        }
        


        var targetDiv = jQuery("#content-wrap > section > div > div.grid-row.order-0-md.order-2-lg.mb5-lg.mb0-md > div.col-md-8-24.block-lg.hide > div.NS_campaigns__stats > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > span.block.navy-600.type-12.type-14-md.lh3-lg > span.money")[0];

        if (!targetDiv) {
            targetDiv = jQuery("#content-wrap > div.NS_projects__content > section.js-could-have-report-project.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-8.description-container > div:nth-child(1) > div.row > div.col-right.col-4.py3.border-left > div.mb3 > div > span")[0];
        }
        if(!targetDiv){
            targetDiv = jQuery("#content-wrap section.js-project-content.js-project-description-content.project-content .description-container div > span.money")[0];
        }
        if(!targetDiv){
            targetDiv = jQuery("#react-project-header > div > div > div.grid-row.grid-row.mb5-lg.mb0-md.order-0-md.order-2-lg > div.col-full.hide.block-lg.col-md-8-24 > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > span > span.inline-block-sm.hide > span")[0];
        }
        if(!targetDiv){
            targetDiv = jQuery("#react-project-header > div > div > div:nth-child(3) > div > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > span > span.inline-block-sm.hide > span")[0];
        }
        KickstarterObj.setTarget(targetDiv.innerText);
        KickstarterObj.setCurrency(targetDiv.innerText);

        var amountDiv = jQuery("#content-wrap > section > div > div.grid-row.order-0-md.order-2-lg.mb5-lg.mb0-md > div.col-md-8-24.block-lg.hide > div.NS_campaigns__stats > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > span.block.green-700.js-pledged.medium.type-16.type-24-md")[0];
        if (!amountDiv) {
            amountDiv = jQuery("#content-wrap > div.NS_projects__content > section.js-could-have-report-project.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-8.description-container > div:nth-child(1) > div.row > div.col-right.col-4.py3.border-left > div.mb3 > h3 > span")[0];
        }
        if (!amountDiv) {
            amountDiv = jQuery("#content-wrap > div.NS_projects__content.pt11 > section.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-8.description-container > div:nth-child(1) > div.row > div.col-right.col-4.py3.border-left.spotlight-project-video-archive > div.mb3 > h3 > span")[0];
        }
        if(!amountDiv){
            amountDiv = jQuery("#react-project-header > div > div > div.grid-row.grid-row.mb5-lg.mb0-md.order-0-md.order-2-lg > div.col-full.hide.block-lg.col-md-8-24 > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > div.flex.items-center > span > span")[0];
        }
        if(!amountDiv){
            amountDiv = jQuery("#pledged");
            KickstarterObj.setAmount(amountDiv.data("pledged"));
        } else {
            KickstarterObj.setAmount(amountDiv.innerText);
        }
        

        var completenessDiv = jQuery("#pledged");
        var completenessNo = completenessDiv.data("percentRaised");
        if (!completenessNo) {
            completenessNo = KickstarterObj.getCompleteness(KickstarterObj.data.pAmount, KickstarterObj.data.pTarget);
            
        } 
        KickstarterObj.setCompleteness(completenessNo);

        if(completenessNo > 1){
            KickstarterObj.setIsSuccess(true);
        } else {
            KickstarterObj.setIsSuccess(false);
        }

        KickstarterObj.setGoalType("fixed");

        KickstarterObj.setProductStage("");

        var countryDiv = jQuery("#content-wrap section .block-lg > .NS_projects__badges.mb3 a");
        if(countryDiv.length === 0){
            countryDiv = jQuery(".NS_projects__category_location a");
        }
        if(countryDiv.length === 0){
            countryDiv = jQuery("#react-project-header > div > div > div.order-1-md.hide-lg.border-top.border-bottom.border-top-none-md.border-none-lg.nested-full-width-xs.nested-full-width-sm.nested-full-width-md.mb4.mb5-sm.mb0-md > div > div > div > a");
        }
        try{
            if (countryDiv.length < 2) {
                KickstarterObj.setCountry(countryDiv[countryDiv.length - 2].innerText, KickstarterObj.kickstarterCountryHandler);
            } else {
                KickstarterObj.setCountry(countryDiv[countryDiv.length - 1].innerText, KickstarterObj.kickstarterCountryHandler);
            }
        } catch(e){
            countryDiv = jQuery("#react-project-header > div > div > div.grid-row.grid-row.mb5-lg.mb0-md.order-0-md.order-2-lg > div.col-full.col-lg-16-24 > div.hide.block-lg > div > div > div > div > a:nth-child(2) > span");
            KickstarterObj.setCountry(countryDiv[0].innerText, KickstarterObj.kickstarterCountryHandler);
        }


        var getTeamSizeAction = function(callback) {
            var ownerIco = jQuery("#content-wrap > section > div > div.grid-row.order-2-md.order-1-lg.pt9-lg.mt3.mt0-lg.mb6-lg > div > div > div.col-full.col-sm-22-24.col-offset-sm-1-24.col-md-4-24.col-offset-md-0-24.flex.items-center.flex-column-md.items-start-md.mb3.order-1-md > a");
            ownerIco.click();
            window.setTimeout(function() {
                var team = jQuery("#bio > div > div.col.col-7.col-post-1.pt3.pb3.pb10-sm > div.pt3.pt7-sm.mobile-hide.row > div");
                KickstarterObj.setTeamSize(team.length + 1);
                jQuery("#projects_show > div.modal_dialog.dark.modal_project_by > div > div > div > div > div.modal_dialog_head > a").click();
                if (callback) {
                    callback();
                }
            }, 1000);
        };

        var backersDiv = jQuery("#backers_count");
        var backersCountNo = backersDiv.data("backersCount");
        if (!backersCountNo) {
            backersDiv = jQuery("#content-wrap > div.NS_projects__content > section.js-could-have-report-project.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-8.description-container > div:nth-child(1) > div.row > div.col-right.col-4.py3.border-left > div.mb0 > h3")[0];
            backersCountNo = backersDiv ? backersDiv.innerText : void 0;
        }
        if(backersCountNo === void 0){
            backersDiv = jQuery("#content-wrap > div.NS_projects__content > section.js-project-content.js-project-description-content.project-content .description-container > div:nth-child(1) > div.row > div.col-right.border-left > div.mb0 > h3")[0];
            backersCountNo = backersDiv ? backersDiv.innerText : null;
        }
        if(!backersCountNo){
            backersDiv = jQuery("#react-project-header > div > div > div.grid-row.grid-row.mb5-lg.mb0-md.order-0-md.order-2-lg > div.col-full.hide.block-lg.col-md-8-24 > div.flex.flex-column-lg.mb4.mb5-sm > div.ml5.ml0-lg.mb2-lg > div > span")[0];
            backersCountNo = backersDiv ? backersDiv.innerText : null;
        }

        KickstarterObj.setBackers(backersCountNo);

        var descDiv = jQuery(".full-description.js-full-description")[0];
        KickstarterObj.setWordCount(descDiv.innerText);

        var videos = jQuery("video");
        KickstarterObj.setVideoCount(videos.length + KickstarterObj.videoFinder(jQuery("iframe")));

        var commentsDiv = jQuery("#content-wrap > div.NS_projects__content > div > div > div > div.project-nav__links > a.js-load-project-comments.js-load-project-content.mx3.project-nav__link--comments.tabbed-nav__link.type-14 > span > data");
        KickstarterObj.setReviewCount(commentsDiv.data("value"));

        var getPublishTimeAction = function(callback) {
            var startDateDom = jQuery("#content-wrap > div.NS_projects__content > section.js-could-have-report-project.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-4 > div.NS_campaigns__funding_period > p > time:nth-child(1)");
            var endDateDom = jQuery("#content-wrap > div.NS_projects__content > section.js-could-have-report-project.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-4 > div.NS_campaigns__funding_period > p > time:nth-child(2)");
            if(!startDateDom[0]){
                startDateDom = jQuery("#content-wrap > div.NS_projects__content.pt11 > section.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-4 > div.NS_campaigns__funding_period > p > time:nth-child(1)");
            }
            if(!endDateDom[0]){
                endDateDom = jQuery("#content-wrap > div.NS_projects__content.pt11 > section.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-4 > div.NS_campaigns__funding_period > p > time:nth-child(2)");
            }

            if(startDateDom[0]){
                KickstarterObj.setPublishTime(startDateDom[0].innerText);
            }
            if(endDateDom[0]){
                KickstarterObj.setEndDate(endDateDom[0].innerText);
            }
            var lastDaysDom  = jQuery("#content-wrap > div.NS_projects__content > section.js-could-have-report-project.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-4 > div.NS_campaigns__funding_period > p");
            if(!lastDaysDom[0]){
                lastDaysDom  = jQuery("#content-wrap > div.NS_projects__content.pt11 > section.js-project-content.js-project-description-content.project-content > div > div > div > div > div.col.col-4 > div.NS_campaigns__funding_period > p");
            }
            if(lastDaysDom[0]){
                var str = lastDaysDom[0].innerText;
                var idxS = str.indexOf("(");
                var idxE = str.indexOf(")");
                str = str.substring(idxS, idxE);
                KickstarterObj.setLastDays(parseInt(str.match(/\d/g).join(""), 10));
            }
            if(startDateDom[0]){
                if (callback) {
                    callback();
                }
                console.log(KickstarterObj.data);
                KickstarterObj.copyToClip();
                return;
            }
            var updateLink = jQuery("#content-wrap > div.NS_projects__content > div > div > div > div.project-nav__links > a.js-load-project-content.js-load-project-updates.mx3.project-nav__link--updates.tabbed-nav__link.type-14");
            updateLink.click();
            window.setTimeout(function() {
                var publishTimeDiv = jQuery(".timeline time.js-adjust-time");
                KickstarterObj.setPublishTime(publishTimeDiv[publishTimeDiv.length - 1].innerText);
                jQuery("#content-wrap > div.NS_projects__content > div > div > div > div.project-nav__links > a.js-load-project-content.js-load-project-description.mx3.project-nav__link--campaign.tabbed-nav__link.type-14").click();
                if (callback) {
                    callback();
                }
                console.log(KickstarterObj.data);
                KickstarterObj.copyToClip();
            }, 3000);
        };


        var getDeliveryTimeAction = function() {
            var timeDivs = jQuery(".NS_projects__rewards_list.js-project-rewards time.js-adjust-time");
            KickstarterObj.setDeliveryTime(timeDivs[timeDivs.length - 1].innerText);
        };

        KickstarterObj.setUrl();

        var getAllPledges = function(){
            var pledgesDom = jQuery("#content-wrap .NS_projects__rewards_list.js-project-rewards ol li div.pledge__info span.money");
            var i = 0;
            var str;
            for(i = 0; i < pledgesDom.length; i++){
                str = pledgesDom[i].innerText;
                KickstarterObj.addPledge(parseInt(str.match(/\d/g).join(""), 10));
            }
        };
        var getProfileAction = function(callback) {
            var profileIco = jQuery("#react-project-header > div > div > div.grid-row.pt9-lg.mt3.mt0-lg.mb6-lg.order-2-md.order-1-lg > div > div.grid-row.hide.flex-md.flex-column.flex-row-md.relative > div.grid-col-12.grid-col-11-sm.grid-col-2-md.flex.items-center.flex-column-md.items-start-md.mb3.order-2-md > a > img");
            window.setTimeout(function(){


                profileIco.click();
                window.setTimeout(function() {
                    var facebook = jQuery("#react-project-header > div > div > div:nth-child(8) > div > div > div.grid-container-full.absolute.w100p > div > div > div > div > div > div.shadow-low.bg-white.p4.max-h80vh.auto-scroll-y.clip > div > div.flex.flex-column.flex-row-lg.flex-wrap.mb6 > div.flex-1.mr3 > div > div:nth-child(3) > span");
                    var connected = false;
                    facebook = facebook[0];
                    if(facebook && facebook.innerText){
                        if(facebook.innerText.indexOf("Not")< 0){
                            connected = true;
                        }
                    }
                    KickstarterObj.setFacebookConnected(connected);

                    var backed = jQuery("#react-project-header > div > div > div:nth-child(8) > div > div > div.grid-container-full.absolute.w100p > div > div > div > div > div > div.shadow-low.bg-white.p4.max-h80vh.auto-scroll-y.clip > div > div.flex.flex-column.flex-row-lg.flex-wrap.mb6 > div.flex-1.mr3 > div > div:nth-child(4) > span > a");
                    backed = backed[0];
                    if(backed && backed.innerText){
                        KickstarterObj.setBacked(backed.innerText);
                    }

                    var team = jQuery("#react-project-header > div > div > div:nth-child(8) > div > div > div.grid-container-full.absolute.w100p > div > div > div > div > div > div.shadow-low.bg-white.p4.max-h80vh.auto-scroll-y.clip > div > div:nth-child(4) > div");
                    var teamCount = 1;
                    if(team && team.length > 0){
                        teamCount = teamCount + team.length;
                    }
                    KickstarterObj.setTeamSize(teamCount);
                    if(callback){
                        callback();
                    }
                }, 3000);
            },3000);
        };

        getAllPledges();
        getDeliveryTimeAction();
        getProfileAction(getPublishTimeAction);
    };
});
