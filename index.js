//fetch
fetch('https://randomuser.me/api/')
    .then(res=>res.json())
    .then(randomUser=>{
        console.log(randomUser)

        generateNewUserBtn.addEventListener("click", ()=>{
            generateNewUser(randomUser)
            generateNewUserBtn.remove()
            const refreshMessage= document.createElement('h5')
            const header= document.querySelector('h1')
            refreshMessage.textContent= 'Accept, decline, or refresh the page to find a new nemesis!'
            header.append(refreshMessage)
            acceptBtn.addEventListener("click", ()=>{
                acceptBtn.remove()
                declineBtn.remove()
                alert(`${randomUser.results[0].name.first} has been added to your list of nemeses`)
                const congrats= document.createElement("p")
                const phone = document.querySelector(".phone")
                congrats.textContent=`Congrats, ${randomUser.results[0].name.first} is your Nemesis!`
                phone.append(congrats)

                
            })
        })
        
    })
    

const generateNewUserBtn = document.querySelector(".generator")
const enemyName = document.querySelector(".name")
const enemyAge = document.querySelector(".age")
const enemyImage= document.querySelector(".image")
const enemyLoc= document.querySelector(".address")
const enemyPhone= document.querySelector(".phone")
const weak = document.createElement('p')
//generate new user
function generateNewUser(user){
    // const enemyName = document.querySelector(".name")
    // const enemyAge = document.querySelector(".age")
    // const enemyImage= document.querySelector(".image")
    // const enemyLoc= document.querySelector(".address")
    // const enemyPhone= document.querySelector(".phone")
    // const weak = document.createElement('p')
    enemyName.textContent = user.results[0].name.first
    enemyImage.src=user.results[0].picture.large
    enemyAge.textContent= `Age: ${user.results[0].dob.age}`
    enemyLoc.textContent= `Location: ${user.results[0].location.state}`
    enemyPhone.textContent= `Phone: ${user.results[0].cell}`
    
    const randomly = () => Math.random() - 0.5
    const weakness = ['Weakness: Bad Knees', 'Weakness: Stepping on Legos', 'Weakness: Time Zones', 'Weakness: Looking Both Ways Down A One Way Road', 'Weakness: Having Name Spelled Backwards', 'Weakness: Tree Nut Allergy', 'Weakness: Poor Internet Connection', 'Weakness: Does Not Take Criticism Well', 'Weakness: Commitment', 'Weakness: The Color Yellow', 'Weakness: Shy in Large Groups', 'Weakness: Cares Too Much', 'Weakness: Sarcasm']
    const weaknessInfo = Array(1).fill({})
    const dynamicWeakness = [].concat(weakness).sort(randomly)
    weaknessInfo.forEach((t, i)=> {
    console.info(dynamicWeakness[i])
    
    weak.textContent= dynamicWeakness[i]
    enemyPhone.append(weak)
    })
    acceptBtn.addEventListener("click", ()=>{
    const newNemesis = {
        name: user.results[0].name.first,
        image: enemyImage.src,
        age: user.results[0].dob.age,
        location: user.results[0].location.state,
        phone: user.results[0].cell,
        weakness: weak.textContent
    }
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

//fetch data from server and place names in unordered list then add click event to get the data to show up in enemy card
fetch('http://localhost:3000/enemies')
    .then(res=>res.json())
    .then(enemies=>{
        enemies.forEach(enemy=>{
            const xBtn= document.createElement('input')
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
                // const form = document.querySelector(".message")
                // form.addEventListener("submit", (e)=>{
                //     form.reset()
                //     e.preventDefault()
                //     alert('You sent your enemy a message!')})
                
                

            })
        })
    })

    const form = document.querySelector(".message")
    form.addEventListener("submit", (e)=>{
        form.reset()
        e.preventDefault()
        alert(`You sent ${enemyName.textContent} a message!`)
    })