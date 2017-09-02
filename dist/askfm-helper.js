$("body").addClass('askfm-helper');
$(".askfm-helper #followersRibbon").hide();


MassAsk.Selection.init = function() {
	MassAsk.Selection.batch = [];
	var friends = $("div." + MassAsk.item_common_class);
	var friendsNumber = friends.length;
	friends.click(MassAsk.Selection.onClick);
	//friends.live("click",MassAsk.Selection.onClick);
	friends.dblclick(function(){
		var index = $(this).index() + 1;
		//console.log(index);
		if(index <=  friendsNumber){
			for(i = index; i <= friendsNumber && i < index + 50; i++){
				$("div." + MassAsk.item_common_class + ":nth-child(" + i + ")").click();
				//console.log(i);
			}
		}
	});
}
