/**
 * Sets up the HTML structure for the Eightball app.
 */
function setupHTML() {
     // Get the body element
     const body = document.querySelector("body");

     // Create and append the main content container
     const content = document.createElement("div");
     content.id = "content";
     content.className = "centerpage";
     body.appendChild(content);

     // Create and append the title
     const title = document.createElement("h1");
     title.id = "title";
     title.textContent = "Eightball";
     content.appendChild(title);

     // Create and append a tiny padding element
     const tinypadding = document.createElement("div");
     tinypadding.className = "tinypadding";
     content.appendChild(tinypadding);

     // Create and append a container for the input and button
     const askDiv = document.createElement("div");
     askDiv.className = "together";
     content.appendChild(askDiv);

     // Create and append the input field
     const input = document.createElement("input");
     input.type = "text";
     input.placeholder = "What would you like to ask?";
     input.id = "question";
     input.autocomplete = "off";
     askDiv.appendChild(input);

     // Create and append the ask button
     const button = document.createElement("a");
     button.className = "button";
     button.id = "button";
     button.textContent = "Ask";
     askDiv.appendChild(button);

     // Create and append the box for displaying results
     const box = document.createElement("div");
     box.className = "box";
     content.appendChild(box);

     // Create and append a paragraph to display questions and answers
     const boxText = document.createElement("p");
     boxText.id = "box";
     box.appendChild(boxText);

     // Create and append a label for the most recent output
     const recentBoxText = document.createElement("p");
     recentBoxText.id = "recent";
     recentBoxText.textContent = "Most recent output from this session";
     content.appendChild(recentBoxText);

     // Create and append a smaller box for recent results
     const recentBox = document.createElement("div");
     recentBox.className = "smolbox";
     content.appendChild(recentBox);

     // Create and append a paragraph to display the recent question
     const resultQuestion = document.createElement("p");
     resultQuestion.id = "resultQuestion";
     recentBox.appendChild(resultQuestion);

     // Create and append a paragraph to display the recent result
     const resultResult = document.createElement("p");
     resultResult.id = "resultResult";
     recentBox.appendChild(resultResult);
}
setupHTML();

/**
 * Loads the list of Eightball responses from a JSON file and returns a random one.
 * If a specific index is provided, returns the response at that index.
 *
 * @param {number} [number=-1] - Optional index to retrieve a specific response.
 * @returns {string} A random or specified Eightball response.
 */
function getRandomEightballElement(number = -1) {
     // Load and parse the JSON file
     var request = new XMLHttpRequest();
     request.open("GET", `results.json`, false);
     request.send(null);
     const array = JSON.parse(request.responseText);

     // If a specific index is provided, return the response at that index
     if (number !== -1) return array[number];

     // Otherwise, return a random response from the array
     return array[Math.floor(Math.random() * array.length)];
};

/**
 * Runs the Eightball program.
 *
 * @returns {void}
 */
function runEightball() {
     const question = document.getElementById("question");

     if (question.value === "") return;

     // Get the box element
     const box = document.getElementById("box");

     // Get the elements for the recent question and result
     const resultQuestion = document.getElementById("resultQuestion");
     const resultResult = document.getElementById("resultResult");

     // Get the random Eightball response
     const result = getRandomEightballElement();

     // Add the result to the box
     const item = box.innerHTML === "" ? "" : "<br>";
     box.innerHTML += `${item}> ${question.value}<br>${result}`;

     // Add the recent question and result to the recent box
     resultQuestion.textContent = "> " + question.value;
     resultResult.textContent = result;

     // Clear the question box
     question.value = "";
};

// Add event listener for clicking the ask button
document.getElementById("button").addEventListener("click", function () {
     runEightball();
});

// Add event listener for pressing enter in the question box
document.getElementById("question").addEventListener("keyup", function (event) {
     if (event.key === "Enter") {
          runEightball();
     };
});