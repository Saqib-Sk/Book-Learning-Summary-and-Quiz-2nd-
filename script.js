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

// Book Data with 15 slides and 3 questions per slide
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
                    },
                    {
                        question: "What can every human being completely control according to Hill?",
                        options: ["Their destiny", "Their own mind", "Their circumstances", "Their wealth"],
                        correct: 1
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
                    },
                    {
                        question: "What is faith described as in relation to Infinite Intelligence?",
                        options: ["A barrier", "The only agency to harness it", "A secondary tool", "An optional element"],
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
                    },
                    {
                        question: "How do thoughts enter the subconscious mind?",
                        options: ["Automatically", "Through auto-suggestion or from the ether", "Only through meditation", "Through external influence only"],
                        correct: 1
                    },
                    {
                        question: "What control does man have over his subconscious mind?",
                        options: ["No control", "Partial control", "Absolute control over material reaching it", "Control only during sleep"],
                        correct: 2
                    }
                ]
            },
            {
                id: 4,
                title: "Specialized Knowledge - The Fourth Step to Riches",
                content: `There are two kinds of knowledge. One is general, the other is specialized. General knowledge, no matter how great in quantity or variety it may be, is of but little use in the accumulation of money. The faculties of the great universities possess, in the aggregate, practically every form of general knowledge known to civilization. Most of the professors have but little or no money.

Knowledge will not attract money, unless it is organized, and intelligently directed, through practical plans of action, to the definite end of accumulation of money. Lack of understanding of this fact has been the source of confusion to millions of people who falsely believe that "knowledge is power." It is nothing of the sort! Knowledge is only potential power. It becomes power only when, and if, it is organized into definite plans of action, and directed to a definite end.`,
                questions: [
                    {
                        question: "What are the two kinds of knowledge according to Hill?",
                        options: ["Practical and theoretical", "General and specialized", "Academic and street smart", "Learned and intuitive"],
                        correct: 1
                    },
                    {
                        question: "Why do university professors often have little money despite their knowledge?",
                        options: ["They don't work hard enough", "They have general knowledge, not specialized", "They're not interested in money", "They lack intelligence"],
                        correct: 1
                    },
                    {
                        question: "When does knowledge become power?",
                        options: ["When it's memorized", "When it's organized into definite plans of action", "When it's shared with others", "When it's written down"],
                        correct: 1
                    }
                ]
            },
            {
                id: 5,
                title: "Imagination - The Fifth Step to Riches",
                content: `The imagination is literally the workshop wherein are fashioned all plans created by man. The impulse, the desire, is given shape, form, and action through the aid of the imaginative faculty of the mind. It has been said that man can create anything which he can imagine.

Through the aid of his imaginative faculty, man has discovered, and harnessed, more of Nature's forces during the past fifty years than during the entire history of the human race, previous to that time. He has conquered the air so completely that the birds are a poor match for him in flying. He has harnessed the ether, and made it serve as a means of instantaneous communication with any part of the world.

There are two forms of imagination: Synthetic Imagination and Creative Imagination. Through synthetic imagination, one may arrange old concepts, ideas, or plans into new combinations. Through creative imagination, the finite mind of man has direct communication with Infinite Intelligence.`,
                questions: [
                    {
                        question: "What is imagination described as?",
                        options: ["A luxury", "The workshop where all plans are fashioned", "A distraction", "An entertainment"],
                        correct: 1
                    },
                    {
                        question: "What are the two forms of imagination?",
                        options: ["Active and passive", "Synthetic and Creative", "Practical and theoretical", "Conscious and unconscious"],
                        correct: 1
                    },
                    {
                        question: "What does creative imagination provide?",
                        options: ["Entertainment", "Direct communication with Infinite Intelligence", "Better memory", "Artistic ability"],
                        correct: 1
                    }
                ]
            },
            {
                id: 6,
                title: "Organized Planning - The Sixth Step to Riches",
                content: `You have learned that everything man creates or acquires begins in the form of desire, that desire is taken on the first lap of its journey, from the abstract to the concrete, into the workshop of the imagination, where plans for its transition are created and organized.

You have been informed that everything created by man begins in the form of a thought impulse. From this statement, you will readily observe that the starting point of all achievement is desire, and the finishing point is that brand of knowledge which leads to understanding of how to transform desire into its monetary equivalent.

No individual has sufficient experience, education, native ability, and knowledge to insure the accumulation of a great fortune, without the cooperation of other people. Every plan you adopt, in your endeavor to accumulate wealth, should be the joint creation of yourself and every other member of your "Master Mind" group.`,
                questions: [
                    {
                        question: "Where do all human creations begin?",
                        options: ["In action", "In the form of desire", "In education", "In circumstances"],
                        correct: 1
                    },
                    {
                        question: "What is the finishing point of achievement?",
                        options: ["Hard work", "Knowledge that transforms desire into monetary equivalent", "Good luck", "Natural talent"],
                        correct: 1
                    },
                    {
                        question: "What does Hill say about individual capability for great fortune?",
                        options: ["Anyone can do it alone", "No individual has sufficient capability without cooperation", "Only geniuses can do it", "It's purely about luck"],
                        correct: 1
                    }
                ]
            },
            {
                id: 7,
                title: "Decision - The Seventh Step to Riches",
                content: `Accurate analysis of over 25,000 men and women who had experienced failure, disclosed the fact that lack of decision was near the head of the list of the 30 major causes of failure. This is no mere statement of a theory—it is a fact.

Procrastination, the opposite of decision, is a common enemy which practically every man must conquer. You will have an opportunity to test your capacity to reach quick and definite decisions when you finish reading this book, and are ready to begin putting into action the principles which it describes.

The majority of people who fail to accumulate money sufficient for their needs are, generally, easily influenced by the "opinions" of others. They permit the newspapers and the "gossiping" neighbors to do their "thinking" for them. Opinions are the cheapest commodities on earth. Everyone has a flock of opinions ready to be wished upon anyone who will accept them.`,
                questions: [
                    {
                        question: "What was near the head of the list of 30 major causes of failure?",
                        options: ["Lack of education", "Lack of decision", "Lack of money", "Lack of opportunity"],
                        correct: 1
                    },
                    {
                        question: "What is the opposite of decision?",
                        options: ["Hesitation", "Procrastination", "Confusion", "Indecision"],
                        correct: 1
                    },
                    {
                        question: "What influences the majority of people who fail to accumulate money?",
                        options: ["Their own thoughts", "The opinions of others", "Their education", "Their circumstances"],
                        correct: 1
                    }
                ]
            },
            {
                id: 8,
                title: "Persistence - The Eighth Step to Riches",
                content: `Persistence is an essential factor in the procedure of transmuting desire into its monetary equivalent. The basis of persistence is the power of will. Will-power and desire, when properly combined, make an irresistible pair. Men who accumulate great fortunes are generally known as cold-blooded, and sometimes ruthless. Often they are misunderstood. What they have is will-power, which they mix with persistence, and place back of their desires to insure the attainment of their objectives.

The majority of people are ready to throw their aims and purposes overboard, and give up at the first sign of opposition or misfortune. A few carry on despite all opposition, until they attain their goal. These few are the Fords, the Carnegies, the Rockefellers, and the Edisons.

There may be no heroic connotation to the word "persistence," but the quality is to the character of man what carbon is to steel. The building of a fortune, generally, involves the application of the entire thirteen factors of this philosophy.`,
                questions: [
                    {
                        question: "What is the basis of persistence?",
                        options: ["Intelligence", "The power of will", "Education", "Circumstances"],
                        correct: 1
                    },
                    {
                        question: "What do will-power and desire make when properly combined?",
                        options: ["A good start", "An irresistible pair", "A strong foundation", "A useful tool"],
                        correct: 1
                    },
                    {
                        question: "What is persistence compared to in relation to character?",
                        options: ["Water to a plant", "Carbon to steel", "Foundation to a building", "Fuel to a car"],
                        correct: 1
                    }
                ]
            },
            {
                id: 9,
                title: "Power of the Master Mind - The Ninth Step to Riches",
                content: `Power is essential for success in the accumulation of money. Plans are inert and useless, without sufficient power to translate them into action. This chapter will describe the method by which an individual may attain and apply power.

Power may be defined as "organized and intelligently directed knowledge." Power, as the term is here used, refers to organized effort, sufficient to enable an individual to transmute desire into its monetary equivalent. Organized effort is produced through the coordination of effort of two or more people, who work toward a definite end, in a spirit of harmony.

The "Master Mind" may be defined as: "Coordination of knowledge and effort, in a spirit of harmony, between two or more people, for the attainment of a definite purpose." No individual may have great power without availing himself of the "Master Mind."`,
                questions: [
                    {
                        question: "How is power defined in this context?",
                        options: ["Physical strength", "Organized and intelligently directed knowledge", "Political influence", "Financial resources"],
                        correct: 1
                    },
                    {
                        question: "How is organized effort produced?",
                        options: ["Through individual work", "Through coordination of two or more people in harmony", "Through competition", "Through authority"],
                        correct: 1
                    },
                    {
                        question: "What is the Master Mind?",
                        options: ["A genius individual", "Coordination of knowledge and effort between people", "A business strategy", "A type of education"],
                        correct: 1
                    }
                ]
            },
            {
                id: 10,
                title: "The Mystery of Sex Transmutation - The Tenth Step to Riches",
                content: `The meaning of the word "transmute" is, in simple language, "the changing, or transferring of one element, or form of energy, into another." The emotion of sex brings into being a state of mind. Because of ignorance on the subject, this state of mind is generally associated with the physical, and because of improper influences, to which most people have been subjected, in acquiring knowledge of sex, things essentially physical have highly biased the mind.

The emotion of sex has back of it the possibility of three constructive potentialities: 1. The perpetuation of mankind. 2. The maintenance of health. 3. The transformation of mediocrity into genius through transmutation.

Sex transmutation is simple and easily explained. It means the switching of the mind from thoughts of physical expression, to thoughts of some other nature. Sex desire is the most powerful of human desires. When driven by this desire, men develop keenness of imagination, courage, will-power, persistence, and creative ability unknown to them at other times.`,
                questions: [
                    {
                        question: "What does 'transmute' mean?",
                        options: ["To destroy", "To changing or transferring one form of energy into another", "To multiply", "To hide"],
                        correct: 1
                    },
                    {
                        question: "How many constructive potentialities does the emotion of sex have?",
                        options: ["Two", "Three", "Four", "Five"],
                        correct: 1
                    },
                    {
                        question: "What is sex desire described as?",
                        options: ["A distraction", "The most powerful of human desires", "A weakness", "An obstacle"],
                        correct: 1
                    }
                ]
            },
            {
                id: 11,
                title: "The Subconscious Mind - The Eleventh Step to Riches",
                content: `The subconscious mind consists of a field of consciousness, in which every impulse of thought that reaches the objective mind through any of the five senses, is classified and recorded, and from which thoughts may be recalled or withdrawn as letters may be taken from a filing cabinet.

It receives, and files, sense impressions or thoughts, regardless of their nature. You may voluntarily plant in your subconscious mind any plan, thought, or purpose which you desire to translate into its physical or monetary equivalent. The subconscious acts first on the dominating desires which have been mixed with emotional feeling, such as faith.

The subconscious mind works day and night. Through a method of procedure, unknown to man, the subconscious mind draws upon the forces of Infinite Intelligence for the power with which it voluntarily transmutes one's desires into their physical equivalent, making use, always, of the most practical media by which this end may be attained.`,
                questions: [
                    {
                        question: "What does the subconscious mind consist of?",
                        options: ["Random thoughts", "A field of consciousness that classifies and records impulses", "Only positive thoughts", "Memories only"],
                        correct: 1
                    },
                    {
                        question: "What does the subconscious mind act on first?",
                        options: ["Recent thoughts", "Dominating desires mixed with emotional feeling", "Logical thoughts", "External influences"],
                        correct: 1
                    },
                    {
                        question: "When does the subconscious mind work?",
                        options: ["Only during sleep", "Only when awake", "Day and night", "Only when focused"],
                        correct: 2
                    }
                ]
            },
            {
                id: 12,
                title: "The Brain - The Twelfth Step to Riches",
                content: `More than twenty years ago, the author, working in conjunction with the late Dr. Alexander Graham Bell, and Dr. Elmer R. Gates, observed that every human brain is both a broadcasting and receiving station for the vibration of thought.

Through the medium of the ether, in a fashion similar to that employed by the radio broadcasting principle, every human brain is capable of picking up vibrations of thought which are being released by other brains. The Creative Imagination is the "receiving set" of the brain, which receives thoughts, released by the brains of others.

When stimulated, or "stepped up" to a high rate of vibration, the mind becomes more receptive to the vibration of thought which reaches it through the ether from outside sources. This "stepping up" process takes place through the positive emotions, or the negative emotions. Through the emotions, the vibrations of thought may be increased.`,
                questions: [
                    {
                        question: "What is every human brain according to Hill?",
                        options: ["A computer", "Both a broadcasting and receiving station for thought vibrations", "A storage device", "A processing unit"],
                        correct: 1
                    },
                    {
                        question: "What is the 'receiving set' of the brain?",
                        options: ["Memory", "Creative Imagination", "Logic", "Consciousness"],
                        correct: 1
                    },
                    {
                        question: "How can the mind become more receptive to thought vibrations?",
                        options: ["Through meditation only", "Through positive or negative emotions", "Through education", "Through physical exercise"],
                        correct: 1
                    }
                ]
            },
            {
                id: 13,
                title: "The Sixth Sense - The Thirteenth Step to Riches",
                content: `The "sixth sense" is that portion of the subconscious mind which has been referred to as the Creative Imagination. It has also been referred to as the "receiving set" through which ideas, plans, and thoughts flash into the mind. The flashes are sometimes called "hunches" or "inspirations."

The sixth sense defies description! It cannot be described to a person who has not mastered the other principles of this philosophy, because such a person has no knowledge, and no experience with which the sixth sense may be compared. Understanding of the sixth sense comes only by meditation through mind development from within.

Through the aid of the sixth sense, you will be warned of impending dangers in time to avoid them, and notified of opportunities in time to embrace them. There comes to your aid, and to do your bidding, with the development of the sixth sense, a "guardian angel" who will open to you at all times the door to the Temple of Wisdom.`,
                questions: [
                    {
                        question: "What is the 'sixth sense'?",
                        options: ["Psychic ability", "The Creative Imagination portion of the subconscious mind", "Intuition only", "A supernatural power"],
                        correct: 1
                    },
                    {
                        question: "How does understanding of the sixth sense come?",
                        options: ["Through books", "Through meditation and mind development from within", "Through teaching", "Through practice"],
                        correct: 1
                    },
                    {
                        question: "What does the sixth sense help you with?",
                        options: ["Making money only", "Warning of dangers and notifying of opportunities", "Reading minds", "Predicting the future"],
                        correct: 1
                    }
                ]
            },
            {
                id: 14,
                title: "How to Outwit the Six Ghosts of Fear",
                content: `Before you can put any portion of this philosophy into successful use, your mind must be prepared to receive it. The preparation is not difficult. It begins with study, analysis, and understanding of three enemies which you shall have to clear out. These are indecision, doubt, and fear!

The Sixth Sense will never function while these three negatives, or any of them, remain in your mind. The members of this unholy trio are closely related; where one is found, the other two are close at hand. Indecision is the seedling of fear! Remember this, as you read. Indecision crystallizes into doubt, the two blend and become fear!

There are six basic fears, with some combination of which every human suffers at one time or another. Most people are fortunate if they do not suffer from the entire six. Named in the order of their most common appearance, they are: Fear of poverty, Fear of criticism, Fear of ill health, Fear of loss of love of someone, Fear of old age, Fear of death.`,
                questions: [
                    {
                        question: "What three enemies must be cleared from the mind?",
                        options: ["Anger, hatred, jealousy", "Indecision, doubt, and fear", "Laziness, greed, pride", "Ignorance, poverty, illness"],
                        correct: 1
                    },
                    {
                        question: "What is indecision described as?",
                        options: ["The root of success", "The seedling of fear", "A minor problem", "A learning opportunity"],
                        correct: 1
                    },
                    {
                        question: "How many basic fears are there according to Hill?",
                        options: ["Four", "Five", "Six", "Seven"],
                        correct: 2
                    }
                ]
            },
            {
                id: 15,
                title: "The Devil's Workshop - Conclusion",
                content: `In every chapter of this book, mention has been made of the money-making secret which has made fortunes for more than five hundred exceedingly wealthy men whom I have carefully analyzed over a long period of years. The secret was brought to my attention by Andrew Carnegie, more than a quarter of a century ago.

The secret to which I refer has been mentioned no fewer than a hundred times throughout this book. It has not been directly named, for it seems to work more successfully when it is merely uncovered and left in sight, where those who are ready, and searching for it, may pick it up.

If you are ready to put it to use, you will recognize this secret at least once in every chapter. I wish I might feel privileged to tell you how you will know if you are ready, but that would deprive you of much of the benefit you will receive when you make the discovery in your own way. While this book was being written, my own son, who was then finishing the last year of his college work, picked up the manuscript of chapter two, read it, and discovered the secret for himself.`,
                questions: [
                    {
                        question: "How many times has the secret been mentioned throughout the book?",
                        options: ["Fifty times", "No fewer than a hundred times", "Twenty-five times", "Exactly fifty times"],
                        correct: 1
                    },
                    {
                        question: "Who brought the secret to Hill's attention?",
                        options: ["Thomas Edison", "Henry Ford", "Andrew Carnegie", "John D. Rockefeller"],
                        correct: 2
                    },
                    {
                        question: "Why hasn't the secret been directly named?",
                        options: ["It's too complex", "It works better when uncovered and left in sight", "It's a trade secret", "It's illegal to name it"],
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
                    },
                    {
                        question: "What is the hallmark of the growth mindset?",
                        options: ["Avoiding challenges", "The passion for stretching yourself and persisting", "Documenting abilities", "Relying on talent alone"],
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
                    },
                    {
                        question: "What does the power of 'yet' help people do?",
                        options: ["Avoid challenges", "Embrace challenges and persist through setbacks", "Give up easier", "Focus on talent only"],
                        correct: 1
                    },
                    {
                        question: "What mindset does 'yet' change us from and to?",
                        options: ["Positive to negative", "Fixed limitation to growth potential", "Growth to fixed", "Simple to complex"],
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
    
    if (showQuiz) {
        nextSlideBtn.style.display = 'none';
    } else {
        nextSlideBtn.style.display = 'flex';
        nextSlideBtn.innerHTML = 'Start Quiz <i class="fas fa-arrow-right"></i>';
    }
    
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
    
    // Hide navigation buttons during quiz
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    prevQuestionBtn.style.display = 'none';
    nextQuestionBtn.style.display = 'none';
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    
    // Update visual selection
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.toggle('selected', index === answerIndex);
    });
    
    // Store answer
    const globalQuestionIndex = currentSlideIndex * 3 + currentQuestionIndex;
    userAnswers[globalQuestionIndex] = answerIndex;
    
    // Auto-advance to next question after 1 second
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextSlide() {
    if (showQuiz) {
        return; // This is handled by auto-advance in selectAnswer
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
        setTimeout(() => {
            loadQuestion();
        }, 500);
    } else {
        // Move to next slide or finish
        if (currentSlideIndex < currentBook.slides.length - 1) {
            setTimeout(() => {
                currentSlideIndex++;
                currentQuestionIndex = 0;
                showQuiz = false;
                selectedAnswer = null;
                loadSlide();
            }, 1000);
        } else {
            setTimeout(() => {
                finishCourse();
            }, 1000);
        }
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
            const globalIndex = slideIndex * 3 + questionIndex;
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

    // Check if jsPDF is loaded
    if (typeof window.jsPDF === 'undefined') {
        showNotification('PDF library not loaded. Please refresh the page.', 'error');
        return;
    }

    try {
        const { jsPDF } = window.jsPDF;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        
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
        doc.text(currentBook.title, 148.5, 125, { align: 'center' });
        
        // Author
        doc.setFontSize(14);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(168, 85, 247);
        doc.text('by ' + currentBook.author, 148.5, 135, { align: 'center' });
        
        // Performance details
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255);
        doc.text('Score: ' + score + '/' + total + ' (' + percentage + '%) | Grade: ' + getGrade(percentage), 148.5, 150, { align: 'center' });
        doc.text('Time Spent: ' + formatTime(elapsedTime), 148.5, 165, { align: 'center' });
        
        // Date and signature area
        doc.setFontSize(12);
        doc.setTextColor(220, 208, 255);
        doc.text('Date: ' + new Date().toLocaleDateString(), 60, 185);
        doc.text('Learning Platform', 237, 185);
        
        // Decorative elements
        doc.setDrawColor(255, 215, 0);
        doc.setLineWidth(0.5);
        doc.line(40, 190, 120, 190); // Date line
        doc.line(177, 190, 257, 190); // Signature line
        
        // Save the PDF
        const fileName = currentUser.fullName.replace(/\s+/g, '_') + '_' + currentBook.title.replace(/\s+/g, '_') + '_Certificate.pdf';
        doc.save(fileName);
        showNotification('Certificate downloaded successfully!');
    } catch (error) {
        console.error('PDF generation error:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
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
            const globalIndex = slideIndex * 3 + questionIndex;
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
