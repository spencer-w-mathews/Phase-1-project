//fetch
fetch('https://randomuser.me/api/')
    .then(res=>res.json())
    .then(randomUser=>{
        console.log(randomUser)
        const generateNewUserBtn = document.querySelector(".generator")
        generateNewUserBtn.addEventListener("click", ()=>{
            generateNewUser(randomUser)
            generateNewUserBtn.remove()
            acceptBtn.addEventListener("click", ()=>{
                acceptBtn.remove()
                declineBtn.remove()
                const congrats= document.createElement("p")
                const address= document.querySelector(".address")
                        congrats.textContent=`${randomUser.results[0].name.first} is your Archenemy!`
                address.append(congrats)
                const form = document.querySelector(".message")
                form.addEventListener("submit", (e)=>{
                    form.reset()
                    e.preventDefault()
                    alert('You sent your enemy a message!')
                })
            })
        })
        
    })

//generate new user
function generateNewUser(user){
    const enemyName = document.querySelector(".name")
    const enemyAge = document.querySelector(".age")
    const enemyImage= document.querySelector(".image")
    const enemyLoc= document.querySelector(".address")
    enemyName.textContent = user.results[0].name.first
    enemyImage.src=user.results[0].picture.large
    enemyAge.textContent= `Age: ${user.results[0].dob.age}`
    enemyLoc.textContent= `Location: ${user.results[0].location.state}`
}




//Accept and Decling mouseenter and mouseleave events
const acceptBtn=document.querySelector(".accept")
const enemyCard=document.querySelector(".enemyCard")
const declineBtn= document.querySelector(".decline")

acceptBtn.addEventListener("mouseenter", ()=>{
    enemyCard.style.background= "green"
    acceptBtn.style.color= "green"
})

acceptBtn.addEventListener("mouseleave", ()=>{
    enemyCard.style.background= "black"
    acceptBtn.style.color= "black"
})

declineBtn.addEventListener("mouseenter", ()=>{
    enemyCard.style.background= "red"
    declineBtn.style.color= "red"
})

declineBtn.addEventListener("mouseleave", ()=>{
    enemyCard.style.background= "black"
    declineBtn.style.color= "black"
})

// accept button click
// acceptBtn.addEventListener("click", ()=>{
//     acceptBtn.remove()
//     declineBtn.remove()
//     const congrats= document.createElement("p")
//     const address= document.querySelector(".address")
//     congrats.textContent="Congrats, you have 1 new enemy!"
//     address.append(congrats)
// })

// submit button
// const form = document.querySelector(".message")
// form.addEventListener("submit", (e)=>{
//     form.reset()
//     e.preventDefault()
//     alert('You sent your enemy a message!')
// })