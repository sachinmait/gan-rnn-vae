// AI Data from provided JSON
const aiData = {
  "gans": {
    "name": "GANs",
    "fullName": "Generative Adversarial Networks",
    "color": "#FE90E8",
    "tagline": "Two AIs Compete to Create Amazing Fakes!",
    "description": "GANs are like a forger and a detective playing a game. One AI (Generator) tries to create fake data, while another AI (Discriminator) tries to catch the fakes. They keep getting better until the Generator creates incredibly realistic fake content!",
    "howItWorks": [
      "Generator starts with random noise",
      "Creates fake data (like images)",
      "Discriminator examines real and fake data",
      "Discriminator tries to spot the fakes",
      "Both AIs learn and improve from feedback",
      "Process repeats until fakes look real"
    ],
    "examples": [
      "Creating realistic human faces that don't exist",
      "Generating artwork in different styles",
      "Making deepfake videos",
      "Creating synthetic training data",
      "Generating realistic game textures"
    ],
    "funFacts": [
      "GANs were invented in 2014 by Ian Goodfellow",
      "Some GAN-created art has sold for thousands of dollars",
      "GANs can create faces of people who never existed"
    ]
  },
  "rnns": {
    "name": "RNNs", 
    "fullName": "Recurrent Neural Networks",
    "color": "#99E865",
    "tagline": "AI with Memory - Learns from the Past!",
    "description": "RNNs are like AI with a memory. Unlike regular neural networks that forget everything after each input, RNNs remember what they've seen before. This makes them perfect for understanding sequences like sentences, music, or time series data.",
    "howItWorks": [
      "Takes input data one step at a time",
      "Processes current input with previous memory",
      "Updates internal memory/hidden state", 
      "Passes memory to next time step",
      "Can predict next item in sequence",
      "Memory helps understand context"
    ],
    "examples": [
      "Language translation (Google Translate)",
      "Speech recognition (Siri, Alexa)",
      "Chatbots and conversation AI",
      "Stock price prediction",
      "Music composition",
      "Handwriting recognition"
    ],
    "funFacts": [
      "RNNs power most voice assistants you use daily",
      "They can write poetry and stories",
      "RNNs help predict weather patterns"
    ]
  },
  "vaes": {
    "name": "VAEs",
    "fullName": "Variational Autoencoders", 
    "color": "#C0FFEF",
    "tagline": "Compress, Learn, and Create Variations!",
    "description": "VAEs are like smart compression tools that learn the essence of data. They compress complex data into simple codes, then use those codes to create new, similar data. Think of it like learning the 'recipe' for different types of images or sounds.",
    "howItWorks": [
      "Encoder compresses input into simple code",
      "Code captures essential features", 
      "Adds randomness to the code",
      "Decoder reconstructs data from code",
      "Can generate variations by changing code",
      "Creates new data similar to training examples"
    ],
    "examples": [
      "Generating similar but new images",
      "Creating variations of existing designs",
      "Data compression and reconstruction", 
      "Removing noise from images",
      "Creating new music compositions",
      "Drug discovery and molecular design"
    ],
    "funFacts": [
      "VAEs can create infinite variations of the same image",
      "They're used in creating new drug molecules",
      "VAEs can 'imagine' what's missing in damaged photos"
    ]
  }
};

const quizData = {
  "gans": [
    {
      "question": "What are the two main parts of a GAN?",
      "options": ["Encoder and Decoder", "Generator and Discriminator", "Input and Output", "Teacher and Student"],
      "correct": 1,
      "explanation": "GANs have a Generator that creates fake data and a Discriminator that tries to detect fakes!"
    },
    {
      "question": "What does the Generator in a GAN try to do?",
      "options": ["Detect fake images", "Create realistic fake data", "Compress data", "Translate languages"],
      "correct": 1,
      "explanation": "The Generator's job is to create fake data that looks so real it can fool the Discriminator!"
    }
  ],
  "rnns": [
    {
      "question": "What makes RNNs special compared to regular neural networks?", 
      "options": ["They're faster", "They have memory", "They're smaller", "They use less power"],
      "correct": 1,
      "explanation": "RNNs can remember previous inputs, which helps them understand sequences and context!"
    },
    {
      "question": "Which of these is a common use of RNNs?",
      "options": ["Image recognition", "Language translation", "Data compression", "Game playing"],
      "correct": 1,
      "explanation": "RNNs are perfect for language tasks because they can understand word sequences and context!"
    }
  ],
  "vaes": [
    {
      "question": "What do the two main parts of a VAE do?",
      "options": ["Compete with each other", "Encode and decode data", "Generate and discriminate", "Input and output"],
      "correct": 1,  
      "explanation": "VAEs have an Encoder that compresses data and a Decoder that reconstructs it with variations!"
    },
    {
      "question": "What makes VAEs good at generating new data?",
      "options": ["They memorize everything", "They add randomness to codes", "They copy existing data", "They use very large networks"],
      "correct": 1,
      "explanation": "VAEs add randomness to the compressed codes, allowing them to create variations of the original data!"
    }
  ]
};

