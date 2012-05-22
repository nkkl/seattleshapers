$(document).ready(function() {
	posts = []

	$.getJSON("http://seattleshapers.tumblr.com/api/read/json?start=0&num=10&callback=?", function(data) {
		posts = data["posts"];

		displayposts(posts);
	});

	var displayposts = function(posts) {
		var unixDate;
		var newpost;
		var postContent;
		var postTitle;
		var postSubtitle;
		var linkto;

		for (var i=0;i<posts.length;i++) {
			thispost = posts[i];

			newpost = "<div class=\"post\" id=\"" + i + "\"></div>";
			unixDate = new Date(thispost["unix-timestamp"]*1000);
			postSubtitle = monthToName(unixDate.getMonth())+" "+unixDate.getDate()+", "+unixDate.getFullYear();
			postContent = "<div class=\"postcontent\">";

			switch(thispost["type"]) {
				case "regular":
					postContent += thispost["regular-body"];
					postTitle = thispost["regular-title"];
					break;
				case "photo":
					postContent += "<img src=\""+thispost["photo-url-400"]+"\"/>"+thispost["photo-caption"];
					postTitle = "Photo"
					break;
				case "quote":
					postContent += "<p>"+thispost["quote-text"]+"</p>"+"<p class=\"quote-attr\">&mdash; "+thispost["quote-source"]+"</p>";
					postTitle = "Quote"
					break;
				case "video":
					postContent += thispost["video-player"] + thispost["video-caption"];
					postTitle = "Video"
					break;
				default:
					console.log("none");
					break;
			}

			postContent += "</div>";

			linkto = "<a href=\"#"+i+"\"><div class=\"item\">" +postTitle+" (" + postSubtitle + ")" + "</div></a>";

			postTitle = "<a href=\""+thispost["url"]+"\"><h2>" + postTitle + "</h2></a>";
			console.log(postTitle);
			postSubtitle = "<h3>" + postSubtitle + "</h3>";

			$("#updates").append(linkto);

			$("#blog").append(newpost);

			$("#"+i).append(postTitle);
			$("#"+i).append(postSubtitle);
			$("#"+i).append(postContent);
		}
	}

	// I can't believe this isn't in js/jQuery already
	// which means it probably is and I just didn't look well enough
	var monthToName = function(num) {
		switch(num) {
			case 1:
				return "January";
			case 2:
				return "February";
			case 3:
				return "March";
			case 4:
				return "April";
			case 5:
				return "May";
			case 6:
				return "June";
			case 7:
				return "July";
			case 8:
				return "August";
			case 9:
				return "September";
			case 10:
				return "October";
			case 11:
				return "November";
			case 12:
				return "December";
			default:
				break;
		}
	}
});