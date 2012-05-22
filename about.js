$(document).ready(function() {
	$(".shaper-bio>h3").click(function() {
		$(this).next().toggle();

		var text = $(this).text();
		
		if (text.indexOf("+") >= 0) {
			text = text.replace("+","-");
		} else if (text.indexOf("-") >= 0) {
			text = text.replace("-","+");
		}

		$(this).text(text)
	});
});