// State management
let currentAI = null;
let currentSection = 'what';
let currentQuestionIndex = 0;
let quizScore = 0;
let progress = {
  gans: false,
  rnns: false,
  vaes: false
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  setupEventListeners();
  updateProgressDisplay();
});

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // AI card clicks
  document.querySelectorAll('.ai-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const aiType = this.dataset.ai;
      console.log('AI card clicked:', aiType);
      loadAIContent(aiType);
    });
  });

  // Back button
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back button clicked');
      goToLanding();
    });
  }
  
  // Modal buttons
  const continueBtn = document.querySelector('.continue-btn');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (continueBtn) {
    continueBtn.addEventListener('click', function(e) {
      e.preventDefault();
      hideModal();
      goToLanding();
    });
  }
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      hideModal();
      goToLanding();
    });
  }
}

function setupSectionNavigation() {
  console.log('Setting up section navigation...');
  
  // Next buttons
  document.querySelectorAll('.next-btn').forEach(btn => {
    // Remove existing listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Next button clicked');
      goToNextSection();
    });
  });
  
  // Previous buttons
  document.querySelectorAll('.prev-btn').forEach(btn => {
    // Remove existing listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Previous button clicked');
      goToPreviousSection();
    });
  });
}

function loadAIContent(aiType) {
  console.log('Loading AI content for:', aiType);
  currentAI = aiType;
  const data = aiData[aiType];
  
  if (!data) {
    console.error('No data found for AI type:', aiType);
    return;
  }
  
  // Update page content
  const titleEl = document.getElementById('ai-title');
  const subtitleEl = document.getElementById('ai-subtitle');
  const descriptionEl = document.getElementById('ai-description');
  const funFactEl = document.getElementById('fun-fact-text');
  
  if (titleEl) titleEl.textContent = data.name;
  if (subtitleEl) subtitleEl.textContent = data.fullName;
  if (descriptionEl) descriptionEl.textContent = data.description;
  
  // Set fun fact
  if (funFactEl) {
    const randomFact = data.funFacts[Math.floor(Math.random() * data.funFacts.length)];
    funFactEl.textContent = randomFact;
  }
  
  // Load steps
  loadSteps(data.howItWorks);
  
  // Load examples
  loadExamples(data.examples);
  
  // Load demo
  loadDemo(aiType);
  
  // Load quiz
  loadQuiz(aiType);
  
  // Show AI page and reset to first section
  showPage('ai-page');
  setTimeout(() => {
    goToSection('what');
    setupSectionNavigation();
  }, 100);
  
  console.log('AI content loaded successfully');
}

function loadSteps(steps) {
  const container = document.getElementById('steps-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  steps.forEach((step, index) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-item';
    stepDiv.innerHTML = `
      <div class="step-number">${index + 1}</div>
      <div class="step-text">${step}</div>
    `;
    container.appendChild(stepDiv);
  });
}

function loadExamples(examples) {
  const container = document.getElementById('examples-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  examples.forEach(example => {
    const exampleDiv = document.createElement('div');
    exampleDiv.className = 'example-item';
    exampleDiv.innerHTML = `
      <h4>💡 ${example}</h4>
    `;
    container.appendChild(exampleDiv);
  });
}

