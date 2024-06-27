// $(document).ready(function () {
//     $('select').select2();
// });

function show_name(value) {
  //   console.log(value);
  var nameRegex =
    /^([a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff][a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff ',.-]*)+$/;
  if (!nameRegex.test(value)) {
    $("#name").css("border", "1px solid red");
  } else {
    $("#name").css("border", "1px solid #ced4da");
  }

  if(value.length == "" || value.length == null){
    $("#name").css("border", "1px solid #ced4da");
    $("#name").focus();
  }
}

function checkEmail(value) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    $("#email").css("border", "1px solid red");
  } else {
    $("#email").css("border", "1px solid #ced4da");
  }

  if(value.length == null || value.length ==""){
    $("#email").css("border", "1px solid #ced4da");
    $("#email").focus();
  }
}

function checkValidateMobile(input) {
  // console.log(input)
  // var regex = /^[0-9]*$/;
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!regex.test(input) || input.length > 10) {
    $("#mobile").css("border", "2px solid red");
    $("#mobile").focus();
  } else {
    $("#mobile").css("border", "1px solid #ced4da");
    $("#mobile").focus();
  }

  if(input.length == null || input.length == ""){
    $("#mobile").css("border", "1px solid #ced4da");
    $("#mobile").focus();
  }
}
