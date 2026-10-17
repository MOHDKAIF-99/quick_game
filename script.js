/* ==========================================================================
   JAVASCRIPT — Logic, Animations, Quiz Flow & Live Real-Time Scoreboard
   ========================================================================== */

// --- 1. FALLING ROSE PETALS ANIMATION CANVAS ---
const canvas = document.getElementById("petalCanvas");
const ctx = canvas.getContext("2d");

let petals = [];
const TOTAL_PETALS = 32;

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
    // Rose pink & blush hues
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
    
    // Draw an organic rose petal shape
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


// --- 2. BOUQUET MODAL LETTERS ---
const bouquetLetters = [
  {
    icon: "🕊️",
    title: "Pure Serenity",
    text: "Just like white blossoms, your presence brings a peaceful calm wherever you are. Thank you for simply being the genuine, graceful person you are every day."
  },
  {
    icon: "👑",
    title: "Eternal Grace",
    text: "A bouquet as elegant as your smile. You light up ordinary moments effortlessly, and having you in life is something anyone would deeply appreciate."
  },
  {
    icon: "🌹",
    title: "Warm Affection",
    text: "Deep, heartfelt, and radiant. This bouquet represents appreciation for your laughter, your stories, and the beautiful vibe you naturally carry."
  }
];

function openBouquetLetter(index) {
  const data = bouquetLetters[index];
  document.getElementById("modalFlowerIcon").textContent = data.icon;
  document.getElementById("modalBouquetTitle").textContent = data.title;
  document.getElementById("modalBouquetText").textContent = data.text;
  document.getElementById("bouquetModal").classList.add("open");
}

function closeBouquetModal(e) {
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

let lastComplimentIdx = -1;
function generateRandomCompliment() {
  const display = document.getElementById("complimentDisplay");
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * sweetCompliments.length);
  } while (nextIdx === lastComplimentIdx && sweetCompliments.length > 1);
  
  lastComplimentIdx = nextIdx;
  display.style.opacity = "0";
  setTimeout(() => {
    display.textContent = sweetCompliments[nextIdx];
    display.style.opacity = "1";
  }, 200);
}


// --- 4. CUSTOMIZABLE QUIZ QUESTIONS ---
// Kaif can edit or add to these anytime
let quizQuestions = [
  {
    question: "When things get stressful, what is the best cure?",
    options: [
      { text: "A warm cup of coffee / tea and cozy music", points: 20 },
      { text: "A long, heartwarming conversation with someone who cares", points: 25 },
      { text: "Quiet time looking at beautiful flowers and skies", points: 20 },
      { text: "All of the above combined with a big smile", points: 25 }
    ],
    complimentNote: "Such an effortless comfort! 💕"
  },
  {
    question: "What is her superpower according to Kaif?",
    options: [
      { text: "Making any room feel calmer and happier", points: 25 },
      { text: "Having the most contagious and genuine laugh", points: 25 },
      { text: "Looking effortlessly elegant without trying", points: 25 },
      { text: "All of the above, every single day!", points: 25 }
    ],
    complimentNote: "Truly all of them without question! ✨"
  },
  {
    question: "If we had an ideal afternoon together, what would it look like?",
    options: [
      { text: "Walking through a scenic garden catching golden hour", points: 25 },
      { text: "Sharing favorite memories and laughing over good food", points: 25 },
      { text: "Enjoying the sunset and listening to favorite songs", points: 25 },
      { text: "Just enjoying each other's company anywhere", points: 25 }
    ],
    complimentNote: "That sounds like an unforgettable memory 🌸"
  },
  {
    question: "What kind of flowers fit her personality best?",
    options: [
      { text: "Pink Roses: Gentle, loving, and deeply cherished", points: 25 },
      { text: "White Lilies: Serene, pure, and elegant", points: 25 },
      { text: "Sunflowers: Bright, warm, and radiant", points: 25 },
      { text: "A custom bouquet of every lovely blossom", points: 25 }
    ],
    complimentNote: "A bloom as unique and graceful as her 🌷"
  }
];


// --- 5. QUIZ GAME ENGINE & FLOW ---
let currentPlayerName = "";
let currentQuestionIndex = 0;
let currentScore = 0;

