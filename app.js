// replace these values with those generated in your TokBox Account
var apiKey = "";
var sessionId = "";
var token = "";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
  var SERVER_BASE_URL = 'https://vidchatmic.herokuapp.com/';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      initializeSession();
    }).catch(handleError);

function initializeSession() {
  var layoutContainer = document.getElementById("layoutContainer");

    // Initialize the layout container and get a reference to the layout method
    var layout = initLayoutContainer(layoutContainer).layout;

    // Below is a normal hello world OpenTok application for v2 of the API
    // The layout container will redraw when the layout mtehod is called and
    // adjust the layout accordingly

    var session = OT.initSession(sessionId);
    session.on("streamCreated", function(event){
        session.subscribe(event.stream, "layoutContainer", {
            insertMode: "append"
        });
        layout();
    }).connect(apiKey, token, function (err) {
        if (!err) {
            session.publish("publisherContainer");
            layout();
        }
    });
}