function loadDemo(aiType) {
  const container = document.getElementById('demo-container');
  if (!container) return;
  
  if (aiType === 'gans') {
    container.innerHTML = `
      <h3>Real vs Fake Game</h3>
      <p>Can you tell which image description sounds more realistic?</p>
      <div class="demo-game" id="gans-demo">
        <div class="demo-question" id="demo-question">
          Click "New Round" to start!
        </div>
        <div class="demo-controls">
          <button class="demo-btn" id="real-btn">Real</button>
          <button class="demo-btn" id="fake-btn">Fake</button>
          <button class="demo-btn" id="new-round-btn">New Round</button>
        </div>
        <div class="demo-result" id="demo-result"></div>
      </div>
    `;
    setupGANsDemo();
  } else if (aiType === 'rnns') {
    container.innerHTML = `
      <h3>Word Prediction Game</h3>
      <p>Complete the sentence like an RNN would!</p>
      <div class="demo-game" id="rnns-demo">
        <div class="demo-question" id="demo-sentence">
          The weather today is...
        </div>
        <div class="demo-controls">
          <button class="demo-btn prediction-btn" data-word="sunny">sunny</button>
          <button class="demo-btn prediction-btn" data-word="cloudy">cloudy</button>
          <button class="demo-btn prediction-btn" data-word="rainy">rainy</button>
          <button class="demo-btn" id="new-sentence-btn">New Sentence</button>
        </div>
        <div class="demo-result" id="demo-result"></div>
      </div>
    `;
    setupRNNsDemo();
  } else if (aiType === 'vaes') {
    container.innerHTML = `
      <h3>Image Variation Generator</h3>
      <p>See how VAEs create variations of input data!</p>
      <div class="demo-game" id="vaes-demo">
        <div class="demo-question" id="demo-input">
          Original: 🏠 House
        </div>
        <div class="demo-controls">
          <button class="demo-btn" id="generate-btn">Generate Variations</button>
          <button class="demo-btn" id="new-input-btn">New Input</button>
        </div>
        <div class="demo-result" id="demo-result"></div>
      </div>
    `;
    setupVAEsDemo();
  }
}

function setupGANsDemo() {
  const realBtn = document.getElementById('real-btn');
  const fakeBtn = document.getElementById('fake-btn');
  const newRoundBtn = document.getElementById('new-round-btn');
  const questionEl = document.getElementById('demo-question');
  const resultEl = document.getElementById('demo-result');
  
  const scenarios = [
    { text: "A portrait of a person with perfectly symmetrical features and flawless skin", isReal: false },
    { text: "A selfie with natural lighting and slight imperfections", isReal: true },
    { text: "An artwork that perfectly mimics Van Gogh's style but shows a modern city", isReal: false },
    { text: "A photograph with natural shadows and realistic proportions", isReal: true }
  ];
  
  let currentScenario = null;
  
  if (newRoundBtn) {
    newRoundBtn.addEventListener('click', function() {
      currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      if (questionEl) questionEl.textContent = currentScenario.text;
      if (resultEl) resultEl.textContent = '';
      if (realBtn) realBtn.style.display = 'inline-block';
      if (fakeBtn) fakeBtn.style.display = 'inline-block';
    });
  }
  
  if (realBtn) {
    realBtn.addEventListener('click', function() {
      checkAnswer(true);
    });
  }
  
  if (fakeBtn) {
    fakeBtn.addEventListener('click', function() {
      checkAnswer(false);
    });
  }
  
  function checkAnswer(userGuess) {
    if (!currentScenario || !resultEl) return;
    
    const correct = userGuess === currentScenario.isReal;
    if (correct) {
      resultEl.textContent = "🎉 Correct! " + (currentScenario.isReal ? "This sounds like real data!" : "This was generated by AI!");
      resultEl.style.background = '#99E865';
    } else {
      resultEl.textContent = "❌ Not quite! " + (currentScenario.isReal ? "This was actually real data." : "This was actually generated by AI.");
      resultEl.style.background = '#FE90E8';
    }
    if (realBtn) realBtn.style.display = 'none';
    if (fakeBtn) fakeBtn.style.display = 'none';
  }
}

