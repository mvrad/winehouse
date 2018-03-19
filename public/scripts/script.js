$(() => {

  "use strict";

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

  // Set focus on the first sign up form input field
  $("#name").focus();

  // Set focus on the first sign in form input field
  $("#login-email input").focus();

  // Set focus on the wine search input field
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
          let name = "<span class=labels>Name: </span>" + wines[0].name,
            varietal = "<span class=labels>Varietal: </span>" + wines[0].varietal,
            vintage = "<span class=labels>Vintage: </span>" + wines[0].vintage,
            type = "<span class=labels>Type: </span>" + wines[0].type,
            price = "<span class=labels>Price: </span>" + "$" + wines[0].price;
            // img = "<img src=" + wines[0].image + ">",
            // newLink = img.replace("https://", "//");

            $(".search-dropdown-list__name").html(name);
            $(".search-dropdown-list__varietal").html(varietal);
            $(".search-dropdown-list__vintage").html(vintage);
            $(".search-dropdown-list__type").html(type);
            $(".search-dropdown-list__price").html(price);
            // $(".search-dropdown-list__image").html(newLink);
        }); // End Wine Arr
      }); // End getJSON
    } else {
      $(".search-dropdown").removeClass("is-active");
    }
  }); // End Click Event
}); // End Doc Ready