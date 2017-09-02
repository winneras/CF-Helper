jQuery("body").addClass('cf-helper');

var CFBase = function() {
    return {
        init: function() {},
        data: {
            pName: "", // project name
            pIndustry: "", //project industry
            pTarget: 0, // project funding target
            pAmount: 0, // actual funded amount
            pCompleteness: 0, // precentage from 0 to 1
            pGoalType: "fixed", // "fixed or flexible"
            pProductStage: "concept", // "Concept/Prototype/Production/Shipping"
            pCountry: "", // launching country
            pTeamSize: 0, // No.of team members
            pBackers: 0, // backers count
            pWordCount: 0, //word count of introduction
            pVideoCount: 0, //video count
            pLikeCount: 0, //like count
            pReviewCount: 0, // No. of comments/reviews
            pPublishTime: "", // dd-mm-yyyy project publish time
            pDeliveryTime: "", //dd-mm-yyyy estimated delivery time
            pIsSuccess: false, // is funding successful
            pUrl: "", // project url
        },
        setName: function(name) { this.data.pName = name; },
        setIndustry: function(industry){
        	this.data.pIndustry = industry;
        },
        setTarget: function(target){
        	this.data.pTarget = target;
        },
        setAmount: function(amount){
        	//amount = amount.replace(",", "");
        	this.data.pAmount = amount;
        },
        setCompleteness: function(completeness){
        	this.data.pCompleteness = completeness;
        },
        setGoalType: function(type){
        	if(type !== "flexible"){
        		type = "fixed";
        	}
        	this.data.pGoalType = type;
        },
        setProductStage: function(stage){
        	this.data.pProductStage = stage;
        },
        setCountry: function(country, handler){
        	if(handler){
        		this.data.pCountry = handler(country);
        	} else {
        		this.data.pCountry = country;
        	}
        },
        kickstarterCountryHandler: function(string){
        	var strings = string.split(",");
        	var country = "";
        	if(strings[1]){
        		country = strings[1].trim();
        	} else {
        		country = string;
        	}
        	if(us_states[country.toUpperCase()]){
        		country = "US";
        	}
        	return country;
        },
        setTeamSize: function(size){
        	this.data.pTeamSize = size;
        },
        setBackers: function(number){
        	this.data.pBackers = number;
        },
        setWordCount: function(content, mode){
        	var stringArry;
        	var count;
        	if(mode == "zh"){
        		count = content.length();
        	} else {
        		stringArry = content.split(" ");
        		count = stringArry.length;
        	}
        	this.data.pWordCount = count;
        },
        setVideoCount: function(count){
        	this.data.pVideoCount = count;
        },
        setLikeCount: function(count){
        	this.data.pLikeCount = count;
        },
        setReviewCount: function(count){
        	this.data.pReviewCount = count;
        },
        setPublishTime: function(time, inputFormat){
        	this.data.pPublishTime = time;
        },
        setDeliveryTime: function(time, inputFormat){
        	this.data.pDeliveryTime = time;
        },
        setIsSuccess: function(isSuccess){
        	this.data.pIsSuccess = isSuccess;
        },
        setUrl: function(){
        	this.data.pUrl = window.location.href;
        },
        videoFinder: function(iframes){
        	var i = 0;
        	var count = 0;
        	var src;
        	for(i = 0; i < iframes.length; i++){
        		src = iframes[i].src;
        		if(src.indexOf("youtube") > 0 || src.indexOf("video") > 0){
        			count++;
        		}
        	}
        	return count;
        }
        
    };
};

var KickstarterObj = CFBase();

var titleDiv = jQuery("#content-wrap section div div:nth-child(2) div div div:nth-child(3) h2")[0];
if(titleDiv){
	KickstarterObj.setIsSuccess(false);
} else {
	titleDiv = jQuery("#content-wrap > section > div.project-profile__content > div.NS_project_profile__title > h2 > span > a")[0];
	KickstarterObj.setIsSuccess(true);
}
KickstarterObj.setName(titleDiv.innerText);

var industryDiv = jQuery("#content-wrap section .block-lg > .NS_projects__badges.mb3 a");
if(industryDiv.length < 2){
	industryDiv = jQuery(".NS_projects__category_location");
	KickstarterObj.setIndustry(industryDiv[industryDiv.length - 1].innerText);
} else {
	KickstarterObj.setIndustry(industryDiv[industryDiv.length - 2].innerText);
}