// STEP 1: Get name before quiz starts
function startQuizWithName() {
  const input = document.getElementById("playerNameInput");
  const error = document.getElementById("nameError");
  const nameVal = input.value.trim();

  if (!nameVal) {
    error.textContent = "Please enter your name so Kaif knows whose score it is! 🌸";
    return;
  }
  
  if (nameVal.length < 2) {
    error.textContent = "Name must be at least 2 characters long.";
    return;
  }

  error.textContent = "";
  currentPlayerName = nameVal;
  currentQuestionIndex = 0;
  currentScore = 0;

  // Switch to question box
  document.getElementById("quizNamePrompt").classList.remove("active");
  document.getElementById("quizQuestionBox").classList.add("active");

  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const qData = quizQuestions[currentQuestionIndex];
  const total = quizQuestions.length;

  // Update progress & labels
  const progressPercent = ((currentQuestionIndex + 1) / total) * 100;
  document.getElementById("quizProgressBarFill").style.width = progressPercent + "%";
  document.getElementById("quizCounterText").textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  document.getElementById("quizScorePreview").textContent = `Score: ${currentScore}`;
  document.getElementById("questionTitle").textContent = qData.question;
  document.getElementById("answerReaction").textContent = "";

  // Render options
  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  qData.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span>${opt.text}</span> <i class="fa-regular fa-heart"></i>`;
    btn.onclick = () => selectOption(opt, btn);
    container.appendChild(btn);
  });
}

function selectOption(selectedOpt, btnElement) {
  // Disable all buttons in this question to prevent double clicks
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(b => (b.disabled = true));
  
  btnElement.classList.add("selected-correct");
  currentScore += selectedOpt.points;
  
  const qData = quizQuestions[currentQuestionIndex];
  document.getElementById("answerReaction").textContent = qData.complimentNote;

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }, 900);
}

function finishQuiz() {
  document.getElementById("quizQuestionBox").classList.remove("active");
  document.getElementById("quizResultBox").classList.add("active");

  document.getElementById("resultNameCongrats").textContent = `Wonderful, ${currentPlayerName}! 🎉`;
  document.getElementById("finalScoreVal").textContent = currentScore;

  let vibeTitle = "100% Soul Connection 💖";
  let vibeNote = "You and Kaif are in total harmony! A bond this thoughtful is rare and special.";

  if (currentScore < 70) {
    vibeTitle = "Sweet & Gentle Harmony 🌸";
    vibeNote = "Such a cute result! Every answer reflected your warm and unique personality.";
  }

  document.getElementById("resultTitle").textContent = vibeTitle;
  document.getElementById("resultFeedback").textContent = vibeNote;

  // Push score to Firestore so Kaif & she both see it live!
  saveScoreToLeaderboard(currentPlayerName, currentScore, vibeTitle);
}

function restartQuiz() {
  document.getElementById("quizResultBox").classList.remove("active");
  document.getElementById("quizNamePrompt").classList.add("active");
  document.getElementById("playerNameInput").value = "";
}


// --- 6. SHARED SCOREBOARD SYNC (FIREBASE + LOCAL FALLBACK) ---
const LOCAL_STORAGE_KEY = "kaif_romantic_scores_v1";

function saveScoreToLeaderboard(name, score, vibe) {
  const scoreData = {
    name: name,
    score: score,
    vibe: vibe,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: Date.now()
  };

  // 1. If Firebase Firestore is configured
  if (window.db && window.collection && window.addDoc) {
    try {
      window.addDoc(window.collection(window.db, "quiz_scores"), {
        ...scoreData,
        serverTime: window.serverTimestamp()
      }).catch(err => {
        console.warn("Firestore save error, saving locally:", err);
        saveLocally(scoreData);
      });
      return;
    } catch (e) {
      console.warn("Firestore error:", e);
    }
  }

  // 2. Fallback to localStorage
  saveLocally(scoreData);
}

function saveLocally(item) {
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  } catch (e) {
    list = [];
  }
  list.push(item);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  renderScoreboardTable(list);
}

// Listen to scores live
function initScoreboardListener() {
  if (window.db && window.collection && window.onSnapshot) {
    try {
      window.onSnapshot(window.collection(window.db, "quiz_scores"), (snapshot) => {
        const scores = [];
        snapshot.forEach((doc) => {
          scores.push(doc.data());
        });
        // Sort highest score first
        scores.sort((a, b) => (b.score || 0) - (a.score || 0));
        renderScoreboardTable(scores);
      });
      return;
    } catch (e) {
      console.warn("Snapshot fallback to local:", e);
    }
  }

  // Local fallback
  try {
    const list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    list.sort((a, b) => (b.score || 0) - (a.score || 0));
    renderScoreboardTable(list);
  } catch (e) {
    renderScoreboardTable([]);
  }
}

function renderScoreboardTable(scores) {
  const tbody = document.getElementById("scoreboardBody");
  if (!scores || scores.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="loading-td">No scores recorded yet. Be the first to play! 🌺</td>
      </tr>`;
    return;
  }

  tbody.innerHTML = "";
  scores.slice(0, 10).forEach((entry, i) => {
    const tr = document.createElement("tr");
    
    let rankBadgeClass = "";
    if (i === 0) rankBadgeClass = "top-1";
    else if (i === 1) rankBadgeClass = "top-2";
    else if (i === 2) rankBadgeClass = "top-3";

    tr.innerHTML = `
      <td><span class="rank-badge ${rankBadgeClass}">${i + 1}</span></td>
      <td><strong>${escapeHtml(entry.name || "Anonymous")}</strong></td>
      <td><span style="color: var(--soft-rose); font-weight:700;">${entry.score || 0} pts</span></td>
      <td>${escapeHtml(entry.vibe || "Cherished Connection 💖")}</td>
      <td style="color:#888;">${entry.timestamp || "Just now"}</td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}


// --- 7. QUESTION CUSTOMIZER (KAIF'S DRAWER) ---
function toggleQuestionEditor() {
  const drawer = document.getElementById("questionEditorDrawer");
  drawer.classList.toggle("open");
  if (drawer.classList.contains("open")) {
    renderEditorList();
  }
}

function renderEditorList() {
  const listEl = document.getElementById("editorQuestionsList");
  listEl.innerHTML = "";
  
  quizQuestions.forEach((q, qIdx) => {
    const item = document.createElement("div");
    item.className = "editor-item";
    item.innerHTML = `
      <strong>Q${qIdx + 1}:</strong>
      <input type="text" value="${escapeHtml(q.question)}" onchange="updateQuestionTitle(${qIdx}, this.value)" />
    `;
    listEl.appendChild(item);
  });
}

function updateQuestionTitle(idx, newText) {
  if (quizQuestions[idx]) {
    quizQuestions[idx].question = newText;
  }
}

function addNewBlankQuestion() {
  quizQuestions.push({
    question: "A new custom question for her?",
    options: [
      { text: "Special Option 1", points: 25 },
      { text: "Special Option 2", points: 25 },
      { text: "Special Option 3", points: 25 },
      { text: "Special Option 4", points: 25 }
    ],
    complimentNote: "Written specially with love! 💖"
  });
  renderEditorList();
}

// Start listener once DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Give Firebase a brief tick to initialize, then attach listener
  setTimeout(initScoreboardListener, 300);
});