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

let track = document.getElementById('Track');

function playTrack(){
    track.play()
}
function stopTrack(){
    track.pause()
}

let currTime = Math.floor(track.currentTime).toString(); 
let duration = Math.floor(track.duration).toString();


let polz=document.getElementsByClassName('filledTrackLine')[0];

track.addEventListener('timeupdate',()=>{
    polz.style.width = Math.floor(track.currentTime)/Math.floor(track.duration)*100 + '%';
})

 let trackLine=document.getElementsByClassName('trackLine')[0];

 trackLine.addEventListener('click',(e)=>{
    const styles = getComputedStyle(trackLine);
    let num = Math.round(Number(styles.marginLeft.substring(0,styles.marginLeft.length-2)));
    let width1 = Math.round(Number(styles.width.substring(0,styles.width.length-2)));
    let x=e.pageX -num;
    let numres = Math.floor(x/width1*track.duration);
    track.currentTime = numres;

 });


 let volumeLine=document.getElementsByClassName('volumeLine')[0];
 volumeLine.addEventListener('click',(e)=>{
    const styles = getComputedStyle(volumeLine);
    let num = Math.round(Number(styles.marginLeft.substring(0,styles.marginLeft.length-2)));
    let width1 = Math.round(Number(styles.width.substring(0,styles.width.length-2)));
    let x=e.pageX - num;
    console.log(x)
    document.getElementById('filledVolumeLine').style.width = `${x}px`
    let numres = x/width1;
    track.volume = numres;

 });



document.getElementById('mute').addEventListener('click',()=>{
    track.volume = 0;
})

document.getElementById('halfmute').addEventListener('click',()=>{
    track.volume = 0.5;
})
document.getElementById('loud').addEventListener('click',()=>{
    track.volume = 1;
})
