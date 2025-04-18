import { words_array } from "./words.js";

console.log(words_array);

// Define the shuffleArray function using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Shuffle the full word array first to ensure randomness across all words
shuffleArray(words_array);

// Split the shuffled words into roughly equal groups
const numGroups = 3;
const groupSize = Math.ceil(words_array.length / numGroups);
const wordGroups = Array.from({ length: numGroups }, (_, i) =>
    words_array.slice(i * groupSize, (i + 1) * groupSize)
);

// Randomly select one group
const chosenGroup = wordGroups[Math.floor(Math.random() * numGroups)];

// Shuffle the selected group (extra randomization within the chosen group)
shuffleArray(chosenGroup);
// Modify how we prepare the word objects
chosenGroup.forEach(word => {
    if (typeof word === 'string') {
        word = { uni_lemma: word }; // Create proper object structure
    } else if (word.theword) {
        word.uni_lemma = word.theword; // Map theword to uni_lemma
    }
});

console.log("chosenGroup");
console.log(chosenGroup);

let timeline = [];

document.head.insertAdjacentHTML('beforeend', `<style>.jspsych-survey-multi-choice-question span.required { display: none !important; }</style>`);

//--------------------------------------------------------------------------------------------
var globalStyles = `
    <style>

        /* General Page Styling */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            color: #333;
            text-align: center;
            margin: 0;
            padding: 0;
        }
    
        /* Main Content Box */
        .jspsych-display-element {
            max-width: 95%; /* Increased to give more room */
            width: 95vw;
            min-width: 850px;
            background: white;
            padding: 30px 40px; /* Increased horizontal padding */
            border-radius: 12px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            margin: 0vh auto;
            overflow: hidden;
            position: relative;
            top: -30px; /* Moves it up */
        }
    
        /* Improve Button Styles */
        .jspsych-btn {
            background-color: #8C1515;
            color: white;
            font-size: 18px;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: 0.3s ease-in-out;
        }
        .jspsych-btn:hover {
            background-color: #700F0F;
        }
    
        /* Improve Slider Styles */
        input[type="range"] {
            width: 80%; /* Reduced from 90% to prevent label overflow */
            accent-color: #8C1515;
            margin: 0 auto; /* Center the slider */
            display: block; /* Ensure it takes its own line */
        }
    
        /* Make Images & Videos More Prominent */
        img, video {
            max-width: 100%; /* Ensures they don't overflow */
            height: auto;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        .jspsych-content {
            max-width: 700px;
            margin: auto;
            text-align: center;
            padding: 20px;
            border-radius: 12px;
            background-color: white;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.6s ease-in-out;
        }
        .jspsych-btn {
            font-size: 18px;
            padding: 12px 24px;
            background-color: #8C1515; 
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }
        .jspsych-btn:hover {
            background-color: #6E1111;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0px); }
        }

        /* Add specific styles for slider labels */
        .jspsych-slider-response-container {
            width: 90%;
            margin: 0 auto;
            padding: 0 20px;
            box-sizing: border-box;
        }

        /* Style for the labels specifically */
        .jspsych-slider-response-labels {
            display: flex;
            justify-content: space-between;
            width: 80%; /* Match slider width */
            margin: 10px auto;
            font-size: 16px;
            color: #555;
        }
    </style>
`;

// Inject global styles into the page
document.head.insertAdjacentHTML('beforeend', globalStyles);
// ------------------------------------------------------------------------------------------
let currentTrial = 0; // Track the current trial
let totalTrials = 0; // This will be updated after the timeline is loaded

