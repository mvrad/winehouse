$(() => {

  "use strict";

  // Globals
  // const akey = config.KEY,
  //   snoothAPI = "//api.snooth.com/wines/?akey=" + akey + "&q=";

  // Set focus to fields
  $("#name").focus();
  $("#login-email input").focus();
  $("#search-form input").focus();

  // Wine search (powered by Snooth API)
  // function conductSearch () {
  //   $("#search").keyup((e) => {

  //     let search = $("#search").val().toLowerCase().trim(),
  //       value = $.trim($("#search").val());

  //     if (value.length > 0) {

  //       let searching = snoothAPI + search;

        // $(".search-dropdown").addClass("is-active");
        // $(".is-active").show();

  //       // Get Snooth API
  //       $.getJSON(searching, (data) => {

  //         let wines = data.wines;

  //         $.each(wines, (i) => {
  //           let code = wines[0].code,
  //             name = wines[0].name,
  //             varietal = wines[0].varietal,
  //             vintage = wines[0].vintage,
  //             type = wines[0].type,
  //             price = wines[0].price;

  //           $("#name").html(name);
  //           $("#varietal").html(varietal);
  //           $("#vintage").html(vintage);
  //           $("#type").html(type);
  //           $("#price").html("$" + price);
  //           $("#code").html(code);
  //         }); // End wine arr
  //       }); // End getJSON
  //   } else {
  //     $(".search-dropdown").removeClass("is-active");
  //   }
  //   }); // End keyup event
  // }

  // conductSearch();

  // Preload images
  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
      $('<img/>')[0].src = this;
    });
  }
  preload([
    "images/red.svg",
    "images/rose.svg",
    "images/white.svg",
    "images/note.svg",
    "images/remove.svg"
  ]);

  function makeId(length) {
    let result = "",
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charLength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  // Edit, save input fields
  $(document).on("click", ".dropdown-edit", (e) => {
    const saveBtn = "<button class=dropdown-save>Save</button>",
      id = $(e.target).closest("li").find(".list-item").attr("id");
    $(e.target).closest("li").find(".list-item").replaceWith(`<input id=${id} class=list-item-edit></input>`);
    $(".list-item-edit").focus();
    $(e.target).closest(".dropdown-edit").replaceWith(saveBtn);
  });
  $(document).on("click", ".dropdown-save", (e) => {
    const editBtn = "<button class=dropdown-edit>Edit</button>",
      idInput = $(e.target).closest("li").find(".list-item-edit").attr("id"),
      textEdit = $(".list-item-edit").val();
    $(e.target).closest("li").find("input").replaceWith(`<div id=${idInput} class=list-item>${textEdit}</div>`);
    $(e.target).closest(".dropdown-save").replaceWith(editBtn);
  });

  // Add wine to collection
  $("#add-to-collection").on("click", () => {
    $("#code").html(makeId(5));
    let img = $("input[name=color]:checked").val(),
      name = $("#name").text(),
      varietal = $("#varietal").text(),
      vintage = $("#vintage").text(),
      type = $("#type").text(),
      price = $("#price").text(),
      code = $("#code").text();

      console.log(code);

    $(".collection-main").append(
      `<div class=collection-wine>
      <img class=wine-img src=images/${img}.svg title=Color>
      <div class=collection-name>
      <span class=wine-name title=Name>${name}</span>
      </div>
      <div class=collection-varietal>
      <span class=wine-varietal title=Varietal>${varietal}</span></div>
      <div class=options>
      <img class=wine-note src=images/note.svg title=Notes>
      <img class=wine-delete src=images/remove.svg title=Remove>
      </div>
      </div>
      </div>`
    );

    // Add wine to modal window
    $(".modal").append(
      `<div class=modal-content id=${code}>
      <ul>
      <span class=close>&times</span>
      <br>
      <li><span class=modal-label>Name: </span><span class=modal-html>${name}</span>
      <li><span class=modal-label>Varietal: </span><span class=modal-html>${varietal}</span>
      <li><span class=modal-label>Vintage: </span><span class=modal-html>${vintage}</span>
      <li><span class=modal-label>Type: </span><span class=modal-html>${type}</span>
      <li><span class=modal-label>Price: </span><span class=modal-html>${price}</span>
      <li><span class=modal-label>Tasting Notes: </span></li>
      <textarea id=notes></textarea>
      <button id=save-btn>Save</button>
      </ul>
      </div>`
    );

    $(".modal").hide();

    // Modal window
    let modalDiv = $(".modal-content");
    $(".collection-main").on("click", ".wine-note", (e) => {
      console.log(e.currentTarget.id);
      $.each(modalDiv, (i) => {
        if (e.currentTarget.id === modalDiv[i].id) {
          $(".modal").html(modalDiv[i]).show();
          $(".close").click((e) => {
            $(".modal").hide();
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

  // Get current year
  $(".year").text(new Date().getFullYear());

}); // End doc ready