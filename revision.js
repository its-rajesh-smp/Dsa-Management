// Add To TargetList
window.addEventListener('load',loadTarget())




function loadTarget(){    

    let questions=Object.keys(localStorage)

    // Getting Todays Date
    let date=new Date()
    let todaysDate=date.getDate()
    let todaysMonth=date.getMonth()+1


    questions.forEach((item)=>{
        let getItem=JSON.parse(localStorage[item])
        let getRevisionDate=getItem.RevisonDate
        let getRevisionMonth=getItem.RevisonMonth
        if(todaysDate==getRevisionDate && todaysMonth==getRevisionMonth){
            console.log("Data Fetched");
            createElement(getItem.ProblemName,getItem.Link,getItem.Type,getItem.Desc)
        }
    })
}


// Click On Done Button Increase Revision Date By 3
document.querySelector('.target_list').addEventListener('click',(e)=>{

    if(e.target.classList.contains('btnDone')){

        if(confirm("Please Confirm First")==true){
            let getProblem=localStorage.getItem(e.target.parentElement.children[0].textContent)

            let deformObject=JSON.parse(getProblem)
            let newQuestionName=deformObject.ProblemName
            
            let date=new Date()
            date.setDate(deformObject.RevisonDate+3)
            deformObject.RevisonDate=date.getDate()
            deformObject.RevisonMonth=date.getMonth()+1
            console.log(deformObject);

            localStorage.setItem(newQuestionName,JSON.stringify(deformObject))

            e.target.parentElement.remove()
        }
    }





})




// Creating New Lists
function createElement(problem,link,type,desc){
    let newElement=document.createElement('div')
    newElement.classList.add('question')
    
    let newh4=document.createElement('h4')
    newh4.textContent=problem
    newElement.append(newh4)


    let newlink=document.createElement('a')
    newlink.setAttribute('href',link)
    newlink.setAttribute('target',"_blank")

    newlink.textContent="LINK"
    newElement.append(newlink)

    let newtype=document.createElement('p')
    newtype.textContent=type
    newElement.append(newtype)
    
    let newdesc=document.createElement('p')
    newdesc.textContent=desc
    newElement.append(newdesc)

    let newBtn=document.createElement('button')
    newBtn.textContent="DONE"
    newBtn.classList.add('btnDone')
    newElement.append(newBtn)

    document.querySelector('.target_list').append(newElement)

}