// Log the timeline content to check if it's populated correctly before initialization
console.log("Timeline before jsPsych:", timeline);
// ------------------------------------------------------------------------------------------
// Initialize the jsPsych experiment
var jsPsych = initJsPsych({
    use_webaudio: false,
    override_safe_mode: true,
    timeline: timeline,

    // Add a timestamp at the start of the experiment
    on_timeline_start: function () {
        // Log the timeline content at this stage
        console.log("Timeline in on_timeline_start:", jsPsych.getTimeline());

        // Update totalTrials after the timeline is loaded
        totalTrials = jsPsych.getTimeline().length;
        console.log("totalTrials after timeline loaded:", totalTrials);  // Ensure totalTrials is correctly updated
        console.log("currentTrial:", currentTrial);

        // Add timestamp to data
        jsPsych.data.addProperties({
            timestamp: Date.now()
        });

        // Create progress bar HTML if it doesn't already exist
        if (!document.getElementById("progress-container")) {
            document.body.insertAdjacentHTML(
                'afterbegin',
                `<div id="progress-container" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); width: 80%; z-index: 1000;">
                    <div id="progress-bar" style="height: 20px; width: 0%; background-color: #0073e6; border-radius: 5px; transition: width 0.5s;"></div>
                    <div id="progress-text" style="text-align: center; font-size: 16px; margin-top: 5px;">0% completed</div>
                </div>`
            );
        }

        // Update progress bar on start
        updateProgressBar();
    },

    // Increment currentTrial on trial finish
    on_trial_finish: function () {
        currentTrial++; // Increment current trial after each trial
        updateProgressBar(); // Update progress bar after trial
        console.log("totalTrials:", totalTrials);
        console.log("currentTrial:", currentTrial);
    },

    // Handle the finish of the experiment
    on_finish: function (data) {
        console.log("Experiment finished");
        jsPsych.data.displayData();

        var all_trials = jsPsych.data.get().values();
        console.log("Starting to log data");
        console.log(all_trials);
        all_trials.forEach(trial => {
            console.log("one trial");
            console.log(trial);
        });

        // Log data for each trial
        Promise.all(all_trials.map(trial => logExpData(trial)))
            .then(() => {
                console.log("All data logged, redirecting...");
                window.location.href = "https://app.prolific.com/submissions/complete?cc=C1O4GW39";
            })
            .catch(error => {
                console.error("Failed to log all data", error);
                alert("There was an error saving your data. Please contact the study administrator.");
            });
    }
});

// Function to update the progress bar
const updateProgressBar = () => {
    let progress = (currentTrial / totalTrials) * 100;
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${Math.round(progress)}% completed`;
    }
};

// Ensure the DOM is ready before updating the progress bar
document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure the progress bar is updated properly when DOM is loaded
    updateProgressBar();
});
//const words_array = words.map(w => w.uni_lemma);

// ------------------------------------------------------------------------------------------

// Pick 3 arrays that contains 20 random words each from the selected group
const selectedWords = chosenGroup.slice(0, 20);
const selectedWords2 = chosenGroup.slice(20, 40);
const selectedWords3 = chosenGroup.slice(40, 60);

// Define the purple object (In Korean: "라벤더" )
const purpleWord = { "theword": "purple" };
// Add "purple" at a random position in selectedWords
const randomIndex1 = Math.floor(Math.random() * (selectedWords.length + 1)); // +1 to allow insertion at the very end
selectedWords.splice(randomIndex1, 0, purpleWord); // Insert "purple" at a random position

// Define the grey object (In Korean: "회색")
const greyWord = { "theword": "grey" };
// Add "grey" at a random position in selectedWords2
const randomIndex2 = Math.floor(Math.random() * (selectedWords2.length + 1)); // +1 to allow insertion at the very end
selectedWords2.splice(randomIndex2, 0, greyWord); // Insert "grey" at a random position

// Define the lavender object (In Korean: 라벤더)
const lavenderWord = { "theword": "lavender" };
// Add "lavender" at a random position in selectedWords3
const randomIndex = Math.floor(Math.random() * (selectedWords3.length + 1)); // +1 to allow insertion at the very end
selectedWords3.splice(randomIndex, 0, lavenderWord); // Insert "lavender" at a random position

console.log(selectedWords);
// -----------------------------------------------------------------------------------------------------//
const trial1 = {
    type: jsPsychInstructions,
    pages: [
        `
        <div style="text-align: center; margin: 50px;">
            <img src="stanford.png" style="max-width: 250px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);">
        </div>
        <div style="text-align: center; max-width: 650px; margin: auto; font-size: 20px; line-height: 1.6; color: #333;">
            <p>Welcome to our study conducted by cognitive scientists at the <strong>Stanford Department of Psychology</strong>.</p>
            <p>If you have any questions, feel free to reach us at <a href="mailto:languagecoglab@gmail.com" style="color: #0073e6; font-weight: bold;">languagecoglab@gmail.com</a>.</p>
            <p><strong>You must be at least 18 years old to participate.</strong> Your participation is voluntary, and you may withdraw at any time.</p>
            <p>Your responses will remain <strong>completely anonymous</strong>. Click "Next" to begin.</p>
        </div>
        `
    ],
    show_clickable_nav: true,
    button_label_next: "Start",
    button_label_previous: "Back",
    button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px; background-color: #0073e6; color: white; border-radius: 8px; border: none; transition: 0.3s;">%choice%</button>',
};

timeline.push(trial1);

// Opening instructions with improved design
const opening = {
    type: jsPsychInstructions,
    pages: [
        `
        <div style="text-align: center; margin-top: 50px;">
        <h2 style="font-size: 28px; color: #222;">Welcome to the Experiment</h2>
    </div>
    <div style="text-align: center; max-width: 650px; margin: auto; font-size: 20px; line-height: 1.6; color: #333;">
        <p>In this experiment, you will be shown some words.</p>
        <p>Your task is to make a judgment about each word based on the instructions provided.</p>
        <p>✨ Trust your intuition 🧠💡 and think about how you would use the word in everyday life when making your judgment.</p>
        <p>Click <strong>"Next"</strong> to begin.</p>
    </div>    
        `
    ],
    show_clickable_nav: true,
    button_label_next: "Next",
    button_label_previous: "Back",
    button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px; background-color: #0073e6; color: white; border-radius: 8px; border: none; transition: 0.3s;">%choice%</button>',
    on_finish: function (data) {
        // Increment current trial number
        currentTrial++;

        // Update the progress bar
        updateProgressBar();

        // Capture Prolific variables
        const subject_id = jsPsych.data.getURLVariable("PROLIFIC_PID") || "NA";
        const study_id = jsPsych.data.getURLVariable("STUDY_ID") || "NA";
        const session_id = jsPsych.data.getURLVariable("SESSION_ID") || "NA";

        console.log("Study ID:", study_id, "Session ID:", session_id, "Subject ID:", subject_id);
        jsPsych.data.addProperties({ subject_id, study_id, session_id });
    }
};

const after_practice = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="text-align: center; font-size: 24px; margin: 20px;">
            <p><strong>Great job!</strong></p>
            <p>You've completed the examples. Now, let's move on to the actual task.</p>
            <p>Stay focused, do your best, and have fun!</p>
        </div>
    `,
    choices: ["Next"],
    button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 20px; background-color: #0073e6; color: white; border-radius: 8px; border: none;">%choice%</button>'
};

