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
//Modify how we prepare the word objects
chosenGroup.forEach(word => {
    if (typeof word === 'string') {
        word = { uni_lemma: word }; // Create proper object structure
    } else if (word.theword) {
        word.uni_lemma = word.theword; // Map theword to uni_lemma
    }
});

console.log("chosenGroup");
console.log(chosenGroup);


// Pick 3 arrays that contains 20 random words each from the selected group
// const selectedWords = chosenGroup.slice(0, 20);
// const selectedWords2 = chosenGroup.slice(20, 40);
// const selectedWords3 = chosenGroup.slice(40, 60);
const selectedWords = chosenGroup.slice(0, 2);
const selectedWords2 = chosenGroup.slice(2, 4);
const selectedWords3 = chosenGroup.slice(4, 6);

// Define the purple object (In Korean: "라벤더" )
const purpleWord = { "theword": "라벤더" };
// Add "purple" at a random position in selectedWords
const randomIndex1 = Math.floor(Math.random() * (selectedWords.length + 1)); // +1 to allow insertion at the very end
selectedWords.splice(randomIndex1, 0, purpleWord); // Insert "purple" at a random position

// Define the grey object (In Korean: "회색")
const greyWord = { "theword": "회색" };
// Add "grey" at a random position in selectedWords2
const randomIndex2 = Math.floor(Math.random() * (selectedWords2.length + 1)); // +1 to allow insertion at the very end
selectedWords2.splice(randomIndex2, 0, greyWord); // Insert "grey" at a random position

// Define the lavender object (In Korean: 라벤더)
const lavenderWord = { "theword": "라벤더" };
// Add "lavender" at a random position in selectedWords3
const randomIndex = Math.floor(Math.random() * (selectedWords3.length + 1)); // +1 to allow insertion at the very end
selectedWords3.splice(randomIndex, 0, lavenderWord); // Insert "lavender" at a random position

selectedWords.forEach(word => {
    if (typeof word === 'string') {
        word = { uni_lemma: word }; // Create proper object structure
    } else if (word.theword) {
        word.uni_lemma = word.theword; // Map theword to uni_lemma
    }
});

selectedWords2.forEach(word => {
    if (typeof word === 'string') {
        word = { uni_lemma: word }; // Create proper object structure
    } else if (word.theword) {
        word.uni_lemma = word.theword; // Map theword to uni_lemma
    }
});

selectedWords3.forEach(word => {
    if (typeof word === 'string') {
        word = { uni_lemma: word }; // Create proper object structure
    } else if (word.theword) {
        word.uni_lemma = word.theword; // Map theword to uni_lemma
    }
});
console.log("parts");
console.log(selectedWords);

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
                //window.location.href = "https://app.prolific.com/submissions/complete?cc=C1O4GW39";
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
// start translation from here: to Claire!
// -----------------------------------------------------------------------------------------------------//
// ------------------------------------------------------------------------------------------
// start translation from here: to Claire!
// -----------------------------------------------------------------------------------------------------//
const trial1 = {
    type: jsPsychInstructions,
    pages: [
        `
        <div style="text-align: center; margin: 50px;">
            <img src="stanford.png" style="max-width: 250px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);">
        </div>
        <div style="text-align: center; max-width: 650px; margin: auto; font-size: 20px; line-height: 1.6; color: #333;">
            <p><strong>스탠퍼드 대학교 심리학부y</strong>의 인지과학연구의 관한 설문조사에 참여해주셔서 감사합니다.</p>
            <p>이 연구에 대한 질문이 있으시면 <a href="mailto:languagecoglab@gmail.com" style="color: #0073e6; font-weight: bold;">languagecoglab@gmail.com</a>으로 문의해 주시길 바랍니다.</p>
            <p><strong> 연구에 참여하기 위해 만 18세 이상이어야 합니다.</strong> 본 설문조사에 참여하는 것은
자발적이며 언제든지 자유롭게 참여를 철회할 수 있습니다.</p>
            <p>귀하의 답변은 <strong>익명</strong>으로 처리됩니다. 시작하시려면 "다음" 버튼을 눌러주세요.</p>
        </div>
        `
    ],
    show_clickable_nav: true,
    button_label_next: "시작",
    button_label_previous: "뒤로",
    button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px; background-color: #0073e6; color: white; border-radius: 8px; border: none; transition: 0.3s;">%choice%</button>',
};

