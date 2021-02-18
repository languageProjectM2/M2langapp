

let score = 0;
 
let btnCorrectWord = document.querySelectorAll('#correctWord');
for (let i=0; i < cardContainer.length; i++){
  cardContainer[i].addEventListener('click', ()=>{
    score += 20;
    console.log("The score is", score)
    let scoreDiv = document.getElementById('score');
    scoreDiv.innerText = `Score : ${score}`
  });
}

