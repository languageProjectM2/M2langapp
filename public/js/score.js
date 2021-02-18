

let score = 0;
function addScore() {
  score += 20;
  let scoreDiv = document.getElementById('score');
  scoreDiv.innerText = `Score : ${score}`
}
 
let cardContainer = document.getElementById('cardContainer');
cardContainer.addEventListener('mouseover', addScore);