timeline.push(trial1);

// Opening instructions with improved design
const opening = {
    type: jsPsychInstructions,
    pages: [
        `
        <div style="text-align: center; margin-top: 50px;">
        <h2 style="font-size: 28px; color: #222;">참여해주셔서 감사합니다!</h2>
    </div>
    <div style="text-align: center; max-width: 650px; margin: auto; font-size: 20px; line-height: 1.6; color: #333;">
        <p>각 단계마다 단어가 제시됩니다.</p>
        <p>귀하는 제시된 지침에 따라 다음 단어들에 대한 판단을 내려주시기 됩니다.</p>
        <p>✨ 귀하의 직관을 따라 🧠💡 단어를 일상생활에서 어떻게 사용할지 생각하면서 판단해주시기 바랍니다.</p>
        <p> 시작하시려면 <strong>"다음"</strong> 버튼을 눌러주세요</p>
    </div>    
        `
    ],
    show_clickable_nav: true,
    button_label_next: "다음",
    button_label_previous: "뒤로",
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
            <p><strong>잘했습니다!</strong></p>
            <p>예시 문제를 모두 완료하셨습니다. 이제 본 연구조사로 넘어가겠습니다.</p>
            <p>집중하시고 최선을 다하면서 재밌게 하시기 바랍니다!</p>
        </div>
    `,
    choices: ["다음"],
    button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 20px; background-color: #0073e6; color: white; border-radius: 8px; border: none;">%choice%</button>'
};

const before_practice = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="text-align: center; font-size: 24px; margin: 20px;">
            <p><strong>시작하기 전에...</strong></p>
            <p>예시 문제로 연습하겠습니다.</p>
            <p>본 조사에 어떤 문제가 나오는지 예습이 될것입니다.</p>
        </div>
    `,
    choices: ["다음"],
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
                <p>이번 판단 기준은 해당 단어가 <b>고형물인지 비고형물인지</b> 판단하게 될것입니다.</p>
                <p>예를 들어, 다음 문장을 읽어주세요:</p>
                <p><b>"이 바위는 무겁다."</b></p>
                <p>이 문장에서 <b>바위</b> 는 <b>고형물</b>입니다. 바의는 항상 모양을 유지하고 엑체같이 따르거나 부을 수 없습니다. </p>
                <p style="margin-top: 20px; font-weight: bold;"> </p>
            </div>`,
        choices: ['다음'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_solidity2 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>다음 문장을 읽어주세요:</p>
                <p><b>"물이 쏟아졌습니다."</b></p>
                <p>이 문장에서 <b>물</b> 은 <b>비고형물</b>입니다. 물은 용기의 모양을 취하며 따르거나 부을 수 있습니다.</p>
                <p style="margin-top: 20px;">몇가지 예문을 보며 연습해 보겠습니다!</p>
            </div>`,
        choices: ['다음'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_solidity3 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p><b>중요:</b> ⚠️ <b style="color: purple; background-color: paige;">"라벤더"</b> 단어가 보이면 항상 <u><b>"고형물"</b></u>을 선택하세요.</p>
            </div>`,
        choices: ["시작!"],
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
                        options: ['고형물', '비고형물', '해당 사항 없음'],
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
                            <p><b>${isCorrect ? '맞습니다!' : '틀렸습니다!'}</b></p>
                            <p>${isCorrect ? feedbackCorrect : feedbackIncorrect}</p>
                        </div>`;
                },
                choices: ['다음'],
                button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
            }
        ],
        timeline_variables: [{ correct_answer: correctAnswer }]
    };
};

// Define practice trials
const practice_solidity1 = generatePracticeSolidityTrial(
    `다음 문장을 읽어주세요 <b>[이 책상은 튼튼합니다]</b>. 이 문장에서 <b>책상</b>은:`,
    "고형물",
    "맞습니다! 책상은 고형물입니다 - 항상 모양을 유지하고 엑체같이 따르거나 부을 수 없습니다.",
    "책상은 고형물입니다 - 항상 모양을 유지하고 엑체같이 따르거나 부을 수 없습니다. 계속 진행하겠습니다!",
    "책상"
);

