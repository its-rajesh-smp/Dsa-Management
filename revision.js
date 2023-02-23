







// Add To TargetList
window.addEventListener('load',loadTarget())




function loadTarget(){
    

    let questions=Object.keys(localStorage)

    let date=new Date()
    let todaysDate=date.getDate()
    let todaysMonth=date.getMonth()+1

    console.log(todaysDate +" Today " +todaysMonth);

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



function createElement(problem,link,type,desc){
    let newElement=document.createElement('div')
    newElement.classList.add('question')
    
    let newh4=document.createElement('h4')
    newh4.textContent=problem
    newElement.append(newh4)


    let newlink=document.createElement('a')
    newlink.setAttribute('href',link)
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
    newElement.append(newBtn)

    document.querySelector('.target_list').append(newElement)

}