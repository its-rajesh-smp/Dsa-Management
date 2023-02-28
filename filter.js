document.querySelector('.searchBar_inp').addEventListener('keyup',(e)=>{
    // console.log(document.querySelector('.searchBar_inp').value);

    let value=document.querySelector('.searchBar_inp').value.toLowerCase()
    let questionArray=document.querySelectorAll('.question')
    questionArray.forEach((item)=>{
        if(item.children[0].textContent.toLowerCase().includes(value) ){
            console.log(item.children[0]);
            item.style.display="block"
        }
        else{
            item.style.display="none"
        }
    })
})