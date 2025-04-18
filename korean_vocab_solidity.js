

// Pick 20 random words from the selected group
const selectedWords = chosenGroup.slice(0, 20);

// Define the purple object (In Korean: "라벤더" )
const purpleWord = { "theword": "purple" };

// Add "lavender" at a random position in selectedWords2
const randomIndex = Math.floor(Math.random() * (selectedWords.length + 1)); // +1 to allow insertion at the very end
selectedWords.splice(randomIndex, 0, purpleWord); // Insert "purple" at a random position

console.log(words_array);

console.log(selectedWords);

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

// Full Solidity Block
const solidity = {
    timeline: [
        instructions_solidity1,
        instructions_solidity2,
        instructions_solidity3,
        practice_solidity1,
        practice_solidity2,
        block_solidity
    ],
    randomization: false
};

