/* ==========================================================================
   JAVASCRIPT — With Option Selection, Confirm Button & Email Notification
   ========================================================================== */

// 🔑 PASTE YOUR WEB3FORMS ACCESS KEY HERE:
const WEB3FORMS_ACCESS_KEY = "c2cc751a-212c-4002-96a9-c69c9f2f9896";


// --- 1. FALLING ROSE PETALS ANIMATION CANVAS ---
const canvas = document.getElementById("petalCanvas");
const ctx = canvas.getContext("2d");

let petals = [];
const TOTAL_PETALS = 30;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Petal {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -30;
    this.size = Math.random() * 14 + 10;
    this.speedY = Math.random() * 1.2 + 0.8;
    this.speedX = Math.sin(Math.random() * 5) * 0.9;
    this.angle = Math.random() * 360;
    this.spin = Math.random() * 1.5 - 0.75;
    this.opacity = Math.random() * 0.45 + 0.35;
    this.color = Math.random() > 0.4 ? "rgba(224, 137, 155, " : "rgba(247, 182, 196, ";
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y / 45) * 1.1 + this.speedX;
    this.angle += this.spin;

    if (this.y > canvas.height + 25 || this.x < -30 || this.x > canvas.width + 30) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.fillStyle = this.color + this.opacity + ")";
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
    ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < TOTAL_PETALS; i++) {
  petals.push(new Petal());
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animatePetals);
}
animatePetals();


// --- 2. BOUQUET MODALS ---
const bouquetLetters = [
  {
    icon: "🕊️",
    title: "Pure Serenity",
    text: "Just like white blossoms, your presence brings a peaceful calm. Thank you for simply being the genuine, graceful person you are every day."
  },
  {
    icon: "👑",
    title: "Eternal Grace",
    text: "A bouquet as elegant as your smile. You light up ordinary moments effortlessly, and having you around is something anyone would deeply appreciate."
  },
  {
    icon: "🌹",
    title: "Warm Affection",
    text: "Heartfelt and radiant. This bouquet represents appreciation for your laughter, your stories, and the beautiful vibe you naturally carry."
  }
];

function openBouquetLetter(index) {
  const data = bouquetLetters[index];
  document.getElementById("modalFlowerIcon").textContent = data.icon;
  document.getElementById("modalBouquetTitle").textContent = data.title;
  document.getElementById("modalBouquetText").textContent = data.text;
  document.getElementById("bouquetModal").classList.add("open");
}

function closeBouquetModal() {
  document.getElementById("bouquetModal").classList.remove("open");
}


// --- 3. RANDOM COMPLIMENT GENERATOR ---
const sweetCompliments = [
  "“Your smile has a way of making even the busiest day feel peaceful.”",
  "“You have that rare grace that makes everyone around you feel valued.”",
  "“There is an unmistakable kindness in the way you speak and listen.”",
  "“The world is genuinely softer and brighter because you are in it.”",
  "“Never forget how remarkable your mind and your heart are.”",
  "“You don’t even have to try; your positive energy is simply contagious.”"
];

function generateRandomCompliment() {
  const display = document.getElementById("complimentDisplay");
  const rand = Math.floor(Math.random() * sweetCompliments.length);
  display.style.opacity = "0";
  setTimeout(() => {
    display.textContent = sweetCompliments[rand];
    display.style.opacity = "1";
  }, 200);
}


// --- 4. QUESTIONS FOR HER ---
const herQuestions = [
  {
    question: "When you want to feel relaxed and happy, what do you prefer most?",
    options: [
      "A peaceful evening with soft music and calm thoughts",
      "Talking and laughing about random funny things",
      "Sitting quietly in the fresh air watching the sky",
      "A cozy drink and good conversations"
    ],
    compliment: "That sounds so relaxing and pure 🌸"
  },
  {
    question: "If you could pick one thing that always makes you smile, what would it be?",
    options: [
      "Unexpected sweet compliments and genuine kindness",
      "Fresh blooming flowers and gentle sunlight",
      "Someone remembering the little things about you",
      "Late night laughs and meaningful talks"
    ],
    compliment: "Your smile is truly the best thing! ✨"
  },
  {
    question: "What is your favorite kind of vibe?",
    options: [
      "Soft, warm, and comforting (like golden hour)",
      "Playful, exciting, and full of giggles",
      "Peaceful, quiet, and thoughtful",
      "Dreamy, starlit, and cozy"
    ],
    compliment: "You carry that exact vibe wherever you go 💕"
  },
  {
    question: "What is one message Kaif should always remember for you?",
    options: [
      "Always be here to make me smile",
      "Keep sending cute surprises and thoughtful words",
      "Remind me how special I am when things get tough",
      "All of the above!"
    ],
    compliment: "Promised, always and forever 🌷"
  }
];