const before_practice = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="text-align: center; font-size: 24px; margin: 20px;">
            <p><strong>Before we begin...</strong></p>
            <p>Let's go through some examples to help you understand the task.</p>
            <p>These will guide you through what to expect.</p>
        </div>
    `,
    choices: ["Next"],
    button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
};

timeline.push(opening);
// ------------------------------------------------------------------------------------------
// Instructions for solidity with visual examples
const instructions_solidity1 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>Another judgment in this task is about <b>word solidity</b>.</p>
                <p>Consider the sentence:</p>
                <p><b>"The rock is heavy."</b></p>
                <p>In this sentence, <b>rock</b> refers to something <b>solid</b>. It maintains its shape and you can't pour it.</p>
                <p style="margin-top: 20px; font-weight: bold;"> </p>
            </div>`,
        choices: ['Continue'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_solidity2 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>Now, consider the sentence:</p>
                <p><b>"The water spilled."</b></p>
                <p>In this sentence, <b>water</b> refers to something <b>non-solid</b>. It takes the shape of its container and you can pour it.</p>
                <p style="margin-top: 20px;">Let's practice with some examples!</p>
            </div>`,
        choices: ['Continue'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_solidity3 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p><b>Important:</b> ⚠️ If you see the word <b style="color: purple; background-color: lavender;">"Lavender"</b>, always select <u><b>"none of these"</b></u>.</p>
            </div>`,
        choices: ["Let's begin!"],
        button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

// Practice trials with feedback
const generatePracticeSolidityTrial = (prompt, correctAnswer, feedbackCorrect, feedbackIncorrect, theword) => {
    return {
        timeline: [
            {
                type: jsPsychSurveyMultiChoice,
                questions: [
                    {
                        prompt: `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto; font-weight: normal; display: inline-block;">${prompt}</div>`,
                        options: ['solid', 'non-solid', 'none of these'],
                        required: true,
                    }
                ],
                data: { correct_answer: correctAnswer, theword: theword, theblock: "practice_solidity" },
            },
            {
                type: jsPsychHtmlButtonResponse,
                stimulus: function () {
                    const lastResponse = jsPsych.data.getLastTrialData().values()[0].response.Q0;
                    const isCorrect = lastResponse === correctAnswer;
                    jsPsych.data.addDataToLastTrial({ correct: isCorrect });
                    return `
                        <div style="text-align: center; font-size: 22px; max-width: 700px; margin: auto; padding: 20px; 
                                    border-radius: 10px; background-color: ${isCorrect ? '#d4edda' : '#f8d7da'}; 
                                    color: ${isCorrect ? '#155724' : '#721c24'};">
                            <p><b>${isCorrect ? 'Correct!' : 'Incorrect!'}</b></p>
                            <p>${isCorrect ? feedbackCorrect : feedbackIncorrect}</p>
                        </div>`;
                },
                choices: ['Continue'],
                button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
            }
        ],
        timeline_variables: [{ correct_answer: correctAnswer }]
    };
};

// Define practice trials
const practice_solidity1 = generatePracticeSolidityTrial(
    `In the sentence <b>[The table is sturdy]</b>, is <b>table</b>:`,
    "solid",
    "Yes! A table is solid - it maintains its shape and cannot be poured.",
    "A table is solid - it maintains its shape and cannot be poured. Let's continue!",
    "table"
);

const practice_solidity2 = generatePracticeSolidityTrial(
    `In the sentence <b>[The milk spilled]</b>, is <b>milk</b>:`,
    "non-solid",
    "Correct! Milk is non-solid - it takes the shape of its container and can be poured.",
    "Milk is non-solid - it takes the shape of its container and can be poured. Let's continue!",
    "milk"
);

// Main block
const block_solidity = {
    timeline: [
        {
            type: jsPsychSurveyMultiChoice,
            questions: [
                {
                    prompt: function () {
                        let word = jsPsych.timelineVariable('uni_lemma');
                        word = word.replace(/[*\n\r\t\u200b]/g, '').trim();
                        return `<div style="font-size: 22px; text-align: center; max-width: 700px; margin: auto; font-weight: normal; display: inline-block;">
                                    Is <b>${word}</b>:
                                </div>`;
                    },
                    options: ['solid', 'non-solid', 'none of these'],
                    required: true,
                    required_message: ""
                }
            ],
            on_finish: function (data) {
                var currentWord = jsPsych.timelineVariable('uni_lemma');
                jsPsych.data.addDataToLastTrial({
                    theword: currentWord,
                    theblock: "solidity",
                });
            }
        }
    ],
    timeline_variables: selectedWords,
    randomize_order: true
};

const shuffledPracticesolidity = jsPsych.randomization.shuffle([
    practice_solidity1,
    practice_solidity2
]);
// Full Solidity Block
const solidity = {
    timeline: [
        instructions_solidity1,
        instructions_solidity2,
        before_practice,
        instructions_solidity3,
        ...shuffledPracticesolidity,
        after_practice,
        block_solidity
    ],
    randomization: false
};
//timeline.push(solidity);

// -------------------------------------------------------------------------------------------
// Instructions for countability task
// Instructions with visual examples
const instructions_countmass1 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>One judgment in this task is about <b>count and mass nouns</b>.</p>
                <p>Consider the sentence:</p>
                <p><b>"I need several pens."</b></p>
                <p>Here, <b>pen</b> is a <b>count noun</b> because it refers to objects that can be <b>divided into individual units and counted</b>.</p>
            </div>`,
        choices: ['Continue'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_countmass2 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>Now, consider the sentence:</p>
                <p><b>"I need some water."</b></p>
                <p>Here, <b>water</b> is a <b>mass noun</b> because it refers to an <b>undifferentiated and uncountable substance</b>.</p>
                <p style="margin-top: 20px;">Let's practice with some examples!</p>
            </div>`,
        choices: ['Continue'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_countmass3 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p><b>Important:</b> ⚠️ If you see the word <b style="color: grey;">"Grey"</b>, always select <u><b>"count noun"</b></u>.</p>
            </div>`,
        choices: ["Let's begin!"],
        button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

// Generate practice trials with feedback
const generatePracticeCountMassTrial = (prompt, correctAnswer, feedbackCorrect, feedbackIncorrect, theword) => {
    return {
        timeline: [
            {
                type: jsPsychSurveyMultiChoice,
                questions: [
                    {
                        prompt: `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto; font-weight: normal; display: inline-block;">${prompt}</div>`,
                        options: ['count noun', 'mass noun', 'unclear/unknown'],
                        required: true,
                    }
                ],
                data: { correct_answer: correctAnswer, theword: theword, theblock: "practice_countmass" },
            },
            {
                type: jsPsychHtmlButtonResponse,
                stimulus: function () {
                    const lastResponse = jsPsych.data.getLastTrialData().values()[0].response.Q0;
                    const isCorrect = lastResponse === correctAnswer;
                    jsPsych.data.addDataToLastTrial({ correct: isCorrect });
                    return `
                        <div style="text-align: center; font-size: 22px; max-width: 700px; margin: auto; padding: 20px; 
                                    border-radius: 10px; background-color: ${isCorrect ? '#d4edda' : '#f8d7da'}; 
                                    color: ${isCorrect ? '#155724' : '#721c24'};">
                            <p><b>${isCorrect ? 'Correct!' : 'Incorrect!'}</b></p>
                            <p>${isCorrect ? feedbackCorrect : feedbackIncorrect}</p>
                        </div>`;
                },
                choices: ['Continue'],
                button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
            }
        ],
        timeline_variables: [{ correct_answer: correctAnswer }]
    };
};

