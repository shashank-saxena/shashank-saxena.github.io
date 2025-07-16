$(function () {
  let $content = $("#jsonContent");
  let mediumName = "@shashank-saxena";
  let apiKey = "<YOUR api.rss2json.com API KEY>";
  let data = {
    rss_url: "https://medium.com/feed/@" + mediumName,
    // api_key: apiKey // put your api key here
  };

  $.ajax({
    url: "https://api.rss2json.com/v1/api.json",
    method: "GET",
    dataType: "json",
    data: data,
  }).done(function (response) {
    if (response.status == "ok") {
      let output = "";
      let content = "";

      let authorImage = response.feed.image;
      let pathArray = authorImage.split("/");
      let imageId = pathArray[pathArray.length - 1];

      $.each(response.items, function (k, item) {
        let visibleSm;
        let author = "https://medium.com/@" + mediumName;
        let tagIndex = item.description.indexOf("<img"); // Find where the img tag starts
        let srcIndex =
          item.description.substring(tagIndex).indexOf("src=") + tagIndex; // Find where the src attribute starts
        let srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
        let srcEnd =
          item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
        let src = item.description.substring(srcStart, srcEnd); // Extract just the URL
        let profileImage = "https://miro.medium.com/fit/c/80/80/" + imageId;

        if (src.match(/https?:\/\/(medium\.com\/_\/.+)/g)) {
          console.log("Ignore comments");
        } else {
          let time = item.pubDate;
          time = time.replace(/\s/, "T") + "Z";
          let formattedDate = new Date(time);
          let day = formattedDate.getDate();
          let month = formattedDate.getMonth();
          let month_str = "Jan";
          month += 1; // JavaScript months are 0-11
          if (month == 1) {
            month_str = "Jan";
          }
          if (month == 2) {
            month_str = "Feb";
          }
          if (month == 3) {
            month_str = "Mar";
          }
          if (month == 4) {
            month_str = "Apr";
          }
          if (month == 5) {
            month_str = "May";
          }
          if (month == 6) {
            month_str = "Jun";
          }
          if (month == 7) {
            month_str = "Jul";
          }
          if (month == 8) {
            month_str = "Aug";
          }
          if (month == 9) {
            month_str = "Sep";
          }
          if (month == 10) {
            month_str = "Oct";
          }
          if (month == 11) {
            month_str = "Nov";
          }
          if (month == 12) {
            month_str = "Dec";
          }

          let year = formattedDate.getFullYear();
          let yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
          let maxLength = 400; // maximum number of characters to extract
          let trimmedString = yourString.substr(0, maxLength);
          trimmedString = trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
          );
          output +=
            '<div class="col-3 col-lg-3 col-md-3 col-sm-12">' +
            '<div class="mainbox">';
          // '<div>' +
          // '<div class="profile_img">' +
          // '<div class="u">' +
          // '<div class="dm">' +
          // '<div class="dn">' +
          //     '<div>';
          // output += '<img alt="' + item.author + '" style="border-radius: 50%;display: block; height: 40px; width: 40px;" src=' + profileImage + ' class="dp" width="40" height="40">';
          // output += '</div>';
          // output += '<div class="dr">';
          // output += '<a href="' + author + '" target="_blank"> <span class="bx">' + item.author + '</span></a>';
          // output += '<span class="af">' + month_str + " " + day + '</span>';
          // output += '</div>' +
          // '</div>' +
          // '</div>' +
          // '</div>' +
          // '</div>' +
          // '</div>';
          output +=
            '<div class="dsbox">' +
            '<div class="dubox">' +
            '<div class="dvbox">';
          output +=
            '<a href="' +
            item.link +
            '" target="_blank"><img alt="" src="' +
            src +
            '" class="bhbox" height="400"></a>';
          output += "</div>" + "</div>";
          output +=
            '<a href="' + item.link + '" target="_blank"><h3 class="eafont">';
          output += item.title;
          output += "</h3></a>";
          // output += '<div class="blog-cont">';
          // output += '<p>' + trimmedString + '...</p>';
          // output += '<p><a href="' + item.link + '" target="_blank"> Continue reading...</a></p>';
          // output += '</div>';
          output += "</div>";
          output += "</div>";
          output += "</div>";

          content = '<div class="row">' + output + "</div>";
          return true;
        }
      });

      $content.html(content);
    }
  });
});