let herName = "";
let currentQIndex = 0;
let recordedAnswers = [];
let temporarilySelectedOption = null; // stores her click before confirming


// --- 5. QUIZ GAME FLOW ---
function startQuizWithName() {
  const input = document.getElementById("playerNameInput");
  const error = document.getElementById("nameError");
  const nameVal = input.value.trim();

  if (!nameVal) {
    error.textContent = "Please enter your name first 🌸";
    return;
  }

  error.textContent = "";
  herName = nameVal;
  currentQIndex = 0;
  recordedAnswers = [];
  temporarilySelectedOption = null;

  document.getElementById("quizNamePrompt").classList.remove("active");
  document.getElementById("quizQuestionBox").classList.add("active");

  renderQuestion();
}

function renderQuestion() {
  temporarilySelectedOption = null;
  const qData = herQuestions[currentQIndex];
  const total = herQuestions.length;

  document.getElementById("quizProgressBarFill").style.width = `${((currentQIndex + 1) / total) * 100}%`;
  document.getElementById("quizCounterText").textContent = `Question ${currentQIndex + 1} of ${total}`;
  document.getElementById("questionTitle").textContent = qData.question;
  document.getElementById("answerReaction").textContent = "";

  // Hide the confirm button until an option is clicked
  const confirmWrapper = document.getElementById("confirmWrapper");
  confirmWrapper.classList.remove("show");

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  qData.options.forEach((optText) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span>${optText}</span> <i class="fa-regular fa-heart"></i>`;
    
    // Clicking selects the option and reveals the Confirm button
    btn.onclick = () => selectOptionTemp(optText, btn);
    container.appendChild(btn);
  });
}

// Called when she clicks any option: highlights it and displays the Confirm button
function selectOptionTemp(selectedText, btnElement) {
  temporarilySelectedOption = selectedText;

  // Remove selected class from all other buttons
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach((b) => b.classList.remove("selected"));

  // Highlight this one
  btnElement.classList.add("selected");

  // Show the Confirm button
  const confirmWrapper = document.getElementById("confirmWrapper");
  confirmWrapper.classList.add("show");
}

// Called when she clicks "Confirm My Choice"
function confirmCurrentAnswer() {
  if (!temporarilySelectedOption) return;

  // Disable options and confirm button to prevent double-submitting
  document.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));
  document.getElementById("confirmBtn").disabled = true;

  // Save the answer
  recordedAnswers.push({
    question: herQuestions[currentQIndex].question,
    answer: temporarilySelectedOption
  });

  // Display warm feedback toast
  document.getElementById("answerReaction").textContent = herQuestions[currentQIndex].compliment;

  // Progress to next question or results
  setTimeout(() => {
    document.getElementById("confirmBtn").disabled = false;
    currentQIndex++;
    if (currentQIndex < herQuestions.length) {
      renderQuestion();
    } else {
      finishAndSendAnswers();
    }
  }, 750);
}

function finishAndSendAnswers() {
  document.getElementById("quizQuestionBox").classList.remove("active");
  document.getElementById("quizResultBox").classList.add("active");
  document.getElementById("resultNameCongrats").textContent = `Thank You, ${herName}! 💌`;

  // Send answers straight to Kaif's email via Web3Forms API
  sendEmailNotification(herName, recordedAnswers);
}

function restartQuiz() {
  document.getElementById("quizResultBox").classList.remove("active");
  document.getElementById("quizNamePrompt").classList.add("active");
  document.getElementById("playerNameInput").value = "";
  document.getElementById("sendStatus").textContent = "";
}


// --- 6. WEB3FORMS EMAIL DISPATCHER ---
function sendEmailNotification(name, answers) {
  const statusEl = document.getElementById("sendStatus");
  
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.includes("PASTE_YOUR")) {
    console.warn("Please add your Web3Forms access key inside script.js!");
    return;
  }

  // Format the email body nicely
  const answersFormatted = answers.map((item, idx) => {
    return `Question ${idx + 1}: ${item.question}\nHer Answer: 👉 ${item.answer}\n`;
  }).join("\n------------------------------------\n\n");

  const emailBody = `🌸 Kaif, someone just answered your questions!\n\nName: ${name}\nSubmitted At: ${new Date().toLocaleString()}\n\n====================================\n\n${answersFormatted}\n====================================`;

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `🌸 ${name} just answered your special quiz!`,
      from_name: `${name} (Quiz Form)`,
      message: emailBody
    })
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      console.log("Email delivered to Kaif successfully!");
      if (statusEl) statusEl.textContent = "🌸 (Answers sent directly to Kaif's inbox)";
    } else {
      console.error("Web3Forms error:", data);
    }
  })
  .catch((err) => {
    console.error("Failed to send submission email:", err);
  });
}