function setupRNNsDemo() {
  const predictionBtns = document.querySelectorAll('.prediction-btn');
  const newSentenceBtn = document.getElementById('new-sentence-btn');
  const sentenceEl = document.getElementById('demo-sentence');
  const resultEl = document.getElementById('demo-result');
  
  const sentences = [
    { start: "The weather today is", words: ["sunny", "cloudy", "rainy"], best: "sunny" },
    { start: "I love to eat", words: ["pizza", "books", "music"], best: "pizza" },
    { start: "The cat is", words: ["sleeping", "flying", "swimming"], best: "sleeping" },
    { start: "My favorite color is", words: ["blue", "fast", "loud"], best: "blue" }
  ];
  
  let currentSentence = sentences[0];
  
  predictionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const word = this.dataset.word;
      const isGood = word === currentSentence.best;
      
      if (resultEl) {
        if (isGood) {
          resultEl.textContent = `🎉 Great prediction! "${word}" makes perfect sense in context!`;
          resultEl.style.background = '#99E865';
        } else {
          resultEl.textContent = `🤔 Hmm, "${word}" doesn't quite fit. RNNs learn what words usually come next!`;
          resultEl.style.background = '#FFDC8B';
        }
      }
    });
  });
  
  if (newSentenceBtn) {
    newSentenceBtn.addEventListener('click', function() {
      currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
      if (sentenceEl) sentenceEl.textContent = currentSentence.start + "...";
      
      predictionBtns.forEach((btn, index) => {
        btn.textContent = currentSentence.words[index];
        btn.dataset.word = currentSentence.words[index];
      });
      
      if (resultEl) resultEl.textContent = '';
    });
  }
}

function setupVAEsDemo() {
  const generateBtn = document.getElementById('generate-btn');
  const newInputBtn = document.getElementById('new-input-btn');
  const inputEl = document.getElementById('demo-input');
  const resultEl = document.getElementById('demo-result');
  
  const inputs = [
    { original: "🏠 House", variations: ["🏡 Cottage", "🏰 Castle", "🏢 Building"] },
    { original: "🐱 Cat", variations: ["🐈 Kitten", "🦁 Lion", "🐅 Tiger"] },
    { original: "🌸 Flower", variations: ["🌺 Hibiscus", "🌻 Sunflower", "🌹 Rose"] },
    { original: "🚗 Car", variations: ["🚙 SUV", "🏎️ Sports Car", "🚐 Van"] }
  ];
  
  let currentInput = inputs[0];
  
  if (generateBtn) {
    generateBtn.addEventListener('click', function() {
      const variations = currentInput.variations.join(" | ");
      if (resultEl) {
        resultEl.innerHTML = `<strong>Generated Variations:</strong><br>${variations}<br><br>VAEs learned the 'essence' of the input and created similar but different outputs!`;
        resultEl.style.background = '#C0FFEF';
      }
    });
  }
  
  if (newInputBtn) {
    newInputBtn.addEventListener('click', function() {
      currentInput = inputs[Math.floor(Math.random() * inputs.length)];
      if (inputEl) inputEl.textContent = `Original: ${currentInput.original}`;
      if (resultEl) resultEl.textContent = '';
    });
  }
}

function loadQuiz(aiType) {
  const questions = quizData[aiType];
  currentQuestionIndex = 0;
  quizScore = 0;
  
  const totalQuestionsEl = document.getElementById('total-questions');
  const totalScoreEl = document.getElementById('total-score');
  
  if (totalQuestionsEl) totalQuestionsEl.textContent = questions.length;
  if (totalScoreEl) totalScoreEl.textContent = questions.length;
  
  // Setup quiz event listeners
  const retakeBtn = document.querySelector('.retake-btn');
  const completeBtn = document.querySelector('.complete-btn');
  
  if (retakeBtn) {
    const newRetakeBtn = retakeBtn.cloneNode(true);
    retakeBtn.parentNode.replaceChild(newRetakeBtn, retakeBtn);
    newRetakeBtn.addEventListener('click', retakeQuiz);
  }
  
  if (completeBtn) {
    const newCompleteBtn = completeBtn.cloneNode(true);
    completeBtn.parentNode.replaceChild(newCompleteBtn, completeBtn);
    newCompleteBtn.addEventListener('click', completeModule);
  }
}

function showQuestion() {
  if (!currentAI) return;
  
  const questions = quizData[currentAI];
  const question = questions[currentQuestionIndex];
  
  const questionNumEl = document.getElementById('question-num');
  const questionTextEl = document.getElementById('question-text');
  
  if (questionNumEl) questionNumEl.textContent = currentQuestionIndex + 1;
  if (questionTextEl) questionTextEl.textContent = question.question;
  
  const optionsContainer = document.getElementById('options-container');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option;
      button.addEventListener('click', function() {
        selectAnswer(index);
      });
      optionsContainer.appendChild(button);
    });
  }
  
  // Hide feedback
  const feedbackEl = document.getElementById('question-feedback');
  if (feedbackEl) feedbackEl.classList.add('hidden');
}

