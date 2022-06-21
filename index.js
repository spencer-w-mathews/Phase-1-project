const acceptBtn=document.querySelector(".accept")
const enemyCard=document.querySelector(".enemyCard")
const declineBtn= document.querySelector(".decline")
acceptBtn.addEventListener("mouseenter", ()=>{
    enemyCard.style.background= "green"
})

acceptBtn.addEventListener("mouseleave", ()=>{
    enemyCard.style.background= "black"
})

declineBtn.addEventListener("mouseenter", ()=>{
    enemyCard.style.background= "red"
})

declineBtn.addEventListener("mouseleave", ()=>{
    enemyCard.style.background= "black"
})