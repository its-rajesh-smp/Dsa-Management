// Map To Reduce If Else Statement check for catagorie
var map = new Map()

document.querySelector(".btnAdd").addEventListener('click', (e) => {
    e.preventdefault;
    let problem =     document.querySelector('.problem').value;
    let link =        document.querySelector('.link').value;
    let desc =        document.querySelector('.desc').value;
    let select_type = document.querySelector('#select_type').value;
    let select_chat = document.querySelector('#select_chat').value;

    // Todo check if inputs are empty
    if (problem == "" || link == "" || desc == "") { alert("Missing Input Field"); return }
    if(localStorage.getItem(problem.toLowerCase().replace(/ /g, ''))){alert("Already Present Try To Use Another Problem Name"); return }
    let addingDate = new Date().getDate()

    AddtoList(problem, link, desc, select_type, select_chat, addingDate)
    AddToLocalStorage(problem, link, desc, select_type, select_chat)
    
    // todo Making Field Blank
    document.querySelector('.problem').value=""
    document.querySelector('.link').value=""
    document.querySelector('.desc').value=""
    document.querySelector('#select_type').value="Easy"
    document.querySelector('#select_chat').value="Array"


    document.querySelector(".alartBox").style.display="block"
    document.querySelector(".alartBox").classList.add('animationAlart')
    // AlartBox
    setTimeout(()=>{
        document.querySelector(".alartBox").classList.remove('animationAlart')
        document.querySelector(".alartBox").style.display="none"
    },4000)
    
})


// Fetch List On Load
document.addEventListener('load', fetchDataFromLocalStorage())




function AddtoList(problem, link, desc, select_type, select_chat) {

    // Creating chatagorie If dosenot exists
    if (!map.has(select_chat)) {
        map.set(select_chat, `.${select_chat.toLowerCase()}`)
        creatCatagorie(select_chat)
    };

    // if exists
    let getclass = map.get(select_chat)


    let newQuestion = document.createElement('div')
    newQuestion.classList.add("question")

    let newProb = document.createElement('h4')
    newProb.textContent = problem
    newProb.classList.add("prob")
    newQuestion.append(newProb)

    let newlink = document.createElement('a')
    newlink.setAttribute('href', link)
    newlink.setAttribute('target', "_blank")
    newlink.innerHTML = "<i class='bx bx-link-alt' > Link</i>"
    newlink.classList.add('link')
    newQuestion.append(newlink)

    let newtype = document.createElement('p')
    newtype.textContent = select_type
    if(select_type=="Easy"){newtype.style.color='Green'}
    if(select_type=="Medium"){newtype.style.color='#a09a04'}
    if(select_type=="Hard"){newtype.style.color='Red'}
    newtype.classList.add('type')
    newQuestion.append(newtype)

    let newdesc = document.createElement('p')
    newdesc.textContent = desc
    newdesc.classList.add('desc')
    newQuestion.append(newdesc)



    document.querySelector(getclass).append(newQuestion)

    // Collecting The Count Of Each Catagorie
    newQuestion.parentElement.children[0].children[1].textContent = newQuestion.parentElement.children.length - 1

}


function creatCatagorie(select_chat) {
    let newChat = document.createElement('div')
    newChat.classList.add(select_chat.toLowerCase())

    let newDiv = document.createElement('div')
    newDiv.classList.add('chat_div')
    let newh2 = document.createElement('p')
    newh2.classList.add('chat_div_chat')
    newh2.textContent = select_chat
    newDiv.append(newh2)

    let newh4 = document.createElement('p')
    newh4.classList.add("chat_div_count")
    newh4.textContent = "--" //!

    newDiv.append(newh4)

    newChat.append(newDiv)

    document.querySelector('.all_list').append(newChat)
}


// Fetch Data
function fetchDataFromLocalStorage() {
    let object = Object.keys(localStorage)

    // Sort By Alphabatically Order
    object.sort((a, b) => {
        let nameA = JSON.parse(localStorage[a]).Catagorie.toUpperCase();
        let nameB = JSON.parse(localStorage[b]).Catagorie.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    // Adding to the list
    object.forEach((item) => {
        let getData = JSON.parse(localStorage[item])
        AddtoList(getData.ProblemName, getData.Link, getData.Desc, getData.Type, getData.Catagorie)
    })

}







//! --------------------------------------
//Function To Add data in storage
function AddToLocalStorage(problem, link, desc, select_type, select_chat) {

    // Generating Date and forming the first revision date
    let questionDate = new Date()
    let questionDay = questionDate.getDate()

    let GenDate = new Date()
    GenDate.setDate(questionDay + 1)  //!

    let revisonDate = GenDate.getDate()
    let revisonMonth = GenDate.getMonth() + 1

    console.log(revisonDate);
    console.log(revisonMonth);

    let obj = {
        ProblemName: problem,
        Link: link,
        Desc: desc,
        Type: select_type,
        Catagorie: select_chat,
        RevisonDate: revisonDate,
        RevisonMonth: revisonMonth
    }


    localStorage.setItem(problem.toLowerCase().replace(/ /g, ''), JSON.stringify(obj))

}
//! --------------------------------------



// Scroll To Section
document.querySelector(".quickSelect").addEventListener('click',(e)=>{
    let target=`.${e.target.textContent.toLowerCase()}`
    if(!map.has(e.target.textContent)){return;}
    document.querySelector(target).scrollIntoView({"behavior":"smooth"})
})


