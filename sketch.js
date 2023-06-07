
let data;
let humanFrame = [];
let namee = [];
let category = [];
let sciName = [];
let authority = [];
let nameAndAuth = [];
let range = [];
let order = [];
let family = [];
let extint = [];
let extintYear = [];
let sort = [];
let page = [];
let pageNo = [];
let numRows;
let numCols;
let isShowOnlySpecies = false;
let value;
let model = [];
let catDropdown;
let ordDropdown;
let famDropdown;
let dest;
let fontt;
let pgs;
let myState = -1;
let eggImg;
let humX = 100;
let humY = 555;
let whichHum = 10;
let canChangeHum = false;
var delay = 400;
let pointerX;
let pointerY;
let canShowInfo = false;
let eX;
let eY;
let bgImg = [];
let walkHuman;
let humWalking;
let speed = 2;
let brickImg, doorOpen, doorClose, discoDoorOpen;
let fontTitle;
let chngeColor = true;
let bgSound, enterSound, stepSound, easterEggSound, eggSound;
let easterPlay = false;
let counterrr = 0;



function preload() {
  eggSound = loadSound('Sounds/leisure_retro_arcade_game_drop_item_tone.mp3');
  stepSound = loadSound('Sounds/video-game-footsteps-walk-loop-vintage-eight-bit-SBA-300109719-preview.mp3');
  enterSound = loadSound('Sounds/enter.mp3');
  easterEggSound = loadSound('Sounds/albatroz.mp3');
  bgSound = loadSound('Sounds/retro-arcade.mp3');
  bgImg[0] = loadImage('Images/Barn outside.png');
  bgImg[1] = loadImage('Images/1.png');
  bgImg[2] = loadImage('Images/eggmniaStart.png');
  discoDoorOpen = loadImage('Images/disco1.png');
  data = loadTable("BirdData.csv", "csv", "header");
  fontt = loadFont('Fonts/DotGothic16-Regular.ttf');
  fontTitle = loadFont('Fonts/Galaxus D.otf');
  eggImg = loadImage('Images/Egg.png');
  brickImg = loadImage("Images/brick bg.png");
  doorOpen = loadImage("Images/open.png");
  doorClose = loadImage("Images/closed.png");
  humanFrame[10] = loadImage("Images/PixMan.png");
  humanFrame[0] = loadImage("Images/walk3.png");
  humanFrame[1] = loadImage("Images/walk1.png");
  humanFrame[2] = loadImage("Images/walk2.png");
  humanFrame[3] = loadImage("Images/walk3.png");
  humanFrame[4] = loadImage("Images/walk4.png");
  humanFrame[5] = loadImage("Images/walk5.png");
  humanFrame[6] = loadImage("Images/walk6.png");

  //walkHuman = loadAnimation('HumImgs/walk1.png', 'HumImgs/walk2.png', 'HumImgs/walk3.png', 'HumImgs/walk4.png', 'HumImgs/walk5.png', 'HumImgs/walk6.png',);

  humanFrame[7] = loadImage("Images/walkPoint.png");
}

function setup() {
  for (var i = 0; i < NUM_BUTTONS; i++) {
    buttonsArray[i] = 0;
  }

  // Initialize the arrays for analog sensors
  for (i = 0; i < NUM_ANALOG_SENSORS; i++) {
    analogSensorsArray[i] = 0;
  }

  // Initialize variable for encoder
  encoderValue = 0;

  // Start the serial communication
  serialSetup();
  //bgSound.play();
  // bgSound.setVolume(0.2);
  pgs = 50;
  nextTimer = millis() + delay;
  // humWalking = createSprite(0, 350, 20, 20);
  // humWalking.addAnimation("sumthng", walkHuman);
  newDiv = createDiv().id("category-data").parent('parent-container');
  nameEl = createP("").id("nameEl").parent('category-data');
  sciEl = createP("").id("sciEl").parent('category-data');
  value = createP("Navigate through the filters and touch the Egg to view more details!").id("data-el").parent('category-data');
  orderEl = createP("").id("orderEl").parent('category-data');
  familyEl = createP("").id("familyEl").parent('category-data');
  setInterval(swicher, 200);

  let canvas = createCanvas(1200, 800);


  // catDropdown = createSelect();
  // ordDropdown = createSelect();
  // famDropdown = createSelect();
  // catDropdown.parent('catdrop');
  // ordDropdown.parent('orderdrop');
  // famDropdown.parent('famdrop');

  // dropDownLister();




  numRows = data.getRowCount();
  numCols = data.getColumnCount();

  for (let r = 0; r < numRows; r++) {
    category[r] = data.getString(r, 3);
    namee[r] = data.getString(r, 4);
    sciName[r] = data.getString(r, 5);
    authority[r] = data.getString(r, 6);
    nameAndAuth[r] = data.getString(r, 7);
    range[r] = data.getString(r, 8);
    order[r] = data.getString(r, 9);
    family[r] = data.getString(r, 10);
    extint[r] = data.getString(r, 11);
    extintYear[r] = data.getString(r, 12);
    sort[r] = data.getString(r, 13);
    page[r] = data.getString(r, 14);

    if (page[r] === '') {
      pageNo.push(0);
    } else {
      pageNo.push(parseInt(page[r]));
    }

    if (namee[r] === '') {
      namee[r] = namee[r - 1];
    }
  }
}

