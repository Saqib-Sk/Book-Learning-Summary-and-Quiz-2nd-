// Global Variables
let currentUser = null;
let currentBook = null;
let currentSlideIndex = 0;
let currentQuestionIndex = 0;
let showQuiz = false;
let userAnswers = [];
let selectedAnswer = null;
let startTime = null;
let timerInterval = null;

// Book Data
const bookData = {
    'think-grow-rich': {
        id: 'think-grow-rich',
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        slides: [
            {
                id: 1,
                title: "The Power of Thought",
                content: `Napoleon Hill's groundbreaking research revealed that thoughts are things—and powerful things at that when mixed with definiteness of purpose, persistence, and a burning desire for their translation into riches or other material objects. The starting point of all achievement is desire. Keep this constantly in mind. Weak desires bring weak results, just as a small fire makes a small amount of heat.

The subconscious mind makes no distinction between constructive and destructive thought impulses. It works with the material we feed it, through our thought impulses. The subconscious mind will translate into reality a thought driven by fear just as readily as it will translate into reality a thought driven by courage, or faith.

Every human being has the ability to completely control his own mind. With this control, obviously, every person may open his mind to the tricky impulses which are being released by other brains, or close the doors tightly and admit only the thought impulses of his own choice.`,
                questions: [
                    {
                        question: "According to Napoleon Hill, what is the starting point of all achievement?",
                        options: ["Persistence", "Desire", "Knowledge", "Action"],
                        correct: 1
                    },
                    {
                        question: "What does the subconscious mind distinguish between when processing thoughts?",
                        options: ["Good and bad thoughts", "Constructive and destructive thoughts", "It makes no distinction", "Positive and negative thoughts"],
                        correct: 2
                    }
                ]
            },
            {
                id: 2,
                title: "Faith - The Second Step to Riches",
                content: `Faith is the head chemist of the mind. When faith is blended with the vibration of thought, the subconscious mind instantly picks up the vibration, translates it into its spiritual equivalent, and transmits it to Infinite Intelligence, as in the case of prayer.

Faith is a state of mind which may be induced, or created, by affirmation or repeated instructions to the subconscious mind, through the principle of auto-suggestion. Consider the possibility that the emotion of faith is the only agency through which the cosmic force of Infinite Intelligence can be harnessed and used by man.

Every human being has the ability to completely control his own mind. With this control, obviously, every person may open his mind to the tricky impulses which are being released by other brains, or close the doors tightly and admit only the thought impulses of his own choice.`,
                questions: [
                    {
                        question: "What does Hill call faith in relation to the mind?",
                        options: ["The foundation", "The head chemist", "The driving force", "The key element"],
                        correct: 1
                    },
                    {
                        question: "How can faith be induced according to Hill?",
                        options: ["Through meditation", "Through affirmation and auto-suggestion", "Through prayer only", "Through positive thinking"],
                        correct: 1
                    }
                ]
            },
            {
                id: 3,
                title: "Auto-Suggestion - The Third Step to Riches",
                content: `Auto-suggestion is the agency of communication between that part of the mind where conscious thought takes place, and that which serves as the seat of action for the subconscious mind. Through the dominating thoughts which one permits to remain in the conscious mind, whether these thoughts be negative or positive, the principle of auto-suggestion voluntarily reaches the subconscious mind and influences it with these thoughts.

No thought, whether it be negative or positive, can enter the subconscious mind without the aid of the principle of auto-suggestion, with the exception of thoughts picked up from the ether. Stated differently, all self-administered stimuli which reach one's five senses constitute auto-suggestion.

Nature has so built man that he has absolute control over the material which reaches his subconscious mind, through his five senses, although this is not meant to be construed as a statement that man always exercises this control.`,
                questions: [
                    {
                        question: "What is auto-suggestion?",
                        options: ["A form of hypnosis", "Communication between conscious and subconscious mind", "Positive thinking", "Self-motivation technique"],
                        correct: 1
                    }
                ]
            }
        ]
    },
    'mindset': {
        id: 'mindset',
        title: 'Mindset: The New Psychology of Success',
        author: 'Carol S. Dweck',
        slides: [
            {
                id: 1,
                title: "Fixed vs Growth Mindset",
                content: `In a fixed mindset, people believe their basic qualities, like their intelligence or talent, are simply fixed traits. They spend their time documenting their intelligence or talent instead of developing them. They also believe that talent alone creates success—without effort.

In a growth mindset, people believe that their most basic abilities can be developed through dedication and hard work—brains and talent are just the starting point. This view creates a love of learning and a resilience that is essential for great accomplishment.

The passion for stretching yourself and sticking to it, even (or especially) when it's not going well, is the hallmark of the growth mindset. This is the mindset that allows people to thrive during some of the most challenging times in their lives.`,
                questions: [
                    {
                        question: "What do people with a fixed mindset believe about their abilities?",
                        options: ["They can be developed", "They are fixed traits", "They don't matter", "They change daily"],
                        correct: 1
                    },
                    {
                        question: "What creates a love of learning according to Dweck?",
                        options: ["Fixed mindset", "Growth mindset", "Natural talent", "High intelligence"],
                        correct: 1
                    }
                ]
            },
            {
                id: 2,
                title: "The Power of Yet",
                content: `The word "yet" is one of the most powerful words in the English language when it comes to learning and growth. When students say "I can't do this," adding the word "yet" transforms the statement into "I can't do this yet," which implies that with time, effort, and the right strategies, they will be able to do it.

This simple addition changes the entire mindset from one of fixed limitation to one of growth potential. It acknowledges that abilities and intelligence can be developed over time through dedication and hard work.

The power of "yet" helps people embrace challenges, persist in the face of setbacks, see effort as a path to mastery, learn from criticism, and find lessons and inspiration in the success of others.`,
                questions: [
                    {
                        question: "What does adding 'yet' to 'I can't do this' accomplish?",
                        options: ["Makes it sound better", "Transforms it into a growth statement", "Avoids responsibility", "Shows weakness"],
                        correct: 1
                    }
                ]
            }
        ]
    }
};

