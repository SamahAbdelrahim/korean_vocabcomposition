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
const instructions_countmass = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        '<p> <font size="4"> One judgment is whether a word is a count or a mass noun. A <b>count noun</b> refers to objects that can be divided into <b>individual units and counted</b>.<font> <p>' +
        '<p> <font size="4"> For example, consider the sentence: <b>“I need several pens”</b>. <font> <p>' +
        '<p> <font size="4"> [<b>Pen</b>] is a count noun.</font> <p>' +
        '<p> <font size="4">A noun that refers to <b>undifferentiated and uncountable substances</b> is called a <b>mass noun</b>. <font> <p>' +
        '<p> <font size="4"> For example, consider the sentence: <b>“I need some water”</b>. <font> <p>' +
        '<p> <font size="4"> [<b>Water</b>] is a mass noun.<font> <p>' +
        '<p> <font size="4"> Next, we’d like you to judge whether other words are count or mass nouns. <font> <p> ' +
        '<p> <font size="4"> <b>Note</b>: when you see the word <b>"Grey"</b> click <b>"count noun"</b> <font> <p>' +
        '<p> <font size="4"> Let’s begin! <font> <p>',
    choices: ['Continue']
};
//timeline.push(instructions_countmass);

var practice_countmass1 = {
    timeline: [
        {
            type: jsPsychSurveyMultiChoice,
            questions: [
                {
                    prompt: " In the sentence [would you like a Chair?], a chair is: ",
                    options: ['count noun', 'mass noun'],
                    required: true,
                },
            ],
            on_finish: function (data) {
                var currentWord = " In the sentence [would you like a Chair?], a chair is:";
                console.log("testing");
                console.log(jsPsych.data.get().values()[2].response.Q0);
                var response = jsPsych.data.getLastTrialData().values()[0].response.Q0;
                var isCorrect = response === 'count noun';
                blockname = "practice_countmass";

                jsPsych.data.addDataToLastTrial({
                    theword: currentWord,
                    theblock: blockname,
                    correct: isCorrect,
                });

                var feedbackMessage = isCorrect ? "Correct! Now let's go forward!" : "Incorrect! chair is a count noun. Let's go forward!";
                alert(feedbackMessage);
            }
        }
    ],
};

var practice_countmass2 = {
    timeline: [
        {
            type: jsPsychSurveyMultiChoice,
            questions: [
                {
                    prompt: " In the sentence [This is so much sugar?], sugar is: ",
                    options: ['count noun', 'mass noun'],
                    required: true,
                },
            ],
            on_finish: function (data) {
                var currentWord = " In the sentence [This is so much sugar?], sugar is: ";
                console.log("testing");
                console.log(jsPsych.data.get().values()[2].response.Q0);
                var response = jsPsych.data.getLastTrialData().values()[0].response.Q0;
                var isCorrect = response === 'mass noun';
                blockname = "practice_countmass";

                jsPsych.data.addDataToLastTrial({
                    theword: currentWord,
                    theblock: blockname,
                    correct: isCorrect,
                });

                var feedbackMessage = isCorrect ? "Correct! Now let's begin! " : "Incorrect! sugar is a mass noun. Now let's begin!";
                alert(feedbackMessage);
            }
        }
    ],
};

var block_countmass = {
    timeline: [
        {
            type: jsPsychSurveyMultiChoice,
            questions: [
                {
                    prompt: jsPsych.timelineVariable('uni_lemma'),
                    options: ['count noun', 'mass noun', 'unclear/unknown'],
                    required: true,
                    // on_finish: function(data){
                    //       data.word = selectedWords2['uni_lemma'];
                    //     }
                }
            ],
            on_finish: function (data) {
                // Access the value of 'uni_lemma' for the current trial
                var currentWord = jsPsych.timelineVariable('uni_lemma');
                var blockname = "count_mass";

                jsPsych.data.addDataToLastTrial({
                    theword: currentWord,
                    theblock: blockname,
                });
            }
        },
    ],
    timeline_variables: selectedWords2,
    randomize_order: true
};

var attention_countmass = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "grey",
            options: ['count noun', 'mass noun', 'unclear/unknown'],
            required: true,
            horizontal: false
        },
    ],
    on_finish: function (data) {
        // Access the value of 'uni_lemma' for the current trial
        var currentWord = "grey";
        var blockname = "attention_countmass";


        jsPsych.data.addDataToLastTrial({
            theword: currentWord,
            theblock: blockname,
        });

    },
};

var countmass = {
    timeline: [instructions_countmass, practice_countmass1, practice_countmass2, block_countmass, attention_countmass],
    randomization: false,
}

//timeline.push(countmass);