function selectAnswer(selectedIndex) {
  if (!currentAI) return;
  
  const questions = quizData[currentAI];
  const question = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === question.correct;
  
  // Update score
  if (isCorrect) {
    quizScore++;
  }
  
  // Show feedback
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, index) => {
    btn.disabled = true;
    if (index === question.correct) {
      btn.classList.add('correct');
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });
  
  // Show explanation
  const feedbackTextEl = document.getElementById('feedback-text');
  const feedbackEl = document.getElementById('question-feedback');
  
  if (feedbackTextEl) feedbackTextEl.textContent = question.explanation;
  if (feedbackEl) feedbackEl.classList.remove('hidden');
  
  // Setup next question button
  const nextQuestionBtn = document.getElementById('next-question-btn');
  if (nextQuestionBtn) {
    const newBtn = nextQuestionBtn.cloneNode(true);
    nextQuestionBtn.parentNode.replaceChild(newBtn, nextQuestionBtn);
    newBtn.addEventListener('click', nextQuestion);
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  const questions = quizData[currentAI];
  
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const questionCard = document.getElementById('question-card');
  const quizResults = document.getElementById('quiz-results');
  const scoreEl = document.getElementById('score');
  
  if (questionCard) questionCard.classList.add('hidden');
  if (scoreEl) scoreEl.textContent = quizScore;
  if (quizResults) quizResults.classList.remove('hidden');
}

function retakeQuiz() {
  currentQuestionIndex = 0;
  quizScore = 0;
  const questionCard = document.getElementById('question-card');
  const quizResults = document.getElementById('quiz-results');
  
  if (quizResults) quizResults.classList.add('hidden');
  if (questionCard) questionCard.classList.remove('hidden');
  showQuestion();
}

function completeModule() {
  if (currentAI) {
    progress[currentAI] = true;
    updateProgressDisplay();
    const completedAIEl = document.getElementById('completed-ai');
    if (completedAIEl) completedAIEl.textContent = aiData[currentAI].name;
    showModal();
  }
}

function goToSection(section) {
  console.log('Going to section:', section);
  
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  
  // Show target section
  const targetSection = document.getElementById(section + '-section');
  if (targetSection) {
    targetSection.classList.remove('hidden');
    targetSection.classList.add('active');
    
    // If it's the quiz section, show the first question
    if (section === 'quiz') {
      setTimeout(() => showQuestion(), 100);
    }
  }
  
  // Update progress dots
  const sections = ['what', 'how', 'examples', 'demo', 'quiz'];
  const currentIndex = sections.indexOf(section);
  
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.remove('active', 'completed');
    if (index < currentIndex) {
      dot.classList.add('completed');
    } else if (index === currentIndex) {
      dot.classList.add('active');
    }
  });
  
  currentSection = section;
}

function goToNextSection() {
  const sections = ['what', 'how', 'examples', 'demo', 'quiz'];
  const currentIndex = sections.indexOf(currentSection);
  
  if (currentIndex < sections.length - 1) {
    goToSection(sections[currentIndex + 1]);
  }
}

function goToPreviousSection() {
  const sections = ['what', 'how', 'examples', 'demo', 'quiz'];
  const currentIndex = sections.indexOf(currentSection);
  
  if (currentIndex > 0) {
    goToSection(sections[currentIndex - 1]);
  }
}

function showPage(pageId) {
  console.log('Showing page:', pageId);
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
    page.classList.add('hidden');
  });
  
  // Show target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    targetPage.classList.add('active');
  }
}

function goToLanding() {
  console.log('Going to landing page');
  showPage('landing-page');
}

function showModal() {
  const modal = document.getElementById('completion-modal');
  if (modal) modal.classList.remove('hidden');
}

function hideModal() {
  const modal = document.getElementById('completion-modal');
  if (modal) modal.classList.add('hidden');
}

function updateProgressDisplay() {
  document.querySelectorAll('.progress-badge').forEach(badge => {
    const aiType = badge.dataset.ai;
    const statusEl = badge.querySelector('.badge-status');
    
    if (statusEl) {
      if (progress[aiType]) {
        statusEl.textContent = 'Completed ✓';
        badge.classList.add('completed');
      } else {
        statusEl.textContent = 'Not Started';
        badge.classList.remove('completed');
      }
    }
  });
}