// Define practice trials
const practice_countmass1 = generatePracticeCountMassTrial(
    `In the sentence <b>[Would you like a chair?]</b>, is <b>chair</b>:`,
    "count noun",
    "Yes! A chair is a count noun - you can count individual chairs.",
    "A chair is a count noun - you can count individual chairs. Let's continue!",
    "chair"
);

const practice_countmass2 = generatePracticeCountMassTrial(
    `In the sentence <b>[This is so much sugar]</b>, is <b>sugar</b>:`,
    "mass noun",
    "Correct! Sugar is a mass noun - it's an undifferentiated substance.",
    "Sugar is a mass noun - it's an undifferentiated substance. Let's continue!",
    "sugar"
);

// Main block
const block_countmass = {
    timeline: [
        {
            type: jsPsychSurveyMultiChoice,
            questions: [
                {
                    prompt: function () {
                        let word = jsPsych.timelineVariable('uni_lemma');
                        word = word.replace(/[*\n\r\t\u200b]/g, '').trim();
                        return `<div style="font-size: 22px; text-align: center; max-width: 700px; margin: auto; font-weight: normal; display: inline-block;">
                                    Is <b>${word}</b>:
                                </div>`;
                    },
                    options: ['count noun', 'mass noun', 'unclear/unknown'],
                    required: true,
                    required_message: ""
                }
            ],
            on_finish: function (data) {
                var currentWord = jsPsych.timelineVariable('uni_lemma');
                jsPsych.data.addDataToLastTrial({
                    theword: currentWord,
                    theblock: "count_mass",
                });
            }
        }
    ],
    timeline_variables: selectedWords2,
    randomize_order: true
};
const shuffledPracticescountability = jsPsych.randomization.shuffle([
    practice_countmass1,
    practice_countmass2
]);