function swicher() {
  chngeColor = !chngeColor;
}

function playBg() {
  if (easterPlay && !easterEggSound.isPlaying()) {

    easterEggSound.play();
    easterEggSound.setVolume(0.4);
  } else {

    if (!bgSound.isPlaying()) {
      bgSound.play();
      bgSound.setVolume(0.3);
    }

  }
}

function stateManager() {
  if (myState == -1 && keyIsPressed && key == ' ') {
    enterSound.play();
    myState = 0;
  } else if (myState == 0 && pointerX > 686 && pointerX < 800 && keyIsPressed && key == ' ') {
    enterSound.play();
    humX = 100;
    humY = 530;
    myState = 1;
  } else if (myState == 1 && pointerX > 286 && pointerX < 400 && keyIsPressed && key == ' ') {
    enterSound.play();
    humX = 100;
    humY = 530;
    myState = 2;
  } else if (myState == 2 && pointerX > 286 && pointerX < 400 && keyIsPressed && key == ' ') {
    enterSound.play();
    humX = 60;
    humY = 645;
    myState = 3;
  }
}

function filterSelect() {
  textFont(fontt);
  textSize(18);
  //textAlign(CENTER);
  textStyle(BOLD);
  fill(255);

  text('Category', 316, 450);
  text('Order', 530, 450);
  text('Family', 725, 450);
  text('Disco Room', 916, 450);


  //fill(0);
  //rect(686, 561, 40, 70);
  if (pointerX > 286 && pointerX < 400) {
    image(doorOpen, 286, 460, 120, 180);
  } else {
    image(doorClose, 286, 460, 120, 180);
  }

  if (pointerX > 486 && pointerX < 600) {
    image(doorOpen, 486, 460, 120, 180);
  } else {
    image(doorClose, 486, 460, 120, 180);
  }

  if (pointerX > 686 && pointerX < 800) {
    image(doorOpen, 686, 460, 120, 180);
  } else {
    image(doorClose, 686, 460, 120, 180);
  }

  if (pointerX > 886 && pointerX < 1000) {
    //easterEggSound.play();
    easterPlay = true;
    image(discoDoorOpen, 886, 460, 120, 180);
  } else {
    easterPlay = false;
    image(doorClose, 886, 460, 120, 180);
  }

}

function catSelect() {
  textFont(fontt);
  textSize(18);
  //textAlign(CENTER);
  textStyle(BOLD);
  fill(255);

  text('Species', 316, 450);
  text('SubSpecies', 500, 450);
  text('Others', 725, 450);


  //fill(0);
  //rect(686, 561, 40, 70);
  if (pointerX > 286 && pointerX < 400) {
    image(doorOpen, 286, 460, 120, 180);
  } else {
    image(doorClose, 286, 460, 120, 180);
  }

  if (pointerX > 486 && pointerX < 600) {
    image(doorOpen, 486, 460, 120, 180);
  } else {
    image(doorClose, 486, 460, 120, 180);
  }

  if (pointerX > 686 && pointerX < 800) {
    image(doorOpen, 686, 460, 120, 180);
  } else {
    image(doorClose, 686, 460, 120, 180);
  }

}

