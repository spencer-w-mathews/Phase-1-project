//fetch from random user api then click event for generate user button to populate nemesis card 
fetch('https://randomuser.me/api/')
    .then(res=>res.json())
    .then(randomUser=>{
        generateNewUserBtn.addEventListener("click", ()=>{
            generateNewUser(randomUser)
            generateNewUserBtn.remove()
            const refreshMessage= document.createElement('h5')
            const header= document.querySelector('h1')
            refreshMessage.textContent= 'Accept, decline, or refresh the page to find a new nemesis!'
            header.append(refreshMessage)
            //accept button click event listener to notify user nemesis has been added to list
            acceptBtn.addEventListener("click", ()=>{
                acceptBtn.remove()
                declineBtn.remove()
                alert(`${randomUser.results[0].name.first} has been added to your list of nemeses`)
            })
        })
        
    })
    
//globally declared variables in the interest of DRY
const generateNewUserBtn = document.querySelector(".generator")
const enemyName = document.querySelector(".name")
const enemyAge = document.querySelector(".age")
const enemyImage= document.querySelector(".image")
const enemyLoc= document.querySelector(".address")
const enemyPhone= document.querySelector(".phone")
const weak = document.createElement('p')
//This function is used to populate nemesis card 
function generateNewUser(user){
    enemyName.textContent = user.results[0].name.first
    enemyImage.src=user.results[0].picture.large
    enemyAge.textContent= `Age: ${user.results[0].dob.age}`
    enemyLoc.textContent= `Location: ${user.results[0].location.state}`
    enemyPhone.textContent= `Phone: ${user.results[0].cell}`
    
    //first instance of .forEach in project- create an array and randomly assign weakness to each nemesis through the use of the .forEach function
    const randomly = () => Math.random() - 0.5
    const weakness = ['Weakness: Bad Knees', 'Weakness: Stepping on Legos', 'Weakness: Time Zones', 'Weakness: Looking Both Ways Down A One Way Road', 'Weakness: Having Name Spelled Backwards', 'Weakness: Tree Nut Allergy', 'Weakness: Poor Internet Connection', 'Weakness: Does Not Take Criticism Well', 'Weakness: Commitment', 'Weakness: The Color Yellow', 'Weakness: Shy in Large Groups', 'Weakness: Cares Too Much', 'Weakness: Sarcasm']
    const weaknessInfo = Array(1).fill({})
    const dynamicWeakness = [].concat(weakness).sort(randomly)
    weaknessInfo.forEach((t, i)=> {
    console.info(dynamicWeakness[i])
    
    weak.textContent= dynamicWeakness[i]
    enemyPhone.append(weak)
    })

    //when the accept button is clicked an object for the new nemesis is created and posted to db.json
    acceptBtn.addEventListener("click", ()=>{
        const newNemesis = {
            name: user.results[0].name.first,
            image: enemyImage.src,
            age: user.results[0].dob.age,
            location: user.results[0].location.state,
            phone: user.results[0].cell,
            weakness: weak.textContent
        }
    //posting enemies to json server upon accept button click
        fetch('http://localhost:3000/enemies',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNemesis)
        })
        console.log(newNemesis)
    })
}




//Accept and Decling mouseenter and mouseleave events used to turn enemycard green and red when accept and decline are hovered over respectively
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

//fetch data from server and place names in unordered list then add click event to get the data to show up in enemy card. Also add X button and use click event to delete nemsis from server
fetch('http://localhost:3000/enemies')
    .then(res=>res.json())
    .then(enemies=>{
        //second instance of using .forEach in project used to populate nemisis list with data from JSON server
        enemies.forEach(enemy=>{
            const xBtn= document.createElement('input')
            xBtn.setAttribute("class", "xBtn")
            xBtn.setAttribute('type','button')
            xBtn.setAttribute('value', 'x')
            const nameForList= document.createElement('li')
            nameForList.textContent=enemy.name
            nameForList.append(xBtn)
            const list= document.querySelector('ul')
            list.append(nameForList)
            console.log(enemy)
            xBtn.addEventListener("click", ()=>{
                nameForList.remove()
                window.location.reload(true)
                fetch(`http://localhost:3000/enemies/${enemy.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> res.json())
                .then(enemy=> console.log(enemy))
            })
            nameForList.addEventListener('click', ()=>{
                enemyName.textContent=enemy.name
                enemyImage.src=enemy.image
                enemyAge.textContent=`Age: ${enemy.age}`
                enemyLoc.textContent=`Location: ${enemy.location}`
                enemyPhone.textContent=`Phone: ${enemy.phone}`
                weak.textContent=enemy.weakness
                enemyPhone.append(weak)
                acceptBtn.remove()
                declineBtn.remove()
                generateNewUserBtn.remove()
            })
        })
    })

//submit event listener on form and alert to notify user that message has been sent to the correct nemesis
const form = document.querySelector(".message")
form.addEventListener("submit", (e)=>{
    form.reset()
    e.preventDefault()
    alert(`You sent ${enemyName.textContent} a message!`)
})