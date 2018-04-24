function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function validateHuman(honeypot) {
  if (honeypot) {  //if hidden form filled up
    console.log("Robot Detected!");
    return true;
  } else {
    console.log("Welcome Human!");
  }
}

// get all data in form and return object
function getFormData() {
  var form = document.getElementById("gform");
  var elements = form.elements; // all form elements
  var fields = Object.keys(elements).filter(function(k) {
        // the filtering logic is simple, only keep fields that are not the honeypot
        return (elements[k].name !== "honeypot");
  }).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
                  // it to be appended to for each item in the loop
    if(elements[k].type === "checkbox"){ // special case for Edge's html collection
      str = str + elements[k].checked + ", "; // take the string and append
                                    // the end of it, along with
                                              // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space
                                  // from the  string to make the output
                                  // prettier in the spreadsheet
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });

  // add form-specific values into the data
  data.formDataNameOrder = JSON.stringify(fields);
  data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
  data.formGoogleSendEmail = form.dataset.email || ""; // no email by default
  var sectionsObject = {
    "Bar Sports": ["Pool", "Ping Pong", "Darts", "Cornhole", "Foosball", "Shuffleboard", data["Bar Sports Other"]],
    "Live Entertainment": ["Live Music", "Karaoke", "Dancing", "Piano", "Open Mic", "Comedy", data["Live Entertainment Other"]],
    "Games": ["Skeeball", "Jenga", "Trivia", "Board Games", "Video Games", "Arcades", data["Games Other"]]
  }
  var plusObject = {};
  //ulObject will have to be updated if other pages are to be added
  for (var prop in sectionsObject) {
    if (sectionsObject.hasOwnProperty(prop)) {
      plusObject[prop + " array"] = []
      sectionsObject[prop].forEach(function(ele) {
        if (data[ele] !== "false" || data[ele !== ""]) {
          plusObject[prop + " array"].push(ele);
        }
      });
    }
  }
  for (var prop in sectionsObject) {
    if (sectionsObject.hasOwnProperty(prop) && data[prop] == "true") {
      data[prop + " +"] = [];
      for (var property in sectionsObject) {
        if (property !== prop) {
          data[prop + " +"].push(plusObject[property + " array"].join(', '));
        }
      }
      data[prop + " +"] = data[prop + " +"].join("");
    }
  }
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData();         // get the values submitted in the form
  /* OPTION: Remove this comment to enable SPAM prevention, see README.md
  if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
    return false;
  }
  */

  if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
    var invalidEmail = document.getElementById("email-invalid");
    if (invalidEmail) {
      invalidEmail.style.display = "block";
      return false;
    }
  } else {
    var urlObject = {
      barSports: "https://script.google.com/macros/s/AKfycbwiVfddD7-VBToBeFo-REEVPkDZ5Ij1nRTLy7Ur/exec",
      liveEntertainment: "https://script.google.com/macros/s/AKfycbyspZtfkg9kxo2HnG4qwV2tnfJbk_JWJDgxRxDnnA/exec",
      games: "https://script.google.com/macros/s/AKfycbwQmnXJCcQfHkFBqEhf1y-VG00LWm_3pAYUkvaQoQ/exec"
    };
    //posts to each individual spreadsheet
    for (var sect in urlObject) {
      console.log(sect);
      if(data[sect + " +"]) {
        console.log("true");
        $.post( sect, function( data ) {
          console.log(sect + " ran");
        });
      }
    }
//posts to all data spreadsheet
    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        document.getElementById("gform").style.display = "none"; // hide form
        var thankYouMessage = $('#thank-you-message');
        if (thankYouMessage) {
          thankYouMessage.css("display", "block");
        }
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }
}
function loaded() {
  console.log("Contact form submission handler loaded successfully.");
  // bind to the submit event of our form
  var form = document.getElementById("gform");
  form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener("DOMContentLoaded", loaded, false);
