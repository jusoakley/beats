var margin = 130;
var triggers = [];
var toggle = false;
var bpm = 80;

var robMonoBold, robMonoMed, vt;

////////////////////////////////////////////
//Pattern Arrays for Each Phrase ("sample")
///////////////////////////////////////////
var kickPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var snarePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var ridePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var crashPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var tomPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var fuzzPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var bleepPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var muteFill = 225;
var soundFill = '#77F097';

//Sound vars
var kick, snare, ride, crash, tom, fuzz, bleep;

/////////////////////////
//Phrase for Each Sound
///////////////////////
var kickPhrase = new p5.Phrase('kickPhrase', triggerKick, kickPattern);
var snarePhrase = new p5.Phrase('snarePhrase', triggerSnare, snarePattern);
var ridePhrase = new p5.Phrase('ridePhrase', triggerRide, ridePattern);
var crashPhrase = new p5.Phrase('crashPhrase', triggerCrash, crashPattern);
var tomPhrase = new p5.Phrase('tomPhrase', triggerTom, tomPattern);
var fuzzPhrase = new p5.Phrase('fuzzPhrase', triggerFuzz, fuzzPattern);
var bleepPhrase = new p5.Phrase('bleepPhrase', triggerBleep, bleepPattern);

//This creates a p5 "Part" object that controls the beat's BPM and looping
var mainBeat;

//Trigger pad coordinates
var x = 150;
var y = 170;

//Start/Stop Constructor
function StartStop() {
	this.x = 140;
	this.y = 90;
	this.width = 175;
	this.height = 50;
	this.onOff = false;
	this.display = function() {
		noStroke();
		fill(232, 0, 164, 80);
		rect(this.x, this.y, this.width, this.height);
	}
	this.clicked = function (){
		//Calculate the distance between the upper left corner of the trigger and mouse location, 
		//then run the following code if the mouse was inside the trigger.
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (this.onOff == false){
				this.onOff = true;
				userStartAudio(); // Function needed to pass Chrome's autoplay criteria.
				mainBeat.loop();
			} else {
				this.onOff = false;
				mainBeat.stop();
			}
		}
	}
}

var playPause = new StartStop();

//BPM Control Objects
var incBPM = {
	size: 22,
	text: "+",
	width: 35,
	height: 15,
	x: 367,
	y: 26,
	display() {
		fill(0);
		rect(this.x, this.y, this.width, this.height);
		fill(255);
		textFont(robMonoMed);
		textSize(this.size);
		text(this.text, this.x + 11, this.y + 15);

	}, 
	inc() {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			bpm++;
			mainBeat.setBPM(bpm);
		}
	}
}

var decBPM = {
	size: 30,
	text: "-",
	width: 35,
	height: 15,
	x: 367,
	y: 45,
	display() {
		fill(0);
		rect(this.x, this.y, this.width, this.height);
		fill(255);
		textSize(this.size);
		text(this.text, this.x + 9, this.y + 2 + 15);

	}, 
	dec() {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			bpm--;
			mainBeat.setBPM(bpm);
		}
	}
}