// Full Countability Block
const countmass = {
    timeline: [
        instructions_countmass1,
        instructions_countmass2,
        before_practice,
        instructions_countmass3,
        ...shuffledPracticescountability,
        after_practice,
        block_countmass
    ],
    randomization: false
};
timeline.push(countmass);
// ------------------------------------------------------------------------------------------
// category organization block
const instructions_category1 = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>One judgment in this task is about <b>word category</b>.</p>
        
                <p>Consider the sentence:</p>
                <p><b>"I stacked several plates."</b></p>
        
                <p>In this sentence, <b>plate</b> belongs to a <b>category that is organized by shape</b>. Plates can be made of different materials (plastic, ceramic, glass) and come in various colors, <u>but</u> they all have a similar shape.</p>
        
                <p style="margin-top: 20px; font-weight: bold;"> </p>
            </div>        
            `,
            choices: ['Continue'],
            button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
        }
    ]
};

const instructions_category2 = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.4;">
                
                <p style="margin-bottom: 10px;">For example, this is a plate:</p>
                
                <div style="display: flex; justify-content: center; margin: 10px 0;">
                    <img src="images/steel_plate.jpg" alt="Steel plate" style="width: 120px; height: auto; border: 2px solid black; padding: 3px;">
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 15px;">
                    <div style="width: 45%;">
                        <p>Even though this is made of a different material, it is still a plate:</p>
                        <img src="images/ceramic_plate.jpg" alt="Ceramic plate" style="width: 100px; height: auto;">
                    </div>

                    <div style="width: 45%;">
                        <p>Even though this is made of the same material, it is <b>NOT</b> a plate:</p>
                        <img src="images/steel_cup.jpg" alt="Steel cup" style="width: 100px; height: auto;">
                    </div>
                </div>

                <p style="margin-top: 20px; font-weight: bold;">Let’s move forward!</p>
            </div>        
            `,
            choices: ['Continue'],
            button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
        }
    ]
};

