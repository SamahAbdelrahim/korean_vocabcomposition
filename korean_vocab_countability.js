import { words_array } from "./words.js";

console.log(words_array);

let timeline = [];

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

// Pick 20 random words from the selected group
const selectedWords = chosenGroup.slice(0, 20);
const selectedWords2 = [...selectedWords];

// Define the grey object (In Korean: "회색")
const greyWord = { "theword": "grey" };

// Add "grey" at a random position in selectedWords2
const randomIndex = Math.floor(Math.random() * (selectedWords2.length + 1)); // +1 to allow insertion at the very end
selectedWords2.splice(randomIndex, 0, greyWord); // Insert "grey" at a random position

console.log(words_array);

console.log(selectedWords2);

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
                stimulus: function() {
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
                    prompt: function() {
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
            on_finish: function(data) {
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

// Full Countability Block
const countmass = {
    timeline: [
        instructions_countmass1,
        instructions_countmass2,
        instructions_countmass3,
        practice_countmass1,
        practice_countmass2,
        block_countmass
    ],
    randomization: false
};

timeline.push(countmass);