function pageLiner(d, j, pgNo) {
  push();
  i = pgNo;
  // push();
  // textFont(fontt);
  // textAlign(CENTER);
  // textSize(12);
  // fill(255);
  // text(i, d + 10, height - 5 - j);
  // pop();
  for (let r = 0; r < 10000; r++) {


    if (pageNo[r] === pgNo && category[r] == 'species') {
      noStroke();

      eX = d + 10;
      eY = height - 90 - j;

      if (dist(pointerX, pointerY, eX, eY) < 8) {
        if (!eggSound.isPlaying()) {
          eggSound.play();
        }
        canShowInfo = true;
        fill(255, 0, 0);
        image(eggImg, eX - 8, eY - 8, 15, 20);

        nameEl.html(namee[r]);
        sciEl.html(sciName[r]);
        value.html("Category:  " + category[r]);
        orderEl.html("Order:  " + order[r]);
        familyEl.html("Family:  " + family[r]);

      } else {
        canShowInfo = false;
        // model = [];
        if (category[r] === 'species') {
          fill('#FF7F65')
        } else if (category[r] === 'subspecies') {
          fill('#440EC0');
        } else {
          fill(68, 14, 192, 100);
        }
        image(eggImg, eX - 5, eY - 7, 10, 14);
        //ellipse(eX, eY, 8, 8);
      }
      j += 30;
    } else {
      dest = pgNo / 15;
    }
  }
  pop();
}

function startState() {
  push();
  textFont(fontTitle);
  textSize(160);
  textAlign(CENTER);
  textStyle(BOLD);
  fill(255);
  text('BIRD MANIA', width / 2, 420);
  if (chngeColor) {
    fill('blue');
  } else {
    fill('#00F0FF');
  }
  text('BIRD MANIA', (width / 2) + 2, (420) + 2);
  pop();
  //rect(width / 2, height / 2, 10, 10);
}

function showInfo() {
  fill('white');
  rect(eX + 5, eY + 5, 300, 80, 5);
  fill(0);
  textFont(fontt);
  textSize(10);
  text(namee[r], eX + 8, eY + 25);
}

function display(state) {
  if (state == -1) {
    background(0);
    image(bgImg[2], 0, 0, 1200, 800);
    startState();
  } else if (state == 0) {
    background(0);
    image(bgImg[0], 0, 0, 1200, 800);
    barnState();
  } else if (state == 1) {
    background(255);
    image(brickImg, 0, 0, 1200, 800);
    filterSelect();

  }
  else if (state == 2) {
    background(255);
    image(brickImg, 0, 0, 1200, 800);
    catSelect();
  } else if (state == 3) {
    background("#00031E");
    image(bgImg[1], 0, 0, 1200, 800);

    //image(humanFrame)
    for (let i = 2; i < pgs; i++) {
      dest = i * 90;
      let j = 0;
      pageLiner(dest, j, i);
    }
    // push();
    // fill(white);
    // textFont(fontt);
    // text('Pages', 800, 100);
    // pop();
  }
}

function barnState() {
  fill(0);
  rect(686, 561, 40, 70);
}

function makeHum() {
  image(humanFrame[whichHum], humX, humY, 36, 80);
  // var imageLink = '';
  // imageLink = humanFrame[0]
  // image(imageLink, humX, humY);
  fill(255);
  pointerX = humX + 40;
  pointerY = humY + 49;
  //ellipse(pointerX, pointerY, 10, 10);

  if (keyIsPressed && key == 'd' && humX < 1140) {
    //enterSound.loop();
    humX = humX + speed;
  } else if (keyIsPressed && key == 'a' && humX > 50) {
    //stepSound.play();
    humX = humX - speed;
  } else if (keyIsPressed && key == 's' && humY < 750) {
    // stepSound.play();
    canChangeHum = false;
    humY = humY + speed;
  } else if (keyIsPressed && key == 'w' && humY > 60) {
    // stepSound.play();
    canChangeHum = false;
    humY = humY - speed;
  }

  // setTimeout(changeHum(), 1000);
  //setInterval(changeHum, 1000);
  // setTimeout(function () {
  //   changeHum();
  // }, 500);
  //changeHum();
}

// function changeHum() {
//   if (keyIsPressed && whichHum < 7) {
//     //setInterval(500);
//     // setTimeout(function () {

//     // }, 500);
//     //whichHum++;

//     //console.log(whichHum);
//     // if (whichHum < 7) {
//     //   whichHum = 0;
//     //   //console.log(whichHum + " lol");
//     //   //whichHum = whichHum + 1;
//     // }
//     // // nextTimer = millis() + delay;
//     // console.log(whichHum);
//     // setTimeout(function () {
//     //   whichHum++;
//     // }, 2000);
//     // whichHum++;

//   } else {
//     //canChangeHum = true;
//     //whichHum = 1;
//   }
// }


function draw() {
  console.log(analogSensorsArray[0]);
  display(myState);
  if (myState != -1) {
    makeHum();
  }


  if (canShowInfo) {
    showInfo();
  }
  playBg();
  stateManager();
  // if (mouseIsPressed) {
  //   myState = 1;
  // }
}



