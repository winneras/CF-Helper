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
        }
    };
};

var KickstarterObj = CFBase();
var titleDiv = jQuery("#content-wrap section div div:nth-child(2) div div div:nth-child(3) h2")[0];
var descDiv = jQuery(".NS_projects__description_section .full-description")[0];
KickstarterObj.setName(titleDiv.innerText);
KickstarterObj.setWordCount(descDiv.innerText);

console.log(KickstarterObj);