//Trigger Constructor
function Trigger(x, y, color, toggle) {
	this.width = 40;
	this.height = 40;
	this.x = x;
	this.y = y;
	this.color = color;
	this.toggle = toggle;
	this.display = function() {
		noStroke();
		fill(this.color);
		rect(this.x, this.y, this.width, this.height);
	}
	//Switch runs whenever mouse is clicked, checks if mouse is inside a pad, and changes colors
	//of pad if it is. Also adds or removes a phrase (sample) to the main beat.
	this.switch = function() {
		//Calculate the distance between the upper left corner of the trigger and mouse location, 
		//then run the following code if the mouse was inside the trigger.
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (this.toggle == false){
			 	this.toggle = true;
			 	this.color = soundFill;
			 	if (this.y <= 170){
			 		mainBeat.addPhrase(bleepPhrase);
			 		///////////////////////
			 		//Bleep Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			bleepPattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			bleepPattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			bleepPattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			bleepPattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			bleepPattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			bleepPattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			bleepPattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			bleepPattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			bleepPattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			bleepPattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			bleepPattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			bleepPattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			bleepPattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			bleepPattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			bleepPattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			bleepPattern[15] = 1;
			 		}
			 	} else if (this.y <= 220){
			 		mainBeat.addPhrase(fuzzPhrase);
			 		///////////////////////
			 		//Fuzz Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			fuzzPattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			fuzzPattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			fuzzPattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			fuzzPattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			fuzzPattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			fuzzPattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			fuzzPattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			fuzzPattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			fuzzPattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			fuzzPattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			fuzzPattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			fuzzPattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			fuzzPattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			fuzzPattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			fuzzPattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			fuzzPattern[15] = 1;
			 		}
			 	} else if (this.y <= 270){
			 		mainBeat.addPhrase(tomPhrase);
			 		///////////////////////
			 		//Tom Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			tomPattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			tomPattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			tomPattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			tomPattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			tomPattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			tomPattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			tomPattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			tomPattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			tomPattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			tomPattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			tomPattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			tomPattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			tomPattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			tomPattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			tomPattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			tomPattern[15] = 1;
			 		}
			 	} else if (this.y <= 320){
			 		mainBeat.addPhrase(crashPhrase);
			 		///////////////////////
			 		//Crash Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			crashPattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			crashPattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			crashPattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			crashPattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			crashPattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			crashPattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			crashPattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			crashPattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			crashPattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			crashPattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			crashPattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			crashPattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			crashPattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			crashPattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			crashPattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			crashPattern[15] = 1;
			 		}

			 	} else if (this.y <= 370){
			 		mainBeat.addPhrase(ridePhrase);
			 		///////////////////////
			 		//Ride Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			ridePattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			ridePattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			ridePattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			ridePattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			ridePattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			ridePattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			ridePattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			ridePattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			ridePattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			ridePattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			ridePattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			ridePattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			ridePattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			ridePattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			ridePattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			ridePattern[15] = 1;
			 		}
			 	} else if (this.y <= 420){
			 		mainBeat.addPhrase(snarePhrase);
			 		///////////////////////
			 		//Snare Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			snarePattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			snarePattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			snarePattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			snarePattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			snarePattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			snarePattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			snarePattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			snarePattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			snarePattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			snarePattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			snarePattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			snarePattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			snarePattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			snarePattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			snarePattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			snarePattern[15] = 1;
			 		}
			 	} else if (this.y <= 470){
			 		mainBeat.addPhrase(kickPhrase);
			 		///////////////////////
			 		//Kick Pattern Control - Adding a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			kickPattern[0] = 1;
			 		} else if (this.x <= 200) {
			 			kickPattern[1] = 1;
			 		} else if (this.x <= 250) {
			 			kickPattern[2] = 1;
			 		} else if (this.x <= 300) {
			 			kickPattern[3] = 1;
			 		} else if (this.x <= 350) {
			 			kickPattern[4] = 1;
			 		} else if (this.x <= 400) {
			 			kickPattern[5] = 1;
			 		} else if (this.x <= 450) {
			 			kickPattern[6] = 1;
			 		} else if (this.x <= 500) {
			 			kickPattern[7] = 1;
			 		} else if (this.x <= 550) {
			 			kickPattern[8] = 1;
			 		} else if (this.x <= 600) {
			 			kickPattern[9] = 1;
			 		} else if (this.x <= 650) {
			 			kickPattern[10] = 1;
			 		} else if (this.x <= 700) {
			 			kickPattern[11] = 1;
			 		} else if (this.x <= 750) {
			 			kickPattern[12] = 1;
			 		} else if (this.x <= 800) {
			 			kickPattern[13] = 1;
			 		} else if (this.x <= 850) {
			 			kickPattern[14] = 1;
			 		} else if (this.x <= 900) {
			 			kickPattern[15] = 1;
			 		}
			 	}
			} else {
				this.toggle = false;
				this.color = muteFill;
				if (this.y <= 170){
			 		//mainBeat.removePhrase(bleepPhrase);

			 		///////////////////////
			 		//Bleep Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			bleepPattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			bleepPattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			bleepPattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			bleepPattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			bleepPattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			bleepPattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			bleepPattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			bleepPattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			bleepPattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			bleepPattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			bleepPattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			bleepPattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			bleepPattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			bleepPattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			bleepPattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			bleepPattern[15] = 0;
			 		}
			 	} else if (this.y <= 220){
			 		//mainBeat.removePhrase(fuzzPhrase);

			 		///////////////////////
			 		//Fuzz Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			fuzzPattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			fuzzPattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			fuzzPattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			fuzzPattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			fuzzPattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			fuzzPattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			fuzzPattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			fuzzPattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			fuzzPattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			fuzzPattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			fuzzPattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			fuzzPattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			fuzzPattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			fuzzPattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			fuzzPattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			fuzzPattern[15] = 0;
			 		}
			 	} else if (this.y <= 270){
			 		//mainBeat.removePhrase(tomPhrase);

			 		///////////////////////
			 		//Tom Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			tomPattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			tomPattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			tomPattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			tomPattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			tomPattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			tomPattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			tomPattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			tomPattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			tomPattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			tomPattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			tomPattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			tomPattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			tomPattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			tomPattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			tomPattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			tomPattern[15] = 0;
			 		}
			 	} else if (this.y <= 320){
			 		//mainBeat.removePhrase(crashPhrase);

			 		///////////////////////
			 		//Crash Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			crashPattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			crashPattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			crashPattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			crashPattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			crashPattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			crashPattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			crashPattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			crashPattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			crashPattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			crashPattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			crashPattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			crashPattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			crashPattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			crashPattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			crashPattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			crashPattern[15] = 0;
			 		}
			 	} else if (this.y <= 370){
			 		//mainBeat.removePhrase(ridePhrase);

			 		///////////////////////
			 		//Ride Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			ridePattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			ridePattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			ridePattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			ridePattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			ridePattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			ridePattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			ridePattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			ridePattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			ridePattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			ridePattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			ridePattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			ridePattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			ridePattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			ridePattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			ridePattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			ridePattern[15] = 0;
			 		}
			 	} else if (this.y <= 420){
			 		//mainBeat.removePhrase(snarePhrase);

			 		///////////////////////
			 		//Snare Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			snarePattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			snarePattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			snarePattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			snarePattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			snarePattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			snarePattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			snarePattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			snarePattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			snarePattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			snarePattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			snarePattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			snarePattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			snarePattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			snarePattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			snarePattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			snarePattern[15] = 0;
			 		}
			 	} else if (this.y <= 470){
			 		//mainBeat.removePhrase(kickPhrase);

			 		///////////////////////
			 		//Kick Pattern Control - Removing a Hit (alter values of pattern array based on trigger x value)
			 		/////////////////////
			 		if (this.x <= 150) {
			 			kickPattern[0] = 0;
			 		} else if (this.x <= 200) {
			 			kickPattern[1] = 0;
			 		} else if (this.x <= 250) {
			 			kickPattern[2] = 0;
			 		} else if (this.x <= 300) {
			 			kickPattern[3] = 0;
			 		} else if (this.x <= 350) {
			 			kickPattern[4] = 0;
			 		} else if (this.x <= 400) {
			 			kickPattern[5] = 0;
			 		} else if (this.x <= 450) {
			 			kickPattern[6] = 0;
			 		} else if (this.x <= 500) {
			 			kickPattern[7] = 0;
			 		} else if (this.x <= 550) {
			 			kickPattern[8] = 0;
			 		} else if (this.x <= 600) {
			 			kickPattern[9] = 0;
			 		} else if (this.x <= 650) {
			 			kickPattern[10] = 0;
			 		} else if (this.x <= 700) {
			 			kickPattern[11] = 0;
			 		} else if (this.x <= 750) {
			 			kickPattern[12] = 0;
			 		} else if (this.x <= 800) {
			 			kickPattern[13] = 0;
			 		} else if (this.x <= 850) {
			 			kickPattern[14] = 0;
			 		} else if (this.x <= 900) {
			 			kickPattern[15] = 0;
			 		}

			 	}
			}
		}
	}
}

