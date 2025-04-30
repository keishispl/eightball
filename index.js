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