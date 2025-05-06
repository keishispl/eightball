/**
 * Loads the settings JSON file and returns the parsed object.
 *
 * @returns {Object} The parsed JSON object from the settings file.
 */
function getJSON() {
     var request = new XMLHttpRequest();
     request.open("GET", `settings.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
};

/**
 * Creates a new HTML object and sets its properties before appending it to a given body.
 *
 * @param {HTMLElement} body - The body element to append the new HTML object to.
 * @param {string} item - The type of HTML object to create.
 * @param {Array} object - An array containing the properties of the new HTML object. Currently, the properties supported are:
 * - id
 * - className
 * - textContent
 * @param {Array} [extras] - An array containing extra properties to set on the new HTML object. The property names are the names of the attributes to set, and the values are the values to set them to.
 * @param {boolean} [returnObject] - Whether to return the new HTML object or not. Defaults to false.
 * @returns {HTMLElement | void} - The new HTML object if returnObject is true, otherwise undefined.
 */
function setHTMLObject(body, item, object, extras = undefined, returnObject = false) {
     const htmlObject = document.createElement(item);

     if (object.id !== undefined) htmlObject.id = object.id;
     if (object.className !== undefined) htmlObject.className = object.className;
     if (object.textContent !== undefined) htmlObject.textContent = object.textContent;

     if (extras !== undefined) {
          for (const extra in extras) {
               htmlObject.setAttribute(extra, extras[extra]);
          };
     };

     body.appendChild(htmlObject);

     if (returnObject) return htmlObject;
};

/**
 * Sets up the HTML structure for the Eightball app.
 */
function setupHTML() {
     const undef = "???";
     const { key } = getJSON();

     // Get the body element
     const body = document.querySelector("body");

     // Create and append the main content container
     const content = setHTMLObject(body, "div", {
          id: "content",
          className: "centerpage"
     }, undefined, true);

     // Create and append the title
     setHTMLObject(content, "h1", {
          id: "title",
          textContent: document.title
     });

     // Create and append a tiny padding element
     setHTMLObject(content, "div", {
          className: "tinypadding"
     });

     // Create and append a container for the input and button
     const askDiv = setHTMLObject(content, "div", {
          className: "together"
     }, undefined, true);

     // Create and append the input field
     setHTMLObject(askDiv, "input", {
          id: "question",
          className: "tinypadding"
     },
     {
          type: "text",
          placeholder: key.input ?? undef,
          autocomplete: "off"
     });

     // Create and append the ask button
     setHTMLObject(askDiv, "a", {
          id: "button",
          className: "button",
          textContent: key.button ?? undef
     });

     // Create and append the box for displaying results
     const box = setHTMLObject(content, "div", {
          className: "box"
     }, undefined, true);

     // Create and append a paragraph to display questions and answers
     setHTMLObject(box, "p", {
          id: "box",
     });

     // Create and append a label for the most recent output
     setHTMLObject(content, "p", {
          id: "recent",
          textContent: key.recent ?? undef
     });

     // Create and append a smaller box for recent results
     const recentBox = setHTMLObject(content, "div", {
          className: "smolbox"
     }, undefined, true);

     // Create and append a paragraph to display the recent question
     setHTMLObject(recentBox, "p", {
          id: "resultQuestion"
     });

     // Create and append a paragraph to display the recent result
     setHTMLObject(recentBox, "p", {
          id: "resultResult"
     });
}
setupHTML();

/**
 * Loads the list of Eightball responses from a JSON file and returns a random one.
 * If a specific index is provided, returns the response at that index.
 *
 * @param {number} [number] - Optional index to retrieve a specific response.
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