//Loading each sound
function preload() {
	kick = loadSound('samples/kick.wav');
	snare = loadSound('samples/snare.wav');
	ride = loadSound('samples/ride.wav');
	crash = loadSound('samples/crash.wav');
	tom = loadSound('samples/tom.wav');
	fuzz = loadSound('samples/fuzz.wav');
	bleep = loadSound('samples/bleep.wav');
}

function setup() {
	createCanvas(1000, 600);
	background(255);
	mainBeat = new p5.Part(16);
	mainBeat.setBPM(bpm);

	//Fonts
	robMonoMed = loadFont("fonts/RobotoMono-Regular.ttf");
	robMonoBold = loadFont("fonts/RobotoMono-Bold.ttf");
	vt = loadFont("fonts/VT323-Regular.ttf");

	//Fill triggers array with Trigger objects
	//For every column of notes, make 7 pads
	for (var i = 1; i <= 16; i++) {
		for (var j = 0; j < 7; j++){		
			triggers.push(new Trigger(x, y, muteFill, false));
			//Increment y value so next coordinate is lower on screen
			y += 50;
		}
		//Increment x coordinates, reset y cooridnates to start new column
		x += 50;
		y = 170;
	}
	print(triggers);

}

function mousePressed() {
	//Engage or disengage trigger playback
	for (var i = 0; i < triggers.length; i++){
		triggers[i].switch();
	}

	//Play or Pause the Beat
	playPause.clicked();

	//Control BPM
	incBPM.inc();
	decBPM.dec();
}
	