const practice_solidity2 = generatePracticeSolidityTrial(
    `다음 문장을 읽어주세요 <b>[우유가 쏟아졌습니다]</b>. 이 문장에서 <b>우유</b>는:`,
    "비고형물",
    "맞습니다! 우유는 비고형물입니다 - 용기의 모양을 취하며 따르거나 부을 수 있습니다.",
    "우유는 비고형물입니다 - 용기의 모양을 취하며 따르거나 부을 수 있습니다. 계속 진행하겠습니다!",
    "우유"
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
                                    <b>${word}</b>는:
                                </div>`;
                    },
                    options: ['고형물', '비고형물', '해당 사항 없음'],
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
timeline.push(solidity);

// -------------------------------------------------------------------------------------------
// Instructions for countability task
// Instructions with visual examples
const instructions_countmass1 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>이번 판단 기준은 해당 단어가 <b>셀 수 있는지 없는지</b>를 판단하게 될것입니다.</p>
                <p>다음 문장을 읽어주세요:</p>
                <p><b>"나는 펜이 여러 개 필요해."</b></p>
                <p>이 문장에서 <b>펜</b> 은 <b>셀 수 있습니다</b> <b>분명한 단위별로 나누어 셀 수 있기 때문입니다</b>.</p>
            </div>`,
        choices: ['다음'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_countmass2 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p>다음 문장을 읽어주세요:</p>
                <p><b>"나는 물을 조금 마시고 싶어."</b></p>
                <p>이 문장에서 <b>물</b> 은 <b>셀 수 없습니다</b>  <b>분명한 단위별로 나누어 셀 수 없기 때문입니다</b>.</p>
                <p style="margin-top: 20px;">몇가지 예문을 보며 연습해 보겠습니다!</p>
            </div>`,
        choices: ['다음'],
        button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin: 10px;">%choice%</button>'
    }]
};

const instructions_countmass3 = {
    timeline: [{
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div style="text-align: center; max-width: 700px; margin: auto; font-size: 18px; line-height: 1.6;">
                <p><b>중요:</b> ⚠️ <b style="color: grey;">"회색"</b>이라는 단어가 나오면 항상 <u><b>"가산명사"</b></u>를 선택하세요.</p>
            </div>`,
        choices: ["시작!"],
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
                        options: ['셀 수 있다', '셀 수 없다', '잘 모르겠다/구분이 어렵다'],
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
                            <p><b>${isCorrect ? '맞습니다!' : '틀렸습니다!'}</b></p>
                            <p>${isCorrect ? feedbackCorrect : feedbackIncorrect}</p>
                        </div>`;
                },
                choices: ['다음'],
                button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
            }
        ],
        timeline_variables: [{ correct_answer: correctAnswer }]
    };
};

// Define practice trials
const practice_countmass1 = generatePracticeCountMassTrial(
    `다음 문장을 읽어주세요: <b>[의자에 앉으시겠습니까?]</b> 이 문장에서 <b>의자</b>는:`,
    "셀 수 있습니다",
    "맞습니다! 의자는 셀 수 있습니다 - 의자는 개별로 셀 수 있기 때문입니다.",
    "의자는 셀 수 있습니다 - 의자는 개별로 셀 수 있기 때문입니다. 계속 진행하겠습니다!",
    "의자"
);

const practice_countmass2 = generatePracticeCountMassTrial(
    `다음 문장을 읽어주세요: <b>[설탕이 너무 많아]</b> 이 문장에서 <b>설탕</b>은:`,
    "셀 수 없습니다",
    "맞습니다! 설탕은 셀 수 없습니다 - 설탕은 개별로 셀 수 없는 물질이기 때문입니다.",
    "설탕은 셀 수 없습니다 - 설탕은 개별로 셀 수 없는 물질이기 때문입니다. 계속 진행하겠습니다!",
    "설탕"
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
                                    <b>${word}</b>는:
                                </div>`;
                    },
                    options: ['셀 수 있다', '셀 수 없다', '잘 모르겠다/구분이 어렵다'],
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
                <p>이번 판단 기준은 해당 단어가 <b>어떤 기준으로 분류 할 수 있는지</b>를 판단하게 될것입니다.</p>
        
                <p>다음 문장을 읽어주세요:</p>
                <p><b>"접시를 여러게 쌓았습니다."</b></p>
        
                <p>이 문장에서 <b>접시</b> 는 <b>형태</b>의 기준으로 분류 할 수 있습니다. 접시는 여러 물질 (플라스틱, 세라믹, 유리)과 다양한 색상으로 만들 수 있지만, 접시는 항상 비슷한 형태를 가지고 있기 때문입니다.</p>
        
                <p style="margin-top: 20px; font-weight: bold;"> </p>
            </div>        
            `,
            choices: ['다음'],
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
                
                <p style="margin-bottom: 10px;">예를 들어, 이것은 접시입니다:</p>
                
                <div style="display: flex; justify-content: center; margin: 10px 0;">
                    <img src="images/steel_plate.jpg" alt="Steel plate" style="width: 120px; height: auto; border: 2px solid black; padding: 3px;">
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 15px;">
                    <div style="width: 45%;">
                        <p>만들어진 물질이 다르지만, 그럼에도 불구하고 다 접시입니다:</p>
                        <img src="images/ceramic_plate.jpg" alt="Ceramic plate" style="width: 100px; height: auto;">
                    </div>

                    <div style="width: 45%;">
                        <p>만들어진 물질이 똑같지만, 이것은 접시가 <b>아닙니다</b>:</p>
                        <img src="images/steel_cup.jpg" alt="Steel cup" style="width: 100px; height: auto;">
                    </div>
                </div>

                <p style="margin-top: 20px; font-weight: bold;">계속 진행하겠습니다!</p>
            </div>        
            `,
            choices: ['다음'],
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
                
                <p style="margin-bottom: 10px;">다음 문장을 읽어주세요:<p>
                <p><b>"모래를 조금 흘렸어."</b></p>
                
                <div style="display: flex; justify-content: center; margin: 10px 0;">
                    <img src="images/sand_pile.jpg" alt="Pile of sand" style="width: 130px; height: auto; border: 2px solid black; padding: 3px;">
                </div>
                
                <p>모래는 여러 색상과 다양한 형태를 가질 수 있지만,물질은 항상 똑같습니다.</p>

                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 15px;">
                    <div style="width: 45%;">
                        <p>겉모습은 달라도 이것은 모래입니다:</p>
                        <img src="images/white_pile.jpg" alt="White sand" style="width: 120px; height: auto;">
                    </div>

                    <div style="width: 45%;">
                        <p>겉모습이 비슷해도 이것은 모래가 <b>아닙니다</b>:</p>
                        <img src="images/leaves_pile.jpg" alt="Sugar granules" style="width: 150px; height: auto;">
                    </div>
                </div>

                <p style="margin-top: 20px; font-weight: bold;">⏭️ 다음 단어들을 어떤 기준으로 분류할 수 있는지 판단해주시기 바랍니다.</p>
            </div>        
            `,
            choices: ['다음'],
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

            <p><b>Important:</b> ⚠️ <b style="color: purple; background-color: lavender;">"라벤더"</b>라는 단어가 나오면, <u><b>"해당 사항 없음"</b></u>을 눌러주세요.</p>

            </div>`,
            choices: ["시작!"],
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
                        options: ['형태', '물질', '식상', '해당 사항 없음'],
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
                            <p><b>${isCorrect ? '맞습니다!' : '틀렸습니다!'}</b></p>
                            <p>${isCorrect ? feedbackCorrect : feedbackIncorrect}</p>
                        </div>
                    `;
                },
                choices: ['다음'],
                button_html: '<button class="jspsych-btn" style="font-size: 18px; padding: 10px 20px; margin-top: 10px;">%choice%</button>'
            }
        ],
        timeline_variables: [{ correct_answer: correctAnswer }]
    };
};

// Define the two practice category trials
const practice_category1 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    다음 문장을 읽어주세요 <span style="font-weight: bold;">[이것은 정사각형입니다]</span>, 
    <span style="font-weight: bold;">정사각형</span> 은 어느 기준으로 분류할 수 있다고 생각합니까?:
    </div>`,
    "형태",
    "모든 정사각형은 같은 형태를 가지고 있습니다. 형태가 다르다면, 더 이상 정사각형이 아닙니다. 계속 진행하겠습니다!",
    "모든 정사각형은 같은 형태를 가지고 있습니다. 물질과 색상은 다를 수 있으나, 형태가 다르다면, 더 이상 정사각형이 아닙니다. 계속 진행하겠습니다!",
    "정사각형"
);

