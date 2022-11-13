const CONFETTI = new JSConfetti();
const GIFT = document.querySelector(".js-gift");
const TOGGLE_BTN = document.querySelectorAll(".js-toggle-btn");
const MAIN_CONTAINER = document.querySelector(".js-container");

let intervalRef = null;
const INTERVAL_TIME = 3000;

const SENTENCES = [
	"میدونی امروز چه روزیه ؟",
	"امروز بهار درست وسط پاییز شروع میشه",
	"امروز مال توعه و خاص ترین روز پاییزه",
	"تولدت مبارک 🥳🥳🥳",
	"امیدوارم همیشه بخندی و خوشحال باشی",
	"به تمام آرزو هات با خوشحالی برسی",
	"و یادت باشه که چقدر واسه من مهمی",
	"الان که این‌ها رو مینویسم تو خوابیدی",
	"و قبل از بیدار شدنت این متن آماده میشه",
	"خیلیی دوستت دارم",
	"تو دقیقا مثل اسمت واسه من بهار هستی",
	"همه چی با تو نو میشه واسه من",
	"همه چی رنگ میگیره",
	"و زندگی شروع میشه ...",
	"بهارم امیدوارم به همه آرزو هات بررسی",
	"و خیلییی زود توی پاریس قهوه ات رو سفارش بدی",
	"یادت نره بخندی",
	"و همینطور اینکه خیلی دوستت دارم",
	"همینطور یادت نره که این سایت توعه",
	"سایت خودت رو بساز ...",
	"از طرف رامین",
];

const createSentence = (text) => {
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

const init = () => {
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

TOGGLE_BTN.forEach((item) =>
	item.addEventListener("click", () => {
		if (!GIFT?.classList.contains("hidden")) {
			CONFETTI.addConfetti({
				emojiSize: 10,
				confettiRadius: 2,
				confettiNumber: 1000,
			});
			playSentences();
			GIFT?.classList.add("hidden");
			MAIN_CONTAINER?.classList.remove("hidden");
		} else {
			init();
		}
	})
);

init();
