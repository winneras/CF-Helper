define(["lib/moment.min", "CFBase"], function(moment, CFBase) {
    return function() {
        var ZhongChouObj = CFBase;
        var dayInMilliseconds = 24 * 60 * 60 * 1000;

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

        if (completenessNo > 1) {
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

        var getImageDates = function() {
            var imgDoms = jQuery("#jlxqOuterBox > div > div.jlxqBox img");
            var dates = [];
            var date;
            var i = 0,
                idx;
            var str = "";
            var today = new Date(new Date().setHours(23, 59, 59, 999));
            var before730 = new Date(today.getTime() - 730 * dayInMilliseconds);
            for (i = 0; i < imgDoms.length; i++) {
                str = imgDoms[i].src;
                if(str === ""){
                    str = imgDoms[i].dataset.src;
                }
                idx = str.indexOf('/attachment/');
                if (idx > 0) {
                    str = str.substr(idx + 12, 9);
                    date = moment(str, "YYYYMM/DD");
                    if (date._d > before730 && date._d < today) {
                        dates.push(new Date(date._d));
                    }
                }
            }
            return dates;
        };
        var guessStartDate = function(dates) {
            if (!dates || !dates[0]) {
                return;
            }
            var i = 0;
            var countArray = [];
            var key, count = 0;
            var publishDate;
            for (i = 0; i < dates.length; i++) {
                if (countArray[dates[i].getTime()]) {
                    countArray[dates[i].getTime()]++;
                } else {
                    countArray[dates[i].getTime()] = 1;
                }
            }
            for (var k in countArray) {
                if (countArray[k] > count) {
                    count = countArray[k];
                    key = k;
                }
            }
            publishDate = new Date(parseInt(key, 10));
            return publishDate;
        };

        var getEndDate = function() {
            var leftDaysDom = jQuery("#jlxqOuterBox > div > div.jlxqBox > div.xqDetailBox > div.xqDetailRight > div.xqRatioOuterBox > div.xqRatioText.clearfix > span.leftSpan > b")[0];
            if(!leftDaysDom){
                return;
            }
            var leftDays = ZhongChouObj.getNumberFromString(leftDaysDom.innerText);
            var today = new Date(new Date().setHours(0, 0, 0, 0));
            var endDate = new Date(today.getTime() + leftDays * 24 * 60 * 60 * 1000);
            return endDate;
        };
        var endDate;
        var timeRelated = function() {
            var imgDates = getImageDates();
            var publishDate = guessStartDate(imgDates);
            ZhongChouObj.setPublishTime(moment.utc(publishDate.toISOString()).format("DD/MM/YYYY"));

            endDate = getEndDate();
            if(!endDate){
                return;
            }
            ZhongChouObj.setEndDate(moment.utc(endDate.toISOString()).format("DD/MM/YYYY"));

            var lastDays = Math.ceil((endDate.getTime() - publishDate.getTime()) / dayInMilliseconds);
            ZhongChouObj.setLastDays(lastDays);
        };
        timeRelated();

        pledgesRelated = function() {
            var pledgesPriceDom = jQuery(".zcjeOuterBox > .zcje_ItemBox > .zcje_h3 > b");
            var i = 0;
            var number = 0;
            for (i = 0; i < pledgesPriceDom.length; i++) {
                str = pledgesPriceDom[i].innerText;
                ZhongChouObj.addPledge(str);
            }
            var deliveryTimeDom = jQuery(".zcjeOuterBox > .zcje_ItemBox div.zcjeFooter > p > b");
            if (deliveryTimeDom.length > 0) {
                str = deliveryTimeDom[Math.floor(deliveryTimeDom.length / 2)].innerText;
                number = ZhongChouObj.getNumberFromString(str);
            }
            if(!endDate){
                return;
            }
            var deliveryDate = new Date(endDate.getTime() + number * dayInMilliseconds);
                ZhongChouObj.setDeliveryTime(moment.utc(deliveryDate.toISOString()).format("DD/MM/YYYY"));
        };
        pledgesRelated();
        ZhongChouObj.setUrl();
        ZhongChouObj.copyToClip();
    };
});