$(() => {

  "use strict";

  // Globals
  const akey = config.KEY,
    snoothAPI = "//api.snooth.com/wines/?akey=" + akey + "&q=";

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

  // Wine search (powered by Snooth API)
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
          let code = wines[0].code,
            // img = "<img src=" + wines[0].image + ">",
            // imgURL = wines[0].image,
            name = wines[0].name,
            varietal = wines[0].varietal,
            vintage = wines[0].vintage,
            type = wines[0].type,
            price = wines[0].price;

          // $(".search-dropdown-list__image").html(img);
          $(".search-dropdown-list__name").html(name);
          $(".search-dropdown-list__varietal").html(varietal);
          $(".search-dropdown-list__vintage").html(vintage);
          $(".search-dropdown-list__type").html(type);
          $(".search-dropdown-list__price").html("$" + price);
          // $(".search-dropdown-list__imgURL").html(imgURL);
          $(".search-dropdown-list__code").html(code);

        }); // End wine arr

      }); // End getJSON

    } else {
      $(".search-dropdown").removeClass("is-active");
    }

  }); // End keyup event

  // Add wine to collection
  $("#add-to-collection").on("click", () => {
    let name = $(".search-dropdown-list__name").text(),
      varietal = $(".search-dropdown-list__varietal").text(),
      vintage = $(".search-dropdown-list__vintage").text(),
      type = $(".search-dropdown-list__type").text(),
      price = $(".search-dropdown-list__price").text(),
      // imgURL = $("#imgURL").text(),
      code = $("#code").text(),
      modalWindow = "";

    $(".collection-main").append(
      "<div class=collection-wine>" +
      "<div class=collection-wine__left>" +
      // "<img class=wine-photo src=" + imgURL + ">" +
      "<div class=collection-wine__name>" +
      "<span class=wine-name title=Name>" + name + "</span></div>" +
      "<div class=collection-wine__varietal>" +
      "<span class=wine-type title=Varietal>" + varietal + "</span></div>" +
      "</div>" +
      "<div class=collection-wine__right>" +
      "<img class=wine-note id=" + code + " src=images/note.svg title=Notes" + ">" +
      "<img class=wine-delete src=images/remove.svg title=Remove" + ">" +
      "</div>" +
      "</div>"
    );

    // Add wine to modal window
    modalWindow += "<div class=modal-content id=" + code + ">";
    modalWindow += "<ul>";
    modalWindow += "<span class=close>&times</span><br>";
    // modalWindow += "<li><img class=modal-photo src=" + imgURL + "></li>";
    modalWindow += "<li><span class=modal-label>Name: </span><span class=modal-html>" + name + "</span>";
    modalWindow += "<li><span class=modal-label>Varietal: </span><span class=modal-html>" + varietal + "</span>";
    modalWindow += "<li><span class=modal-label>Vintage: </span><span class=modal-html>" + vintage + "</span>";
    modalWindow += "<li><span class=modal-label>Type: </span><span class=modal-html>" + type + "</span>";
    modalWindow += "<li><span class=modal-label>Price: </span><span class=modal-html>" + price + "</span>";
    modalWindow += "<li><span class=modal-label>Tasting Notes: </span></li>";
    modalWindow += "<textarea id=notes></textarea>";
    modalWindow += "<button id=save-btn>Save</button>";
    modalWindow += "</ul>";
    modalWindow += "</div>";

    $(".modal").html(modalWindow).hide();

    // Modal window
    let modalDiv = $(".modal-content");
    $(".collection-main").on("click", ".wine-note", (e) => {
      $.each(modalDiv, (i) => {
        if (e.currentTarget.id === modalDiv[i].id) {
          $(".modal").html(modalDiv[i]).show();
          $(".close").click((e) => {
            $(".modal").html(modalWindow).hide();
          });
          $(document).on("click", "#save-btn", () => {
            $("#notes").replaceWith("<div class=notes-content>" + $("#notes").val() + "</div>");
            $("#save-btn").replaceWith("<button id=edit-btn>Edit</button>");
          });
          $(document).on("click", "#edit-btn", () => {
            $(".notes-content").replaceWith("<textarea id=notes></textarea>");
            $("#edit-btn").replaceWith("<button id=save-btn>Save</button>");
          });
        }
      });
    }); // End modal window
  }); // End on click event

  // Remove wine from collection
  $(".collection-main").on("click", ".wine-delete", (e) => {
    $(e.target).closest(".collection-wine").remove();
  });

  // Left to do:
  // Responsive design
  // Save wine collection

}); // End doc ready