const practice_category2 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    다음 문장을 읽어주세요 <b>[신호등에 빨간불이 보여서 그녀는 차를 멈췄다]</b>, 이 문장에서 <b>빨간불</b> 은 어느 기준으로 분류할 수 있다고 생각합니까?:
    </div>`,
    "색상",
    "모든 빨간불은 빨간 색상을 가지고 있습니다. 색상이 빨간색이 아니면, 차를 멈출 필요가 없습니다. 계속 진행하겠습니다!",
    "모든 빨간불은 빨간 색상을 가지고 있습니다. 물질과 형태는 다를 수 있으나, 색상이 다르다면, 차를 멈출 필요가 없습니다. 계속 진행하겠습니다!",
    "빨간불"
);

const practice_category3 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    다음 문장을 읽어주세요 <b>[그녀는 음식을 가장 비싼 도자기에 넣었습니다]</b>, 이 문장에서 <b>도자기</b> 는 어느 기준으로 분류할 수 있다고 생각합니까?:
    </div>`,
    "물질",
    "모든 도자기는 점토로 만들어져 있습니다. 물질이 유리나 나무나 쇠였더라면, 도자기가 아닙니다. 계속 진행하겠습니다!",
    "모든 도자기는 점토로 만들어져 있습니다. 형태나 색상은 다를 수 있으나, 물질이 유리나 나무나 쇠였더라면, 도자기가 아닙니다. 계속 진행하겠습니다!",
    "도자기"
);