const instructions_category3 = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.4;">
                
                <p style="margin-bottom: 10px;">Now, think about the sentence:<p>
                <p><b>"I spilled some sand."</b></p>
                
                <div style="display: flex; justify-content: center; margin: 10px 0;">
                    <img src="images/sand_pile.jpg" alt="Pile of sand" style="width: 130px; height: auto; border: 2px solid black; padding: 3px;">
                </div>
                
                <p>Sand can come in different colors and shapes, but it is always made of sand.</p>

                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 15px;">
                    <div style="width: 45%;">
                        <p>This is still sand, even though it looks different:</p>
                        <img src="images/white_pile.jpg" alt="White sand" style="width: 120px; height: auto;">
                    </div>

                    <div style="width: 45%;">
                        <p>This is <b>NOT</b> sand, even though it looks similar:</p>
                        <img src="images/leaves_pile.jpg" alt="Sugar granules" style="width: 150px; height: auto;">
                    </div>
                </div>

                <p style="margin-top: 20px; font-weight: bold;">⏭️ Next, we’d like you to judge how other words are organized.</p>
            </div>        
            `,
            choices: ['Continue'],
            button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
        }
    ]
};


const instructions_category4 = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">

            <p><b>Important:</b> ⚠️ If you see the word <b style="color: purple; background-color: lavender;">"Lavender"</b>, always select <u><b>"none of these"</b></u>.</p>

            </div>`,
            choices: ["Let's begin!"],
            button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 12px 24px; margin: 10px;">%choice%</button>'
        }
    ]
};


// Practice trial 1
const generatePracticeCategoryTrial = (prompt, correctAnswer, feedbackCorrect, feedbackIncorrect, theword) => {
    return {
        timeline: [
            {
                type: jsPsychSurveyMultiChoice,
                questions: [
                    {
                        prompt: `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto; font-weight: normal; display: inline-block;">${prompt}</div>`,
                        options: ['shape', 'material', 'color', 'none of these'],
                        required: true,
                    }
                ],
                data: { correct_answer: correctAnswer, theword: theword, theblock: "practice_category" },
            },
            {
                type: jsPsychHtmlButtonResponse,
                stimulus: function () {
                    let lastResponse = jsPsych.data.getLastTrialData().values()[0].response.Q0;
                    let correctAnswer = jsPsych.timelineVariable('correct_answer');
                    let isCorrect = lastResponse === correctAnswer;

                    jsPsych.data.addDataToLastTrial({ correct: isCorrect });

                    return `
                        <div style="text-align: center; font-size: 22px; max-width: 700px; margin: auto; padding: 20px; 
                                    border-radius: 10px; background-color: ${isCorrect ? '#d4edda' : '#f8d7da'}; 
                                    color: ${isCorrect ? '#155724' : '#721c24'};">
                            <p><b>${isCorrect ? 'Correct!' : 'Incorrect!'}</b></p>
                            <p>${isCorrect ? feedbackCorrect : feedbackIncorrect}</p>
                        </div>
                    `;
                },
                choices: ['Continue'],
                button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
            }
        ],
        timeline_variables: [{ correct_answer: correctAnswer }]
    };
};

