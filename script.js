

class Player {
    constructor(flieName){
        // let flieNameCorrectFormat = [];
        // for (let i = 0; i < flieName.length; i++) {
        //     if(flieName[i]==' ')
        //         flieNameCorrectFormat.push('\\ ');
        //     else
        //     flieNameCorrectFormat.push(flieName[i])
            
        // }

        this.audioSrc = './mp3/' + flieName + '.mp3';  // полнейщая дич  потому что что бы все работало надо приводить все к сложному формату названия файла аозможно надо сделать проверку на то как эта строка воспринемается, так же подобные ограничения мтавят под вопрос другие форматы
        this.imgSrc = './mp3/' + flieName + '.png';
        
        this.track = document.createElement('audio');
        this.track.src = this.audioSrc;
        this.track.id = 'Track';
    }

    playTrack(){
        this.track.play();
    }

    stopTrack(){
        this.track.pause();
    }

    createPlayer(){
        // создание контейнера для плеера
        let playrContainer = document.createElement('div');
        playrContainer.id = 'playrContainer';
        playrContainer.style.backgroundImage = `url(${this.imgSrc})`

        //добвление названия песни ( надо разобраться со стилями что бы видно было только половину а потом строка безала показывая остальное)
        let trackHeader = document.createElement('h2');
        trackHeader.id = 'trackHeader';
        trackHeader.innerText = this.audioSrc.slice(6,-4);  // очередной костыль который нужен что бы убрать то что добавляли к названию файлов что бы пути нашлись
       
        
        // Создание кнопок плей и пауза 
        let playButton = document.createElement('button');
        playButton.innerText = 'Play';
        let stopButton = document.createElement('button');
        stopButton.innerText = 'Pause';

        playButton.addEventListener('click',()=>{
            this.playTrack()
        });
        stopButton.addEventListener('click',()=>{
            this.stopTrack()
        });


        // Добавление полосы отследивания длительности трека
        let trackLine = document.createElement('div');
        let filledTrackLine = document.createElement('div');
        trackLine.id = 'trackLine';
        filledTrackLine.id = 'filledTrackLine';
        trackLine.append(filledTrackLine);

        //Добавим цыфры что бы показывалось какое то время
        let currTimeElement = document.createElement('div');
        let durationElement = document.createElement('div');
        // currTimeElement.innerText = '00:00'; 
        // durationElement.innerText = '00:00';  // Баг в этом месте при загрузке позазывает NAN___________________________________

        //Лисенер что бы показывать время проигрывания трека
        this.track.addEventListener('timeupdate',()=>{
            filledTrackLine.style.width = Math.floor(this.track.currentTime)/Math.floor(this.track.duration)*100 + '%';
            currTimeElement.innerText = timeToRightStr(this.track.currentTime);
            durationElement.innerText = timeToRightStr(this.track.duration-this.track.currentTime);
        })

        //Лисенер можно было кликнув на шкале прогресса трека премотать туда
        trackLine.addEventListener('click',(e)=>{
            const styles = getComputedStyle(trackLine);
            let num = Math.round(Number(styles.marginLeft.substring(0,styles.marginLeft.length-2)));
            let width1 = Math.round(Number(styles.width.substring(0,styles.width.length-2)));
            let x=e.pageX - num;
            let numres = Math.floor(x/width1*this.track.duration);
            this.track.currentTime = numres;
        });

        //Регулировка громкости 
        let volumeLine = document.createElement('div');
        volumeLine.id = 'volumeLine';
        let filledVolumeLine = document.createElement('div');
        filledVolumeLine.id = 'filledVolumeLine';

        volumeLine.addEventListener('click',(e)=>{
            const styles = getComputedStyle(volumeLine);
            let num = Math.round(Number(styles.marginLeft.substring(0,styles.marginLeft.length-2)));
            let width1 = Math.round(Number(styles.width.substring(0,styles.width.length-2)));
            let x = e.pageX - num;
            filledVolumeLine.style.width = `${x}px`;
            let numres = x/width1;
            this.track.volume = numres;
        });

        //Добавление кнопки Mute (надо подумать как сделать так что бы при повторном клике она возвращалм громкость туда же где была..)
        let muteButton = document.createElement('button');
        muteButton.innerText = 'Mute';

        //Баги с громкостью и ошибки в консоле
        muteButton.addEventListener('click',()=>{
            this.track.volume = 0;
            filledVolumeLine.style.width = `0px`;
        })

        // сборка в DOM дерево всех елементов
        playrContainer.append(this.track);
        playrContainer.append(trackHeader);

        playrContainer.append(trackLine);
        trackLine.before(currTimeElement);
        currTimeElement.after(durationElement);

        playrContainer.append(playButton);
        playrContainer.append(stopButton);

        playrContainer.append(volumeLine);
        volumeLine.append(filledVolumeLine);

        playrContainer.append(muteButton);

        // document.body.append(playrContainer);
        document.getElementById('main').append(playrContainer);

    }

}


function timeToRightStr(num){
    let str =''
    if(Math.floor(num/60)<10){
        str=`0${Math.floor(num/60)}:`
    }else{
        str=Math.floor(num/60)+':'
    }
    if(Math.floor(num%60)<10){
        str+=`0${Math.floor(num%60)}`
    }else{
        str+=`${Math.floor(num%60)}`
    }
    return str
}


document.addEventListener('DOMContentLoaded',()=>{
    let audioTest = new Player("Instasamka\ -\ На\ Титанике\ \(feat.\ Лолита\)");
    audioTest.createPlayer();
})