const practice_category4 = generatePracticeCategoryTrial(
    `<div style="font-size: 20px; text-align: center; max-width: 700px; margin: auto;">
    다음 문장을 읽어주세요 <b>[그녀는 불안감을 느낍니다]</b>, 이 문장에서 <b>불안감</b> 은 어느 기준으로 분류할 수 있다고 생각합니까?:
    </div>`,
    "해당 사항 없음",
    "불안감은 형태, 색상, 또는 물질이라는 기준으로 분류 할 수 없습니다. 계속 진행하겠습니다!",
    "불안감은 형태, 색상, 또는 물질이라는 기준으로 분류 할 수 없습니다. 계속 진행하겠습니다!",
    "불안감"
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
                    options: ['형태', '색상', '물질', '해당 사항 없음'],
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

timeline.push(category);
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
                        <p><strong>조사를 완료하기 위해서 "다음" 을 눌러주세요.</strong></p>
                        <p>본 연구에 참여해주셔서 감사합니다!</p>
                        <p>연구와 과학의 발전에 참여해주셔서 감사드립니다.</p>
                        <p>귀하는 이제 재접속됩니다. 문의하실 사항이 있으시면  
                        <a href="mailto:languagecoglab@gmail.com" style="color: #0073e6; font-weight: bold;">languagecoglab@gmail.com</a>으로 연락 부탁드립니다.</p>
                        <p><em>좋은 하루 되세요!</em></p>
                        <div style="margin-top: 20px;">
                            <img src="stanford.png" style="max-width: 250px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);">
                        </div>
                    </div>
                `;
            },
            choices: ['다음'],
            button_html: '<button class="jspsych-btn" style="font-size: 20px; padding: 12px 24px; margin-top: 10px; background-color: #0073e6; color: white; border-radius: 8px; border: none;">%choice%</button>'
        }
    ]
};


timeline.push(goodbye);
// ---------------------------------------------------------------------------------------------

jsPsych.run(timeline);
