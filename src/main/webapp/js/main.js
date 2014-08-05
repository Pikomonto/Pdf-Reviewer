
$(document).ready(main);

function main() {
  $("#login").hide();
  $("#reviewerDiv").hide();
  $("#writerDiv").hide();
  $("#loggedIn").hide();
  $("#statusDiv").hide();

  var repoName = getQueryParams("repoName");
  var writer = getQueryParams("writer");

  if(repoName != null && writer != null) {
    setupLogin(setupReviewer);
  }
  else {
    setupLogin(setupStatus);
  }

  $("#showWriterBtn").on("click", function() {
    $("#statusDiv").hide();
    $("#reviewerDiv").hide();
    setupWriter();
  });

  $("#showStatusBtn").on("click", function() {
    $("#writerDiv").hide();
    $("#reviewerDiv").hide();
    setupStatus();
  });
}

function showAlert(type, text) {
  $(".alert").remove();

  var alert = $("<div/>")
    .attr("class", "alert alert-dismissible fade in alert-" + type)
    .attr("role", "alert")
    .html("<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" + text);
  
  alert.hide().appendTo($("#alerts")).fadeTo("medium", 1);
}

function getQueryParams(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function getUserText(r) {
  var email = "email" in r ? " (" + r["email"] + ")" : "";
  var name = "name" in r ? r["name"] + " - " : "";

  return name + r["login"] + email;
}