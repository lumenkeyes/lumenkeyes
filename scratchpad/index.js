const mainpad = document.querySelector("#mainpad");
mainpad.style.display = "none";
const wordCounter = document.querySelector("#wordCounter span");
//const warningBar = document.querySelector("#warningBar").style;
const timerDisplay = document.querySelector("#timerDisplay span");
const wordGoalElement = document.querySelector("#wordGoal");
const wordGoalContainer = document.querySelector("#wordGoalContainer");
let wordGoal = 0;
let clock;
let timeLeft = 10;
let wordCount = 0;
let startTime = Date.now();
//the clock, the tick timer, does not start until a value is submitted for a word count goal.
// the event listener is at the bottom of this code
const tick = () => {
	console.log("tick");
	setTimer(false)
	if(!timeLeft && wordCount < wordGoal) {
		mainpad.style.display = "none";
		clock = clearInterval(clock)
		clearPad()
	}
}
const clearPad = () => {
	mainpad.value = "";
	wordCounter.innerText = "0";
	//warningBar.backgroundColor = "red";
}
const setTimer = (reset) => {
	if(reset) {startTime = Date.now()}
	timeLeft = Math.max(0, Math.round((startTime - Date.now()) / 1000) + 10)
	timerDisplay.innerText = timeLeft;
}
mainpad.addEventListener("input", () => { 
	wordCount = mainpad.value.trim().split(/ +/).filter(el => el).length;
	wordCounter.innerText = wordCount;	
	setTimer(true);
})
wordGoalContainer.addEventListener("submit", () => {
	mainpad.style.display = "block";
	if(!clock) {
		console.log("making new clock...");
		clock = setInterval(() => tick(), 1000);
	}
	setTimer(true);
	wordGoal = wordGoalElement.value;
	console.log(wordGoal);
})
