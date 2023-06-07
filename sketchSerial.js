const NUM_BUTTONS = 6;
const NUM_ANALOG_SENSORS = 2;


var buttonsArray = [0, 0, 0, 0, 0, 0];
var analogSensorsArray = [0, 0];
var encoderValue = 0;;

// function setup() {
//   //createCanvas(400, 400);

//   // Initialize the arrays for buttons
//   for (var i = 0; i < NUM_BUTTONS; i++) {
//     buttonsArray[i] = 0;
//   }

//   // Initialize the arrays for analog sensors
//   for (i = 0; i < NUM_ANALOG_SENSORS; i++) {
//     analogSensorsArray[i] = 0;
//   }

//   // Initialize variable for encoder
//   encoderValue = 0;

//   // Start the serial communication
//   serialSetup();
// }

function receiveData() {
  let message = serial.readLine();
  // remove any trailing whitespace
  trim(message);
  // if the string is empty, do no more
  if (!message) {
    return;
  }

  decodeString(message);
}

function draw() {
  background(220);

  // Display the values of analog sensors
  fill(0);
  text("Analog Sensors:", 10, 20);
  for (var i = 0; i < NUM_ANALOG_SENSORS; i++) {
    text(analogSensorsArray[i], 10, 40 + 20 * i);
  }

  // Display the states of buttons
  text("Buttons:", 150, 20);
  for (i = 0; i < NUM_BUTTONS; i++) {
    text(buttonsArray[i], 150, 40 + 20 * i);
  }

  // Display the state of the encoder

  text("Encoder:", 300, 20);
  text(encoderValue, 300, 40);
}




// ******************************************************************* //
// ** IGNORE THESE FUNCTIONS UNLESS YOU ARE INTERESTED IN DIVING IN ** //
// ******************************************************************* //
function serialSetup() {
  // Start the serial communication
  serial = new p5.SerialPort();
  console.log('p5.serialport.js ' + serial.version);
  serial.list();
  serial.openPort("/dev/cu.usbmodemHIDPC1");


  // When our serial port is opened and ready for read/write

  // when we connect to the underlying server
  serial.on('connected', gotServerConnection);

  // when we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', receiveData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);

  serial.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  serial.on('rawdata', gotRawData);
}

function decodeString(input) {


  // Split the input string into 3 parts: B values, A values, and encoder value
  var parts = input.split("A");
  var secStr = parts[1].split("E");
  var aValues = secStr[0].split(",");
  var bValues = parts[0].substring(1).split(",");

  encoderValue = parseInt(secStr[1]);


  // Convert the B values into integers and store them in the buttonsArray
  for (var i = 0; i < bValues.length; i++) {
    if (bValues[i] != "") {
      buttonsArray[i] = parseInt(bValues[i]);
    }
  }

  // Convert the A values into integers and store them in the analogSensorsArray
  for (i = 0; i < aValues.length; i++) {
    if (aValues[i] != "") {
      analogSensorsArray[i] = parseInt(aValues[i]);
    }
  }
}



// We are connected and ready to go
function gotServerConnection() {
  print('connected to server');
}

// Got the list of ports
function gotList(list) {
  print('list of serial ports:');
  // list is an array of their names
  for (let i = 0; i < list.length; i++) {
    print(list[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print('serial port is open');
}

function gotClose() {
  print('serial port is closed');
  latestData = 'serial port is closed';
}

// Ut oh, here is an error, let's log it
function gotError(e) {
  print(e);
}

// there is data available to work with from the serial port
function gotData() {
  // read the incoming string
  let currentString = serial.readLine();
  // remove any trailing whitespace
  trim(currentString);
  // if the string is empty, do no more
  if (!currentString) {
    return;
  }
  // print the string
  console.log(currentString);
  // save it for the draw method
  latestData = currentString;
}

// we got raw from the serial port
function gotRawData(data) {


}