const CONFETTI = new JSConfetti();
const TITLE = document.body.querySelector('h2');
const GIFT = document.querySelector(".js-gift");
const TOGGLE_BTN = document.querySelectorAll(".js-toggle-btn");
const MAIN_CONTAINER = document.querySelector(".js-container");

let SENTENCES = [];
const isLocal = true;
let intervalRef = null;
const INTERVAL_TIME = 3000;
const BASE_URL = isLocal ? 'http://localhost:8000' : 'https://baharayazi.iran.liara.run';

const createSentence = (text = '') => {
	const newSentence = document.createElement("p");
	newSentence.className = "animate__animated animate__fadeIn";
	newSentence.innerHTML = text;
	MAIN_CONTAINER?.append(newSentence);
};

const cleanerTime = () => {
	CONFETTI?.clearCanvas();
	if (intervalRef) {
		clearInterval(intervalRef);
		intervalRef = null;
	}
};

const showError = () => {
	GIFT.style.opacity = '0.3';
	TITLE.style.color = '#f00';
	TITLE.style.direction = 'ltr';
	GIFT.style.pointerEvents = 'none';
	GIFT.style.filter = 'grayscale(1)';
	TITLE.innerHTML = "🧨 Sorry, But It's Not Yours !";
	let timeOutRef = setTimeout(() => {
		GIFT.style.filter = '';
		TITLE.style.color = '';
		GIFT.style.opacity = '';
		TITLE.style.direction = '';
		GIFT.style.pointerEvents = '';
		TITLE.innerHTML = '🥳 Happy Birthday Bahar 🥳';
		clearTimeout(timeOutRef);
		timeOutRef = null;
	}, 10000);
}

const init = () => {
	TITLE.innerHTML = 'Happy Birthday Bahar';
	MAIN_CONTAINER.innerHTML = "";
	GIFT?.classList.remove("hidden");
	MAIN_CONTAINER?.classList.add("hidden");
	createSentence("سلام بهار ✌🏼");
	cleanerTime();
};

const playSentences = () => {
	let sentenceIndex = 0;
	intervalRef = setInterval(() => {
		if (!SENTENCES[sentenceIndex] && SENTENCES[sentenceIndex] !== "") {
			init();
			return;
		}
		// Fade Out Prev Sentence
		const pervSentence = MAIN_CONTAINER?.querySelector("p.animate__fadeIn");
		if (pervSentence) {
			pervSentence.classList.remove("animate__fadeIn");
			pervSentence.classList.add("animate__fadeOut");
		}
		// Make New Sentence
		createSentence(SENTENCES[sentenceIndex]);
		// Next
		sentenceIndex++;
	}, INTERVAL_TIME);
};

const auth = (password = '') => {
	fetch(`${BASE_URL}/api/account/login/`, {
		method: 'POST',
		body: JSON.stringify({ password }),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(res => res.json())
	.then(response => {
		if(response?.success) {
			SENTENCES = response?.data || []
			CONFETTI.addConfetti({
				confettiRadius: 2,
				confettiNumber: 1000,
			});
			playSentences();
			GIFT?.classList.add("hidden");
			MAIN_CONTAINER?.classList.remove("hidden");
		} else {
			showError();
		}		
	})
	.catch(error => {
		showError();
		console.log(error);
	})
};

TOGGLE_BTN.forEach((item, index) =>
	item.addEventListener("click", () => {
		if (!GIFT?.classList.contains("hidden")) {
			const userPassword = window.prompt('Password:', '');
			auth(userPassword);			
		} else {
			init();
		}
	})
);

init();
