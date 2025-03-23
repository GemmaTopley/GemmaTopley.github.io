
// small screen navigation //

menuToggler.addEventListener('click', ev => {
	menu.classList.toggle('open');
	menuToggler.textContent = menuToggler.textContent === "×" ? "≡" : "×";
});

// tabs //

function openTab(evt, tabName) {
	let j, tabContent, tabLinks;
  
	tabContent = document.getElementsByClassName("tabContent");
	for (j = 0; j < tabContent.length; j++) {
		tabContent[j].style.display = "none";
	}
  
	tabLinks = document.getElementsByClassName("tabLinks");
	for (j = 0; j < tabLinks.length; j++) {
		tabLinks[j].className = tabLinks[j].className.replace(" active", "");
	}
	
	if(tabName == 'ageGallery'){
		document.getElementById(tabName).style.display = "flex";
	}else{
		document.getElementById(tabName).style.display = "grid";
	}
	evt.currentTarget.className += " active";
};



if(document.getElementById("mainGalleryBtn")){
	document.getElementById("mainGalleryBtn").addEventListener("click", function(event){
		openTab(event, 'mainGallery');
	})
};

if(document.getElementById("ageGalleryBtn")){
	document.getElementById("ageGalleryBtn").addEventListener("click", function(event){
		openTab(event, 'ageGallery');
	})
};

if(document.getElementById("friendsGalleryBtn")){
	document.getElementById("friendsGalleryBtn").addEventListener("click", function(event){
		openTab(event, 'friendsGallery');
	})
};

const defaultTab = document.getElementById("mainGalleryBtn");

if (defaultTab) {
	defaultTab.click();
};


// quiz //

function buildQuiz(){
	const output = [];

	myQuestions.forEach(
		(currentQuestion, questionNumber) => {
			const answers = [];

			for(letter in currentQuestion.answers){
				let inputType = "radio";
				if(Array.isArray(currentQuestion.correctAnswer)){
					inputType = "checkbox";
				};
				answers.push(
					`<label>
					 <input type="${inputType}" name="question${questionNumber}" value="${letter}">
					 ${currentQuestion.answers[letter]}
					</label>`
				);
			}

			const questionImg = currentQuestion.image ? `<img src="${currentQuestion.image}" class="questionImage">` : '';

			
			output.push(
				`<div class="question"> ${currentQuestion.question}</div>
				${questionImg}
				<div class="answers"> ${answers.join('')}</div>`
			);
		}
	);

	if (quizContainer){
		quizContainer.innerHTML = output.join('');
	}
}

function showResults(){
	const answerContainers = quizContainer.querySelectorAll('.answers');

	let numCorrect = 0;

	myQuestions.forEach((currentQuestion, questionNumber)=>{
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;

		let userAnswers = [];
		const checkedInputs = answerContainer.querySelectorAll(selector);
		if (checkedInputs.length>0){
			userAnswers = Array.from(answerContainer.querySelectorAll(selector)).map(input => input.value);
		}

		const correctAnswers = currentQuestion.correctAnswer;

		if(Array.isArray(correctAnswers)){
			if(arraysEqual(userAnswers, correctAnswers)){
				numCorrect ++;
			}
		} else if (userAnswers.includes(correctAnswers)){
			numCorrect ++;
		}		
	});

	resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
};

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
	{
		question: "When is Dorothy's Birthday?",
		answers: {
			a: "4th July",
			b: "15th August",
			c: "13th August",
			d: "8th November"
		},
		correctAnswer: "c"
	},
	{
		question: "Which of these are nicknames for Dorothy?",
		answers: {
			a: "Dodie",
			b: "DotDot",
			c: "Grump",
			d: "Dorithia",
			e: "Dottie"
		},
		correctAnswer: ["b", "d", "e"]
	},
	{
		question: "Who is this?",
		image: "images/bon.jpg",
		answers: {
			a: "Freddy",
			b: "Chica",
			c: "Bonnie",
			d: "Foxy"
		},
		correctAnswer: "c"
	},
	{
		question: "What breed is Dorothy",
		answers: {
			a: "British Shorthair",
			b: "Domestic Short Hair",
			c: "American Longhair",
			d: "Egyptian Mau",
			e: "Persian"
		},
		correctAnswer: "a"
	},
	{
		question: "What colour is Dorothy's harness",
		answers: {
			a: "Magenta",
			b: "Teal",
			c: "Lilac",
			d: "Maroon"
		},
		correctAnswer: "b"
	},
	{
		question: "Which activities does Dorothy enjoy?",
		answers: {
			a: "Being Awake",
			b: "Sleeping",
			c: "Exercising",
			d: "Playing Fetch",
			e: "More Sleeping"
		},
		correctAnswer: ["b", "d", "e"]
	},
	{
		question: "What colour coat does Dorothy have?",
		answers: {
			a: "Calico",
			b: "Diluted Tabby",
			c: "Diluted Calico",
			d: "Tortoiseshell"
		},
		correctAnswer: "c"
	},
]


buildQuiz();

if(submitButton){
	submitButton.addEventListener('click', showResults);
}




