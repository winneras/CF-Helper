define(function() {
    return {
        data: {
            pName: "", // project name
            pIndustry: "", //project industry
            pCurrency: "", // currency
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
            pPublishTime: "", // Date() if possible,dd-mm-yyyy project publish time
            pDeliveryTime: "", //Date() if possible,dd-mm-yyyy estimated delivery time
            pIsSuccess: false, // is funding successful
            pUrl: "", // project url
            pEndDate: "",//Date() if possible,
            pLastDays: 0, //last days
            pPledges: [] // pledges money as int
        },
        setName: function(name) { this.data.pName = name; },
        setIndustry: function(industry) {
            this.data.pIndustry = industry;
        },
        setCurrency: function(str){
        	var i = 0;
        	var idx;
        	for(i = 0; i<str.length; i++){
        		if(!isNaN(str[i])){
        			idx = i;
        			break;
        		}
        	}
        	this.data.pCurrency = str.substr(0, idx);
        },
        setTarget: function(target) {
        	target = this.getNumberFromString(target);
            this.data.pTarget = target;
        },
        setAmount: function(amount) {
            amount = this.getNumberFromString(amount);
            this.data.pAmount = amount;
        },
        setCompleteness: function(completeness) {
            this.data.pCompleteness = completeness;
        },
        setGoalType: function(type) {
            if (type !== "flexible") {
                type = "fixed";
            }
            this.data.pGoalType = type;
        },
        setProductStage: function(stage) {
            this.data.pProductStage = stage;
        },
        setCountry: function(country, handler) {
            if (handler) {
                this.data.pCountry = handler.apply(this, [country]);
            } else {
                this.data.pCountry = country;
            }
        },
        kickstarterCountryHandler: function(string) {
            var us_states = this.getUsStatesList();
            var strings = string.split(",");
            var country = "";
            if (strings[1]) {
                country = strings[1].trim();
            } else {
                country = string;
            }
            if (us_states[country.toUpperCase()]) {
                country = "US";
            }
            return country;
        },
        setTeamSize: function(size) {
            this.data.pTeamSize = size;
        },
        setBackers: function(number) {
            this.data.pBackers = number;
        },
        setWordCount: function(content, mode) {
            var stringArry;
            var count;
            if (mode == "zh") {
                count = content.length();
            } else {
                stringArry = content.split(" ");
                count = stringArry.length;
            }
            this.data.pWordCount = count;
        },
        setVideoCount: function(count) {
            this.data.pVideoCount = count;
        },
        setLikeCount: function(count) {
            this.data.pLikeCount = count;
        },
        setReviewCount: function(count) {
            this.data.pReviewCount = count;
        },
        setPublishTime: function(time, inputFormat) {
        	this.data.pPublishTime = time;
        },
        setDeliveryTime: function(time, inputFormat) {
            this.data.pDeliveryTime = time;
        },
        setIsSuccess: function(isSuccess) {
            this.data.pIsSuccess = isSuccess;
        },
        setUrl: function() {
            this.data.pUrl = window.location.href;
        },
        setEndDate: function(endDate){
        	this.data.pEndDate = endDate;
        },
        setLastDays: function(days){
        	days = this.getNumberFromString(days);
        	this.data.pLastDays = days;
        },
        addPledge: function(pledgeCost){
        	pledgeCost = this.getNumberFromString(pledgeCost);
        	this.data.pPledges.push(pledgeCost);
        },
        videoFinder: function(iframes) {
            var i = 0;
            var count = 0;
            var src;
            for (i = 0; i < iframes.length; i++) {
                src = iframes[i].src;
                if (src.indexOf("youtube") > 0 || src.indexOf("video") > 0) {
                    count++;
                }
            }
            return count;
        },
        copyToClip: function() {
            var txt = this.createTxtFromData();
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.setAttribute("id", "dummy_textarea");
            document.getElementById("dummy_textarea").value = txt;
            dummy.select();
            dummy.style.position = "fixed";
            dummy.style.top = "0px";
            dummy.style.zIndex = "999999";
        },
        createTxtFromData: function() {
            var data = this.data;
            var i = 0;
            var str = data.pName + "\t";
            str = str + data.pIndustry + "\t";
            str = str + data.pCurrency + "\t";
            str = str + data.pTarget + "\t";
            str = str + data.pAmount + "\t";
            str = str + data.pCompleteness + "\t";
            str = str + data.pGoalType + "\t";
            str = str + data.pProductStage + "\t";
            str = str + data.pCountry + "\t";
            str = str + data.pTeamSize + "\t";
            str = str + data.pBackers + "\t";
            str = str + data.pWordCount + "\t";
            str = str + data.pVideoCount + "\t";
            str = str + data.pLikeCount + "\t";
            str = str + data.pReviewCount + "\t";
            str = str + data.pPublishTime + "\t";
            str = str + data.pEndDate + "\t";
            str = str + data.pLastDays + "\t";
            str = str + data.pDeliveryTime + "\t";
            str = str + data.pIsSuccess + "\t";
            str = str + data.pUrl + "\t ";
            if(!data.pPledges.length){
            	return str;
            } else {
            	str = str + "\t";
            }
            for(i = 0; i < data.pPledges.length; i++){
            	str = str + data.pPledges[i];
            	if(i !== data.pPledges.length - 1){
            		str = str + "\t";
            	}
            }
            return str;
        },
        getNumberFromString: function(str) {
        	if(isNaN(str)){
        		return parseInt(str.match(/\d/g).join(""), 10);
        	}
        	return str;
        },
        getCompleteness: function(amount, target) {
            amount = this.getNumberFromString(amount);
            target = this.getNumberFromString(target);
            return amount / target;
        },
        getUsStatesList: function() {
            return {
                "AL": "Alabama",
                "AK": "Alaska",
                "AS": "American Samoa",
                "AZ": "Arizona",
                "AR": "Arkansas",
                "CA": "California",
                "CO": "Colorado",
                "CT": "Connecticut",
                "DE": "Delaware",
                "DC": "District Of Columbia",
                "FM": "Federated States Of Micronesia",
                "FL": "Florida",
                "GA": "Georgia",
                "GU": "Guam",
                "HI": "Hawaii",
                "ID": "Idaho",
                "IL": "Illinois",
                "IN": "Indiana",
                "IA": "Iowa",
                "KS": "Kansas",
                "KY": "Kentucky",
                "LA": "Louisiana",
                "ME": "Maine",
                "MH": "Marshall Islands",
                "MD": "Maryland",
                "MA": "Massachusetts",
                "MI": "Michigan",
                "MN": "Minnesota",
                "MS": "Mississippi",
                "MO": "Missouri",
                "MT": "Montana",
                "NE": "Nebraska",
                "NV": "Nevada",
                "NH": "New Hampshire",
                "NJ": "New Jersey",
                "NM": "New Mexico",
                "NY": "New York",
                "NC": "North Carolina",
                "ND": "North Dakota",
                "MP": "Northern Mariana Islands",
                "OH": "Ohio",
                "OK": "Oklahoma",
                "OR": "Oregon",
                "PW": "Palau",
                "PA": "Pennsylvania",
                "PR": "Puerto Rico",
                "RI": "Rhode Island",
                "SC": "South Carolina",
                "SD": "South Dakota",
                "TN": "Tennessee",
                "TX": "Texas",
                "UT": "Utah",
                "VT": "Vermont",
                "VI": "Virgin Islands",
                "VA": "Virginia",
                "WA": "Washington",
                "WV": "West Virginia",
                "WI": "Wisconsin",
                "WY": "Wyoming"
            };
        }

    };
});