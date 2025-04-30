function setupHTML() {
     const body = document.querySelector("body");

     const content = document.createElement("div");
     content.id = "content";
     content.className = "centerpage";
     body.appendChild(content);

     const title = document.createElement("h1");
     title.id = "title";
     title.innerHTML = "Eightball";
     content.appendChild(title);

     const tinypadding = document.createElement("div");
     tinypadding.className = "tinypadding";
     content.appendChild(tinypadding);

     const askDiv = document.createElement("div");
     askDiv.className = "together";
     content.appendChild(askDiv);

     const input = document.createElement("input");
     input.type = "text";
     input.placeholder = "What would you like to ask?";
     input.id = "question";
     input.autocomplete = "off";
     askDiv.appendChild(input);

     const button = document.createElement("a");
     button.className = "button";
     button.id = "button";
     button.innerHTML = "Ask";
     askDiv.appendChild(button);

     const box = document.createElement("div");
     box.className = "box";
     content.appendChild(box);

     const boxText = document.createElement("p");
     boxText.id = "box";
     box.appendChild(boxText);

     const recentBoxText = document.createElement("p");
     recentBoxText.id = "recent";
     recentBoxText.innerHTML = "Most recent output from this session";
     content.appendChild(recentBoxText);

     const recentBox = document.createElement("div");
     recentBox.className = "smolbox";
     content.appendChild(recentBox);

     const resultQuestion = document.createElement("p");
     resultQuestion.id = "resultQuestion";
     recentBox.appendChild(resultQuestion);

     const resultResult = document.createElement("p");
     resultResult.id = "resultResult";
     recentBox.appendChild(resultResult);

};
setupHTML();

function randomEightballElement() {
     var request = new XMLHttpRequest();
     request.open("GET", `results.json`, false);
     request.send(null);
     const array = JSON.parse(request.responseText);
     return array[Math.floor(Math.random() * array.length)];
};

function runEightball() {
     const question = document.getElementById("question");

     if (question.value === "") return;

     const box = document.getElementById("box");
     const resultQuestion = document.getElementById("resultQuestion");
     const resultResult = document.getElementById("resultResult");

     const result = randomEightballElement();

     var item = "<br>"
     if (box.innerHTML === "") item = "";

     box.innerHTML = box.innerHTML + item + "> " + question.value + "<br>" + result;
     resultQuestion.innerHTML = "> " + question.value;
     resultResult.innerHTML = result;

     question.value = "";
};

document.getElementById("button").addEventListener("click", function () {
     runEightball();
});
document.getElementById("question").addEventListener("keyup", function (event) {
     if (event.key === "Enter") {
          runEightball();
     };
});