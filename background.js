chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: "mainwin",
    innerBounds: {
      width: 320,
      height: 240
    }
  });
});




chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
        controlDrawer();
        sendResponse("Send serial port data to the web page");
  });


function controlDrawer(){

  /* Converts a string to UTF-8 encoding in a Uint8Array; returns the array */
  var connectionId;
  var str2ab = function(str) {
     var encodedString = unescape(encodeURIComponent(str));
     var bytes = new Uint8Array(encodedString.length);
     for (var i = 0; i < encodedString.length; ++i) {
        bytes[i] = encodedString.charCodeAt(i);
     }
     return bytes.buffer;
  };

  var options = {
    'bitrate': 115200,
    'dataBits': 'eight',
    'parityBit': 'no',
    'stopBits': 'one'
  }

    chrome.serial.connect('COM3', options, function(info) {
        connectionId = info.connectionId;
       
        console.log("Connection established.");
        var msg = "callserial\n";
        chrome.serial.send(connectionId, str2ab(msg), function() {
                chrome.serial.disconnect(connectionId, function(info) {
         
                      console.log("Close Connection.");

                });
        } );
      });


}