// Utility Functions
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show/hide navigation and timer based on section
    const navigation = document.getElementById('navigation');
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (sectionName === 'login') {
        navigation.style.display = 'none';
        timerDisplay.classList.remove('active');
    } else {
        navigation.style.display = 'block';
        if (sectionName === 'slides') {
            timerDisplay.classList.add('active');
            startTimer();
        } else {
            timerDisplay.classList.remove('active');
            stopTimer();
        }
    }
}

function showLoginTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (tabName === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        document.querySelector('.tab-btn').classList.add('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
    }
}

// Authentication Functions
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    currentUser = {
        fullName: username,
        username: username,
        designation: 'Student',
        team: 'Learning',
        city: 'Online',
        email: `${username}@example.com`,
        phone: '000-000-0000',
        date: new Date().toISOString().split('T')[0]
    };
    
    document.getElementById('navUserName').textContent = currentUser.fullName;
    showNotification('Login successful!');
    showSection('library');
}

function register() {
    const fullName = document.getElementById('regFullName').value;
    const username = document.getElementById('regUsername').value;
    const designation = document.getElementById('regDesignation').value;
    const team = document.getElementById('regTeam').value;
    const city = document.getElementById('regCity').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const date = document.getElementById('regDate').value;
    const password = document.getElementById('regPassword').value;
    
    if (!fullName || !username || !email || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    currentUser = {
        fullName,
        username,
        designation,
        team,
        city,
        email,
        phone,
        date
    };
    
    document.getElementById('navUserName').textContent = currentUser.fullName;
    showNotification('Registration successful!');
    showSection('library');
}

function logout() {
    currentUser = null;
    currentBook = null;
    currentSlideIndex = 0;
    currentQuestionIndex = 0;
    showQuiz = false;
    userAnswers = [];
    selectedAnswer = null;
    startTime = null;
    stopTimer();
    
    // Clear forms
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.querySelectorAll('#registerForm input').forEach(input => input.value = '');
    
    showSection('login');
    showNotification('Logged out successfully');
}

// Book Functions
function startBook(bookId) {
    currentBook = bookData[bookId];
    if (!currentBook) {
        showNotification('Book not found', 'error');
        return;
    }
    
    currentSlideIndex = 0;
    currentQuestionIndex = 0;
    showQuiz = false;
    userAnswers = [];
    selectedAnswer = null;
    startTime = new Date();
    
    document.getElementById('slideUserName').textContent = currentUser.fullName;
    
    loadSlide();
    showSection('slides');
    showNotification(`Started reading: ${currentBook.title}`);
}

function loadSlide() {
    if (!currentBook || !currentBook.slides[currentSlideIndex]) return;
    
    const slide = currentBook.slides[currentSlideIndex];
    
    document.getElementById('slideTitle').textContent = slide.title;
    document.getElementById('slideText').textContent = slide.content;
    
    // Update progress
    const progress = ((currentSlideIndex + (showQuiz ? 0.5 : 0)) / currentBook.slides.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '%';
    
    // Update navigation buttons
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');
    
    prevSlideBtn.style.display = currentSlideIndex > 0 ? 'flex' : 'none';
    nextSlideBtn.textContent = showQuiz ? 'Next Question' : 'Start Quiz';
    
    // Show/hide quiz section
    document.getElementById('slideContent').style.display = showQuiz ? 'none' : 'block';
    document.getElementById('quizSection').style.display = showQuiz ? 'block' : 'none';
    
    if (showQuiz) {
        loadQuestion();
    }
}

function loadQuestion() {
    if (!currentBook || !currentBook.slides[currentSlideIndex]) return;
    
    const slide = currentBook.slides[currentSlideIndex];
    const question = slide.questions[currentQuestionIndex];
    
    if (!question) return;
    
    document.getElementById('questionTitle').textContent = `Question ${currentQuestionIndex + 1} of ${slide.questions.length}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        
        if (selectedAnswer === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    prevQuestionBtn.style.display = currentQuestionIndex > 0 ? 'flex' : 'none';
    
    if (currentQuestionIndex < slide.questions.length - 1) {
        nextQuestionBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    } else if (currentSlideIndex < currentBook.slides.length - 1) {
        nextQuestionBtn.innerHTML = 'Next Slide <i class="fas fa-arrow-right"></i>';
    } else {
        nextQuestionBtn.innerHTML = 'Finish <i class="fas fa-check"></i>';
    }
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    
    // Update visual selection
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.toggle('selected', index === answerIndex);
    });
    
    // Store answer
    const globalQuestionIndex = currentSlideIndex * 10 + currentQuestionIndex;
    userAnswers[globalQuestionIndex] = answerIndex;
}

function nextSlide() {
    if (showQuiz) {
        nextQuestion();
    } else {
        showQuiz = true;
        currentQuestionIndex = 0;
        selectedAnswer = null;
        loadSlide();
    }
}

function previousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showQuiz = false;
        currentQuestionIndex = 0;
        selectedAnswer = null;
        loadSlide();
    }
}

function nextQuestion() {
    if (!currentBook || !currentBook.slides[currentSlideIndex]) return;
    
    const slide = currentBook.slides[currentSlideIndex];
    
    if (currentQuestionIndex < slide.questions.length - 1) {
        currentQuestionIndex++;
        selectedAnswer = null;
        loadQuestion();
    } else {
        // Move to next slide or finish
        if (currentSlideIndex < currentBook.slides.length - 1) {
            currentSlideIndex++;
            currentQuestionIndex = 0;
            showQuiz = false;
            selectedAnswer = null;
            loadSlide();
        } else {
            finishCourse();
        }
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        selectedAnswer = null;
        loadQuestion();
    }
}

function finishCourse() {
    stopTimer();
    loadScorecard();
    showSection('scorecard');
    showNotification('Course completed! Check your results.');
}

// Timer Functions
function startTimer() {
    if (!startTime) startTime = new Date();
    
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
        document.getElementById('timerText').textContent = formatTime(elapsed);
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Score Functions
function calculateScore() {
    if (!currentBook) return { score: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    let total = 0;
    
    currentBook.slides.forEach((slide, slideIndex) => {
        slide.questions.forEach((question, questionIndex) => {
            const globalIndex = slideIndex * 10 + questionIndex;
            if (userAnswers[globalIndex] === question.correct) {
                correct++;
            }
            total++;
        });
    });
    
    return {
        score: correct,
        total,
        percentage: Math.round((correct / total) * 100)
    };
}

function getGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
}

function getEncouragement(percentage) {
    if (percentage >= 90) return "Outstanding performance! You've mastered the concepts brilliantly!";
    if (percentage >= 80) return "Excellent work! You have a strong understanding of the material.";
    if (percentage >= 70) return "Good job! You're on the right track. Keep up the great work!";
    if (percentage >= 60) return "Well done! With a bit more practice, you'll excel even further.";
    return "Great effort! Every learning journey has its challenges. Keep going!";
}

function loadScorecard() {
    if (!currentUser || !currentBook) return;
    
    const { score, total, percentage } = calculateScore();
    const elapsedTime = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0;
    
    document.getElementById('scoreName').textContent = currentUser.fullName;
    document.getElementById('scoreMarks').textContent = `${score}/${total} (${percentage}%)`;
    document.getElementById('scoreGrade').textContent = getGrade(percentage);
    document.getElementById('scoreTime').textContent = formatTime(elapsedTime);
    document.getElementById('scoreBook').textContent = currentBook.title;
    document.getElementById('encouragementText').textContent = getEncouragement(percentage);
}

function downloadScorecard() {
    if (!currentUser || !currentBook) {
        showNotification('No data available for download', 'error');
        return;
    }

    try {
        const { jsPDF } = window.jsPDF;
        const doc = new jsPDF('landscape');
        const { score, total, percentage } = calculateScore();
        const elapsedTime = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0;
        
        // Set up the certificate design with violet and gold theme
        doc.setFillColor(75, 0, 130); // Dark violet background
        doc.rect(0, 0, 297, 210, 'F');
        
        // Golden decorative border
        doc.setDrawColor(255, 215, 0);
        doc.setLineWidth(4);
        doc.rect(10, 10, 277, 190);
        doc.setLineWidth(2);
        doc.rect(15, 15, 267, 180);
        
        // Certificate title
        doc.setTextColor(255, 215, 0);
        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text('CERTIFICATE OF COMPLETION', 148.5, 45, { align: 'center' });
        
        // Decorative line
        doc.setDrawColor(255, 215, 0);
        doc.setLineWidth(1);
        doc.line(50, 55, 247, 55);
        
        // Subtitle
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(220, 208, 255);
        doc.text('This is to certify that', 148.5, 70, { align: 'center' });
        
        // Student name
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(currentUser.fullName.toUpperCase(), 148.5, 90, { align: 'center' });
        
        // Course completion text
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(220, 208, 255);
        doc.text('has successfully completed the interactive course', 148.5, 105, { align: 'center' });
        
        // Book title
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 215, 0);
        doc.text(`"${currentBook.title}"`, 148.5, 125, { align: 'center' });
        
        // Author
        doc.setFontSize(14);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(168, 85, 247);
        doc.text(`by ${currentBook.author}`, 148.5, 135, { align: 'center' });
        
        // Performance details
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255);
        doc.text(`Score: ${score}/${total} (${percentage}%) | Grade: ${getGrade(percentage)}`, 148.5, 150, { align: 'center' });
        doc.text(`Time Spent: ${formatTime(elapsedTime)}`, 148.5, 165, { align: 'center' });
        
        // Date and signature area
        doc.setFontSize(12);
        doc.setTextColor(220, 208, 255);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 60, 185, { align: 'left' });
        doc.text('Learning Platform', 237, 185, { align: 'right' });
        
        // Decorative elements
        doc.setDrawColor(255, 215, 0);
        doc.setLineWidth(0.5);
        doc.line(40, 190, 120, 190); // Date line
        doc.line(177, 190, 257, 190); // Signature line
        
        // Save the PDF
        doc.save(`${currentUser.fullName.replace(/\s+/g, '_')}_${currentBook.title.replace(/\s+/g, '_')}_Certificate.pdf`);
        showNotification('Certificate downloaded successfully!');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating certificate. Please try again.', 'error');
    }
}

// Answers Review Functions
function loadAnswersReview() {
    if (!currentBook || userAnswers.length === 0) {
        document.getElementById('answersContent').innerHTML = '<p style="text-align: center; color: #c4b5fd;">No answers to review. Complete a course first.</p>';
        return;
    }
    
    const answersContent = document.getElementById('answersContent');
    answersContent.innerHTML = '';
    
    let questionCounter = 1;
    
    currentBook.slides.forEach((slide, slideIndex) => {
        slide.questions.forEach((question, questionIndex) => {
            const globalIndex = slideIndex * 10 + questionIndex;
            const userAnswer = userAnswers[globalIndex];
            const isCorrect = userAnswer === question.correct;
            
            const answerItem = document.createElement('div');
            answerItem.className = 'answer-item fade-in';
            
            answerItem.innerHTML = `
                <div class="answer-question">
                    <strong>Question ${questionCounter}:</strong> ${question.question}
                </div>
                <div class="answer-options">
                    ${question.options.map((option, index) => {
                        let className = 'answer-option neutral';
                        if (index === question.correct) {
                            className = 'answer-option correct';
                        } else if (index === userAnswer && index !== question.correct) {
                            className = 'answer-option incorrect';
                        }
                        
                        let prefix = '';
                        if (index === question.correct) {
                            prefix = '✓ ';
                        } else if (index === userAnswer && index !== question.correct) {
                            prefix = '✗ ';
                        }
                        
                        return `<div class="${className}">${prefix}${option}</div>`;
                    }).join('')}
                </div>
                <div class="answer-result ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Correct!' : '✗ Incorrect - The correct answer is highlighted above'}
                </div>
            `;
            
            answersContent.appendChild(answerItem);
            questionCounter++;
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    const dateInput = document.getElementById('regDate');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Show login section by default
    showSection('login');
    
    // Add event listeners for navigation
    document.addEventListener('click', function(e) {
        if (e.target.matches('[onclick*="showSection"]')) {
            const sectionName = e.target.getAttribute('onclick').match(/showSection\('(.+?)'\)/)[1];
            if (sectionName === 'answers') {
                loadAnswersReview();
            }
        }
    });
    
    console.log('Learning Platform initialized successfully!');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginSection').classList.contains('active')) {
        if (document.getElementById('loginForm').classList.contains('active')) {
            login();
        } else {
            register();
        }
    }
});