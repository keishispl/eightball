function getJSON() {
     var request = new XMLHttpRequest();
     request.open("GET", `settings.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

/**
 * Sets up the HTML structure for the Eightball app.
 */
function setupHTML() {
     const { key } = getJSON();

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
     title.textContent = key.title;
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
     input.placeholder = key.input;
     input.id = "question";
     input.autocomplete = "off";
     askDiv.appendChild(input);

     // Create and append the ask button
     const button = document.createElement("a");
     button.className = "button";
     button.id = "button";
     button.textContent = key.button;
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
     recentBoxText.textContent = key.recent;
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
     var { eightball } = getJSON();

     // If a specific index is provided, return the response at that index
     if (number !== -1) return eightball[number];

     // Otherwise, return a random response from the array
     return eightball[Math.floor(Math.random() * eightball.length)];
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
     // Get the box element
     const boxDiv = document.querySelector(".box");

     // Check if the box is scrolled to the bottom
     const scroll = boxDiv.scrollHeight - boxDiv.offsetHeight - boxDiv.scrollTop < 33 ? true : false;

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

     // Scroll the box to the bottom if it was already scrolled to the bottom
     if (scroll === true) {
          // Use the smooth scrolling behavior to make it look nicer
          boxDiv.scrollTo({top: boxDiv.scrollHeight, behavior: "smooth"});
     }
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