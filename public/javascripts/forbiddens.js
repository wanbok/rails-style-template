var duration = 10 * 60 * 1000;		// 10분, 60초, 1000ms

getTimeFromIndex = function(index) {
	return index * duration;
}

initForbidden = function(selection) {
	var forbidden = new Object();
	forbidden.startTime = getTimeFromIndex(selection);
	forbidden.duration = duration;
	return forbidden;
}

makeInputTags = function(selections) {
	var array = new Array();
	var arrayIndex = 0;
	var forbidden = initForbidden(selections[0]);
	var previousSelection = selections[0];
	for (var i = 1; i < selections.length; i++) {
		if (previousSelection + 1 >= selections[i])	{		// continueous
			forbidden.duration += duration;
		} else {
			array[arrayIndex++] = forbidden;
			forbidden = initForbidden(selections[i]);
		}
		previousSelection = selections[i];
	};
	array[arrayIndex++] = forbidden;

	// presenting to input tags
	$("#forbidden").empty();
	for (var i = 0; i < array.length; i++) {
		forbidden = array[i];
		$("#forbidden").append("\
			<input type='hidden' name='install[forbiddens]["+i+"][startTime]' value='"+forbidden.startTime+"' />\
			<input type='hidden' name='install[forbiddens]["+i+"][duration]' value='"+forbidden.duration+"' />\
			");
	}
}

makeInputTagsBySelections = function() {
	var j = 0;
	var selected = new Array();
	$( ".ui-selected" ).each(function() {
		var index = $(".ui-selectee").index( this );
		selected[j++] = index;
	});
	makeInputTags(selected);	
}

makeSelectedByData = function(forbiddens) {
	for (var i = 0; i < forbiddens.length; i++) {
		forbidden = forbiddens[i];
		var index = parseInt(forbidden.startTime / duration, 10);
		var count = parseInt(forbidden.duration / duration, 10);
		for (var j = 0; j < count; j++) {
			$(".ui-widget-content").eq(index+j).addClass("ui-selected");
		}
	}
}

$(function() {
	var option = null;
	if ($( "#show" ).length) {
		option = { disabled: true };
	};
	for (var i = 1; i < 8; i++) {
		$( "#selectable"+i ).selectable( option );
	};

	$("#install").submit(makeInputTagsBySelections);
});