function draw(){
	//Redraw background to conceal previous frames
	background(255);

	//BPM
	fill(0);
	textFont(robMonoBold);
	textSize(48);
	text("BPM: " + bpm, 140, 60);

	//BPM Controls
	incBPM.display();
	decBPM.display();

	//Sound names
	fill(0);
	textFont(vt);
	textSize(32);
	textStyle(ITALIC);
	textAlign(RIGHT);
	text("Bleep", margin, 200);
	text("Fuzz", margin, 250);
	text("Tom", margin, 300);
	text("Crash", margin, 350);
	text("Ride", margin, 400);
	text("Snare", margin, 450);
	text("Kick", margin, 500);
	textAlign(LEFT);

	//Start Stop Button
	playPause.display();
	fill(255);
	textFont(robMonoMed);
	textSize(24);
	text("PLAY / STOP", 149, 123);

	//Reference Background Rects
	fill(0, 134, 232, 80);
	rect(140, 160, 205, 360);

	fill(232, 0, 164, 80);
	rect(345, 160, 200, 360);

	fill(0, 134, 232, 80);
	rect(545, 160, 200, 360);

	fill(232, 0, 164, 80);
	rect(745, 160, 205, 360);

	//Time indicator "square"
	fill(0);
	rect(150 + ((mainBeat.metro.metroTicks%16) * 50), 525, 40, 40);

	//Display all the objects in the array
	for (var i = 0; i < triggers.length; i++){
		triggers[i].display();
	}

	//Non-object oriented version
	//
	// for (var i = 1; i <= 16; i++){
	// 	for (var b = 0; b < 7; b++){
	// 		rect(x, y, 40, 40);
	// 		y += 50;
	// 	}
	// 	//Increment x coordinates, reset y coordinates
	// 	x += 50;
	// 	y = 150;
	// }
	// //reset x coordinates so pads are redrawn in same places
	// x = 150;
}

function keyPressed() {
	if (keyCode == 32) {
		if (playPause.onOff == false){
				playPause.onOff = true;
				userStartAudio(); // Function needed to pass Chrome's autoplay criteria.
				mainBeat.loop();
			} else {
				playPause.onOff = false;
				mainBeat.stop();
			}
	}

	if (keyCode == UP_ARROW) {
		bpm++;
		mainBeat.setBPM(bpm);
	}

	if (keyCode == DOWN_ARROW) {
		bpm--;
		mainBeat.setBPM(bpm);
	}
}

/////////////////////////////
//Sample Playback Functions
///////////////////////////
function triggerKick(time){
	kick.play(time);
}

function triggerSnare(time){
	snare.play(time);
}

function triggerRide(time){
	ride.play(time);
}

function triggerCrash(time){
	crash.play(time);
}

function triggerTom(time){
	tom.play(time);
}

function triggerFuzz(time){
	fuzz.play(time);
}

function triggerBleep(time){
	bleep.play(time);
}
// function keyPressed() {

// }

// function keyReleased() {

// };