var targetDiv = jQuery("#content-wrap > section > div > div.grid-row.order-0-md.order-2-lg.mb5-lg.mb0-md > div.col-md-8-24.block-lg.hide > div.NS_campaigns__stats > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > span.block.navy-600.type-12.type-14-md.lh3-lg > span.money")[0];
KickstarterObj.setTarget(targetDiv.innerText);

var amountDiv = jQuery("#content-wrap > section > div > div.grid-row.order-0-md.order-2-lg.mb5-lg.mb0-md > div.col-md-8-24.block-lg.hide > div.NS_campaigns__stats > div.flex.flex-column-lg.mb4.mb5-sm > div:nth-child(1) > span.block.green-700.js-pledged.medium.type-16.type-24-md")[0];
KickstarterObj.setAmount(amountDiv.innerText);

var completenessDiv = jQuery("#pledged");
KickstarterObj.setCompleteness(completenessDiv.data("percentRaised"));

KickstarterObj.setGoalType("fixed");

KickstarterObj.setProductStage("");

var countryDiv = jQuery("#content-wrap section .block-lg > .NS_projects__badges.mb3 a");
if(countryDiv.length < 2){
	countryDiv = jQuery(".NS_projects__category_location");
	KickstarterObj.setCountry(countryDiv[countryDiv.length - 2].innerText, KickstarterObj.kickstarterCountryHandler);
} else {
	KickstarterObj.setCountry(countryDiv[countryDiv.length - 1].innerText, KickstarterObj.kickstarterCountryHandler);
}


var getTeamSizeAction = function(callback){
	var ownerIco = jQuery("#content-wrap > section > div > div.grid-row.order-2-md.order-1-lg.pt9-lg.mt3.mt0-lg.mb6-lg > div > div > div.col-full.col-sm-22-24.col-offset-sm-1-24.col-md-4-24.col-offset-md-0-24.flex.items-center.flex-column-md.items-start-md.mb3.order-1-md > a");
	ownerIco.click();
	window.setTimeout(function(){
		var team = jQuery("#bio > div > div.col.col-7.col-post-1.pt3.pb3.pb10-sm > div.pt3.pt7-sm.mobile-hide.row > div");
		KickstarterObj.setTeamSize(team.length + 1);
		jQuery("#projects_show > div.modal_dialog.dark.modal_project_by > div > div > div > div > div.modal_dialog_head > a").click();
		if(callback){
			callback();
		}
	}, 1000);
};

var backersDiv = jQuery("#backers_count");
KickstarterObj.setBackers(backersDiv.data("backersCount"));

var descDiv = jQuery(".NS_projects__description_section .full-description")[0];
KickstarterObj.setWordCount(descDiv.innerText);

var videos = jQuery("video");
KickstarterObj.setVideoCount(videos.length + KickstarterObj.videoFinder(jQuery("iframe")));

var commentsDiv = jQuery("#content-wrap > div.NS_projects__content > div > div > div > div.project-nav__links > a.js-load-project-comments.js-load-project-content.mx3.project-nav__link--comments.tabbed-nav__link.type-14 > span > data");
KickstarterObj.setReviewCount(commentsDiv.data("value"));

var getPublishTimeAction = function(callback){
	var updateLink = jQuery("#content-wrap > div.NS_projects__content > div > div > div > div.project-nav__links > a.js-load-project-content.js-load-project-updates.mx3.project-nav__link--updates.tabbed-nav__link.type-14");
	updateLink.click();
	window.setTimeout(function(){
		var publishTimeDiv = jQuery(".timeline time.js-adjust-time");
		KickstarterObj.setPublishTime(publishTimeDiv[publishTimeDiv.length-1].innerText);
		jQuery("#content-wrap > div.NS_projects__content > div > div > div > div.project-nav__links > a.js-load-project-content.js-load-project-description.mx3.project-nav__link--campaign.tabbed-nav__link.type-14").click();
		if(callback){
			callback();
		}
		console.log(KickstarterObj.data);
	}, 3000);
};


var getDeliveryTimeAction = function(){
	var timeDivs = jQuery(".NS_projects__rewards_list.js-project-rewards time.js-adjust-time");
	KickstarterObj.setDeliveryTime(timeDivs[timeDivs.length-1].innerText);
};

KickstarterObj.setUrl();

getDeliveryTimeAction();
getTeamSizeAction(getPublishTimeAction);

