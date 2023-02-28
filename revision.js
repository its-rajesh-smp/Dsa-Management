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
    if(document.querySelector('.target_list_container').children.length==0){
        document.querySelector('.nMQ').style.display="block"
    }
}


// Click On Done Button Increase Revision Date By 3
document.querySelector('.target_list_container').addEventListener('click',(e)=>{

    if(e.target.classList.contains('btnDone')){

        if(confirm("Please Confirm First")==true){
            let getProblem=localStorage.getItem(e.target.parentElement.children[0].textContent.toLowerCase().replace(/ /g, ''))

            let deformObject=JSON.parse(getProblem)
            let newQuestionName=deformObject.ProblemName
            
            let date=new Date()
            date.setDate(deformObject.RevisonDate+3)
            deformObject.RevisonDate=date.getDate()
            deformObject.RevisonMonth=date.getMonth()+1
          
            localStorage.setItem(newQuestionName.toLowerCase().replace(/ /g, ''),JSON.stringify(deformObject))

            e.target.parentElement.remove()
            if(document.querySelector('.target_list_container').children.length==0){
                document.querySelector('.nMQ').style.display="block"
            }
        }
    }





})




// Creating New Lists
function createElement(problem,link,type,desc){
    let newElement=document.createElement('div')
    newElement.classList.add('question',"targetQuestion")
    
    let newh4=document.createElement('h4')
    newh4.textContent=problem
    newh4.classList.add("prob")
    newElement.append(newh4)


    let newlink=document.createElement('a')
    newlink.setAttribute('href',link)
    newlink.setAttribute('target',"_blank")
    newlink.classList.add('link')
    newlink.textContent="Link"
    newElement.append(newlink)

    let newtype=document.createElement('p')
    newtype.textContent=type
    if(type=="Easy"){newtype.style.color='Green'}
    if(type=="Medium"){newtype.style.color='#a09a04'}
    if(type=="Hard"){newtype.style.color='Red'}
    newtype.classList.add('type')
    newElement.append(newtype)
    
    let newdesc=document.createElement('p')
    newdesc.textContent=desc
    newdesc.classList.add('desc')
    newElement.append(newdesc)

    let newBtn=document.createElement('button')
    newBtn.textContent="DONE"
    newBtn.classList.add('btnDone')
    newElement.append(newBtn)

    document.querySelector('.target_list_container').append(newElement)

}