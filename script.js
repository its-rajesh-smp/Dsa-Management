// Map To Reduce If Else Statement check for catagorie
var map=new Map()

document.querySelector(".btnAdd").addEventListener('click',(e)=>{
    e.preventdefault;
    let problem=document.querySelector('.problem').value;
    let link=document.querySelector('.link').value;
    let desc=document.querySelector('.desc').value;
    let select_type=document.querySelector('#select_type').value;
    let select_chat=document.querySelector('#select_chat').value;
    
    // Todo check if inputs are empty
    if(problem==""||link==""||desc==""){alert("Missing Input Field");return}

    let addingDate=new Date().getDate()

    AddtoList(problem,link,desc,select_type,select_chat,addingDate)
    AddToLocalStorage(problem,link,desc,select_type,select_chat)
})


// Fetch List On Load
document.addEventListener('load',fetchDataFromLocalStorage())




function AddtoList(problem,link,desc,select_type,select_chat){

    // Creating chatagorie If dosenot exists
    if(!map.has(select_chat)){
        map.set(select_chat,`.${select_chat.toLowerCase()}`)
        creatCatagorie(select_chat)
    };
    
    // if exists
    let getclass=map.get(select_chat)

    
    let newQuestion=document.createElement('div')
    newQuestion.classList.add("question")

    let newProb=document.createElement('h4')
    newProb.textContent=problem
    newQuestion.append(newProb)

    let newlink=document.createElement('a')
    newlink.setAttribute('href',link)
    newlink.textContent="Link"
    newQuestion.append(newlink)
    
    let newtype=document.createElement('p')
    newtype.textContent=select_type
    newQuestion.append(newtype)
    
    let newdesc=document.createElement('p')
    newdesc.textContent=desc
    newQuestion.append(newdesc)



    document.querySelector(getclass).append(newQuestion)

    // Collecting The Count Of Each Catagorie
    newQuestion.parentElement.children[0].children[1].textContent = newQuestion.parentElement.children.length-1
 
}


function creatCatagorie(select_chat){
    let newChat=document.createElement('div')
    newChat.classList.add(select_chat.toLowerCase())

    let newDiv=document.createElement('div')
    let newh2=document.createElement('h2')
    newh2.textContent=select_chat
    newDiv.append(newh2)
    
    let newh4=document.createElement('h4')
    newh4.textContent="--" //!

    newDiv.append(newh4)

    newChat.append(newDiv)

    document.querySelector('.all_list').append(newChat)
}


// Fetch Data
function fetchDataFromLocalStorage(){
    let object=Object.keys(localStorage)

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
    object.forEach((item)=>{
        let getData= JSON.parse( localStorage[item]) 
        AddtoList(getData.ProblemName,getData.Link,getData.Desc,getData.Type,getData.Catagorie)
    })

}







//! --------------------------------------
//Function To Add data in storage
function AddToLocalStorage(problem,link,desc,select_type,select_chat){
    
    // Generating Date and forming the first revision date
    let questionDate=new Date()
    let questionDay=questionDate.getDate()

    let GenDate=new Date()
    GenDate.setDate(questionDay)+1  //!
    
    let revisonDate=GenDate.getDate() 
    let revisonMonth= GenDate.getMonth()+1

    console.log(revisonDate);
    console.log(revisonMonth);
    
    let obj={
        ProblemName:problem,
        Link:link,
        Desc:desc,
        Type:select_type,
        Catagorie:select_chat,
        RevisonDate:revisonDate,
        RevisonMonth:revisonMonth
    }


    localStorage.setItem(problem,JSON.stringify(obj))

}
//! --------------------------------------


