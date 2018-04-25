$(() => {

  "use strict";

  // Globals
  const akey = config.KEY,
    snoothAPI = "https://api.snooth.com/wines/?akey=" + akey + "&q=";

  // Hamburger menu animation
  $(".hamburger").on("click", () => {
    $(".hamburger").toggleClass("is-active");
    if ($(".hamburger").hasClass("is-active")) {
      $(".header").animate({marginTop: "0"})
      $(".register").animate({marginTop: "0"})
    } else {
      $(".header").animate({marginTop: "-295px"})
      $(".register").animate({marginTop: "-295px"})
    }
  });

  // Set focus to fields
  $("#name").focus();
  $("#login-email input").focus();
  $("#search-form input").focus();

  // Wine Search (powered by Snooth API)
  $("#search").keyup((e) => {

    let search = $("#search").val().toLowerCase().trim(),
      value = $.trim($("#search").val());

    if (value.length > 0) {

      let searching = snoothAPI + search;

      $(".search-dropdown").addClass("is-active");

      // Get Snooth API
      $.getJSON(searching, (data) => {

        let wines = data.wines;

        $.each(wines, (i) => {

          let name = wines[0].name,
            varietal = wines[0].varietal,
            vintage = wines[0].vintage,
            type = wines[0].type,
            price = wines[0].price,
            img = "<img src=" + wines[0].image + ">",
            imgURL = wines[0].image;

          $(".search-dropdown-list__name").html(name);
          $(".search-dropdown-list__varietal").html(varietal);
          $(".search-dropdown-list__vintage").html(vintage);
          $(".search-dropdown-list__type").html(type);
          $(".search-dropdown-list__price").html(price);
          $(".search-dropdown-list__image").html(img);
          $(".search-dropdown-list__imgURL").html(imgURL);

        }); // End Wine Arr

      }); // End getJSON

    } else {
      $(".search-dropdown").removeClass("is-active");
    }

  }); // End Keyup Event

  // Add Wine to Collection
  $("#add-to-collection").on("click", () => {
    let name = $(".search-dropdown-list__name").text(),
      varietal = $(".search-dropdown-list__varietal").text(),
      vintage = $(".search-dropdown-list__vintage").text(),
      imgURL = $("#imgURL").text();

    $(".collection-main").append(
      "<div class=collection-wine>" + 
      "<img class=wine-glass src=" + imgURL + ">" + 
      "<span class=wine-name>" + name + "</span>" + 
      "<span class=wine-type>" + varietal + "</span>" +  
      "<span class=wine-year>" + vintage + "</span>" + 
      "<img class=wine-note src='images/note.svg'" + ">" + 
      "<div class=wine-delete>&times</div>" + 
      "</div>"
    );
  });

  // Remove Wine from Collection
  $(".collection-main").on("click", ".wine-delete", (e) => {
    $(e.target).closest(".collection-wine").remove();
  });

}); // End Doc Ready