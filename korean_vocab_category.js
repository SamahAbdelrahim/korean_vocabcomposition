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
                <p>One judgment in this task is about <b>word solidity</b>.</p>
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
                <p><b>Important:</b> ⚠️ If you see the word <b style="color: purple; background-color: paige;">"purple"</b>, always select <u><b>"solid"</b></u>.</p>
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
timeline.push(solidity);

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