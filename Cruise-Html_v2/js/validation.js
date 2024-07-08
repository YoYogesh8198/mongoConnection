$(function () {
  $("#name").keydown(function (e) {
    if (e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;
      if (
        !(
          key == 8 ||
          key == 32 ||
          key == 46 ||
          (key >= 35 && key <= 40) ||
          (key >= 65 && key <= 90)
        )
      ) {
        e.preventDefault();
      }
    }
  });

  $("#number").keydown(function (e) {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode || e.which;
      if (
        !(
          key == 8 ||
          key == 32 ||
          key == 46 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57)
        )
      ) {
        e.preventDefault();
      }
    }
  });
});

const email = document.getElementById("email");
email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});


function show_name(value) {
  //   console.log(value);
  var nameRegex =
    /^([a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff][a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff ',.-]*)+$/;
  if (!nameRegex.test(value)) {
    $("#name").css("border", "1px solid red");
  } else {
    $("#name").css("border", "1px solid #ced4da");
  }

  // if (value.length == "" || value.length == null) {
  //   $("#name").css("border", "1px solid #ced4da");
  //   $("#name").focus();
  // }
}

function checkEmail(value) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    $("#email").css("border", "1px solid red");
  } else {
    $("#email").css("border", "1px solid #ced4da");
  }

  // if (value.length == null || value.length == "") {
  //   $("#email").css("border", "1px solid #ced4da");
  //   $("#email").focus();
  // }
}

function checkValidateMobile(input) {
  // console.log(input);
  // var regex = /^[0-9]*$/;
  var regex = /^[0-9]{10}$/;
  if (!regex.test(input) || input.length > 10) {
    $("#number").css("border", "1px solid red");
    return false;
  } else if (input.length == null || input.length == "") {
    $("#number").css("border", "1px solid red");
    return false;
  } else {
    $("#number").css("border", "1px solid #ced4da");
  }
}

// $(document).ready(function () {
//   $("#submit").click(function (e) {
//     var phone_number = $("#number").val();
//     var regex = /^[0-9]{10}$/;
//     if (!regex.test(phone_number) || input.length > 10) {
//       $("#number").css("border", "1px solid red");
//       return false;
//     } else {
//       $("#number").css("border", "1px solid #ced4da");
//     }
//   });
// });
$(document).ready(function () {
  $("#submit1").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var name = $("#name").val();
    var phone_number = $("#number").val();
    var phone_length = $("#number").val().length;
    var total_passenger = $("#travelers").val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var email = $("#email").val();
    var destination = $("#destination").val();
    var cruise_length = $("#cruise-length").val();
    var depart_date = $("#depart_date").val();
    var depart_d = $("#depart").val();
    var return_d = $("#return").val();
    console.log(depart_d,return_d,"depart","return");
    // console.log(depart_date)
    var cruise_line = $("#cruise-line").val();
    var cruise_ship = $("#cruise-ship").val();
    var departure_port = $("#departure-port").val();
    var email_length = $("#email").length;
    var ErrorMsg = false;

    if (name == "" || name == null || name == undefined) {
      $("#name").css("border", "1px solid red");
      $(".error_1").show();
      $("#name").focus();
      ErrorMsg = true;
      return false;
    } else {
      $(".error_1").hide();
      $("#name").css("border", "1px solid #ced4da");
    }

    //*Email
    if (email == "" || email == null || email == undefined) {
      $("#email").css("border", "1px solid #ced4da");
    } else if (email_length != 0 && emailRegex.test(email) == false) {
      $("#email").css("border", "1px solid red");
      $(".error_2").show();
      $("#email").focus();
      return false;
    } else {
      $(".error_2").hide();
      $("#email").css("border", "1px solid #ced4da");
    }

    // * phone
    if (
      phone_number == "" ||
      phone_number == undefined ||
      phone_number == null
    ) {
      $("#number").css("border", "1px solid red");
      $(".error_3").show();
      $("#number").focus();
      ErrorMsg = true;
      return false;
    } else if (phone_length != 10) {
      $("#number").css("border", "1px solid red");
      $(".error_3").text("Please Enter 10 digit number only");
      $(".error_3").show();
      $("#number").focus();
      ErrorMsg = true;
      return false;
    } else {
      $(".error_3").hide();
      $("#number").css("border", "1px solid #ced4da");
    }

    //* traveler
    if (
      total_passenger == "" ||
      total_passenger == null ||
      total_passenger == undefined
    ) {
      $("#travelers").css("border", "1px solid red");
      $(".error_4").show();
      $("#travelers").focus();
      ErrorMsg = true;
      return false;
    } else {
      $(".error_4").hide();
      $("#travelers").css("border", "1px solid #ced4da");
    }

    //* destination
    if (destination == "" || destination == null || destination == undefined) {
      $("#destination").css("border", "1px solid red");
      $(".error_5").show();
      $("#destination").focus();
      ErrorMsg = true;
      return false;
    } else {
      $("#destination").css("border", "1px solid #ced4da");
      $(".error_5").hide();
    }

    //*Cruise length
    if (
      cruise_length == "" ||
      cruise_length == null ||
      cruise_length == undefined
    ) {
      $("#cruise-length").css("border", "1px solid red");
      $(".error_6").show();
      $("#cruise-length").focus();
      ErrorMsg = true;
      return false;
    } else {
      $("#cruise-length").css("border", "1px solid #ced4da");
      $(".error_6").hide();
    }

    //* return and depart date
    if (depart_date == "" || depart_date == null || depart_date == undefined) {
      $("#depart_date").css("border", "1px solid red");
      $(".error_7").show();
      $("#depart_date").focus();
      ErrorMsg = true;
      return false;
    }else if(depart_d == "" || depart_d == null || depart_d == undefined){
      $("#depart_date").css("border", "1px solid red");
      $(".error_7").show();
      return false;
    }else if(return_d == "" || return_d == null || return_d == undefined){
      $("#depart_date").css("border", "1px solid red");
      $(".error_7").show();
      return false;
    }else if(depart_d == return_d){
      $("#depart_date").css("border", "1px solid red");
      $(".error_7").html("depart date & Return Date cannot be same");
      $(".error_7").show();
      return false;
    }
     else {
      $("#depart_date").css("border", "1px solid #ced4da");
      $(".error_7").hide();
    }

    //*cruiseline
    if (cruise_line == "" || cruise_line == null || cruise_line == undefined) {
      $("#cruise-line").css("border", "1px solid red");
      $(".error_8").show();
      $("#cruise-line").focus();
      ErrorMsg = true;
      return false;
    } else {
      $("#cruise-line").css("border", "1px solid #ced4da");
      $(".error_8").hide();
    }

    //* cruise Ship
    if (cruise_ship == "" || cruise_ship == null || cruise_ship == undefined) {
      $("#cruise-ship").css("border", "1px solid red");
      $(".error_9").show();
      $("#cruise-ship").focus();
      ErrorMsg = true;
      return false;
    } else {
      $("#cruise-ship").css("border", "1px solid #ced4da");
      $(".error_9").hide();
    }

    //*departureport
    if (
      departure_port == "" ||
      departure_port == null ||
      departure_port == undefined
    ) {
      $("#departure-port").css("border", "1px solid red");
      $(".error_10").show();
      $("#departure-port").focus();
      ErrorMsg = true;
      return false;
    } else {
      $("#departure-port").css("border", "1px solid #ced4da");
      $(".error_10").hide();
    }

    if (!ErrorMsg) {
      $("#cruiseForm").submit();
    }
  });
});