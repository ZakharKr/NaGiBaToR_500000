let header = document.getElementById('headTest');
    header.style.transform = 'scale(2.2);'
header.addEventListener('mouseover',()=>{
    header.style.color = 'green';
    header.style.textShadow = '7px 11px blue';
})

header.addEventListener('mouseleave',()=>{
    header.style.color = 'red';
    header.style.textShadow = '7px 11px pink';
})