// Define the two practice category trials
const practice_category1 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    In the sentence <span style="font-weight: bold;">[This is a square]</span>, 
    the category of <span style="font-weight: bold;">squares</span> is organized by:
    </div>`,
    "shape",
    "All squares have the same kind of shape, and if they have a different shape, then they are not squares. Now let's go forward!",
    "All squares have the same kind of shape. Squares can have different materials and colors,<u>but</u> if they have a different shape, then they are not squares. Let's go forward!",
    "square"
);

const practice_category2 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    In the sentence <b>[She stopped the car at the red light]</b>, <b>red light</b> belongs to a category that is organized by:
    </div>`,
    "color",
    "All red lights are red. If they have a different color, then they don’t mean that you have to stop your car. Now let's go forward!",
    "All red lights are red. They can different shapes and materials, <u>but</u> if they have a different color, then they don’t mean that you have to stop your car. Let's go forward!",
    "red"
);

const practice_category3 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    In the sentence <b>[She put the food in her nicest pottery]</b>, <b>pottery</b> belongs to a category that is organized by:
    </div>`,
    "material",
    "All pottery is made out of clay. If it’s made out of wood or glass or metal, it’s not pottery. Now let's go forward!",
    "All pottery is made out of clay. It can have different shapes and colors, <u>but</u> if it’s made out of wood or glass or metal, it’s not pottery. Let's go forward!",
    "pottery"
);

const practice_category4 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    In the sentence <b>[She feels happiness]</b>, <b>happiness</b> belongs to a category that is organized by:
    </div>`,
    "none of these",
    "Happiness is not a category that is organized by shape, neither color, nor material. Now let's go forward!",
    "Happiness is not a category that is organized by shape, neither color, nor material. Let's go forward!",
    "happiness"
);

// Define the main category trials
const block_category = {
    timeline: [
        {
            type: jsPsychSurveyMultiChoice,
            questions: [
                {
                    prompt: function () {
                        let word = jsPsych.timelineVariable('uni_lemma');
                        console.log(`Word before cleaning: "${word}"`);
                        word = word.replace(/[*\n\r\t\u200b]/g, '').trim();
                        console.log(`Word after cleaning: "${word}"`);
                        return `<div style="font-size: 22px; text-align: center; max-width: 700px; margin: auto; font-weight: normal; display: inline-block;">
                                    <b>${jsPsych.timelineVariable('uni_lemma')}</b> belongs to a category that is organized by:
                                </div>`;
                    },
                    options: ['shape', 'color', 'material', 'none of these'],
                    required: true,
                    required_message: "", // <== This removes the *
                    add_other_option: true,
                }
            ],
            on_finish: function (data) {
                var currentWord = jsPsych.timelineVariable('uni_lemma');
                jsPsych.data.addDataToLastTrial({
                    theword: currentWord,
                    theblock: "category_organization",
                });
            }
        }
    ],
    timeline_variables: selectedWords3, // Ensure this is an array of objects like [{ uni_lemma: "word1" }, { uni_lemma: "word2" }]
    randomize_order: true
};

// Full Category Block
const shuffledPracticeCategories = jsPsych.randomization.shuffle([
    practice_category1,
    practice_category2,
    practice_category3,
    practice_category4
]);

const category = {
    timeline: [
        instructions_category1,
        instructions_category2,
        instructions_category3,
        before_practice,
        instructions_category4,
        ...shuffledPracticeCategories, // Insert randomized practice trials here
        after_practice,
        block_category
    ],
    randomization: false
};

//timeline.push(category);
// ---------------------------------------------------------------------------------------------

// goodbye message
const goodbye = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: function () {

                // ✅ Combined transition + goodbye message
                return `
                    <div style="text-align: center; max-width: 700px; margin: auto; font-size: 22px; line-height: 1.6; color: #333;">
                        <p><strong>Please click "Continue" to finish.</strong></p>
                        <p>Thank you for your participation!</p>
                        <p>We truly appreciate your time and effort in helping advance cognitive science research.</p>
                        <p>You will now be redirected. If you have any questions, feel free to contact us at 
                        <a href="mailto:languagecoglab@gmail.com" style="color: #0073e6; font-weight: bold;">languagecoglab@gmail.com</a>.</p>
                        <p><em>Wishing you a great day!</em></p>
                        <div style="margin-top: 20px;">
                            <img src="stanford.png" style="max-width: 250px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);">
                        </div>
                    </div>
                `;
            },
            choices: ['Continue'],
            button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin-top: 10px; background-color: #0073e6; color: white; border-radius: 8px; border: none;">%choice%</button>'
        }
    ]
};


timeline.push(goodbye);
// ---------------------------------------------------------------------------------------------

jsPsych.run(timeline);
