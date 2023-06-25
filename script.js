const 
    getAudio = document.getElementById("audioScreen"),
    getAudioLists = document.querySelector(".audio-lists");

const
    getPrev = document.getElementById("prev"),
    getPlay = document.getElementById("play"),
    getNext = document.getElementById("next"),
    getStop = document.getElementById("stop");

const
    getProgressCtn = document.getElementById("progressContainer"),
    getProgress = document.getElementById("progress"),
    getVolume = document.getElementById("volumeProgress"),
    getDisplayTime = document.getElementById("displayTime");

const audios = ["sample1", "sample2", "sample3"];

let idx = 0;

audios.forEach(function(audio, index) {

    const newLi = document.createElement("li");
    const newLink = document.createElement("a");
    newLink.href = "javascript:void(0)";
    newLink.appendChild(document.createTextNode(audio));
    newLink.setAttribute("data-index", index);
    newLink.classList.add("audio-links");
    newLi.append(newLink);
    getAudioLists.append(newLi);

    newLink.addEventListener("click", function() {
        idx = +this.dataset["index"];
        document.querySelectorAll(".audio-links").forEach(link => {
            link.classList.remove("active");
        })
        loadAudio(idx);
        getAudio.play();
    });

    loadAudio(idx);
})

function loadAudio(index) {
    getAudio.src = `./source/${audios[index]}.mp3`;
    const getAudioLinks = document.querySelectorAll(".audio-links");
    getAudioLinks.forEach(function(getAudioLink, idx) {
        if (idx === index) {
            getAudioLink.classList.add("active");
        } else {
            getAudioLink.classList.remove("active");
        }
    })
}

function playBtn() {
    getPlay.querySelector("i.fas").classList.remove("fa-play");
    getPlay.querySelector("i.fas").classList.add("fa-pause");
}

function pauseBtn() {
    getPlay.querySelector("i.fas").classList.remove("fa-pause");
    getPlay.querySelector("i.fas").classList.add("fa-play");
}

function playPauseBtn() {

    if (getAudio.paused) getAudio.play();
    else getAudio.pause();

}

function nextBtn() {
    idx++;

    if (idx > audios.length-1) {
        idx = 0;
    }

    loadAudio(idx);
    getAudio.play();
}

function prevBtn() {
    idx--;

    if (idx < 0) {
        idx = audios.length-1;
    }

    loadAudio(idx);
    getAudio.play();
}

function stopBtn() {
    getAudio.currentTime = 0;
    getAudio.pause();
}

function updateProgress(e) {
    
    let {currentTime, duration} = e.target;

    getProgress.style.width = (currentTime / duration) * 100 + "%";

    if (currentTime > 0) {
        const minutes = Math.floor((duration - currentTime) / 60);
        const seconds = Math.floor((duration - currentTime) % 60);
        const minutesText = minutes.toString().padStart(2, "0");
        const secondText = seconds.toString().padStart(2, "0");
        getDisplayTime.innerText = `${minutesText} : ${secondText}`;
    } else {
        getDisplayTime.innerText = "00 : 00";
    }

}

function setAudioProgress(e) {

    const eleWidth = this.clientWidth;
    const eleClickX = e.offsetX;
    const duration = getAudio.duration;
    getAudio.currentTime = (eleClickX / eleWidth) * duration;
    getAudio.play();
}

function setVolume() {
    getAudio.volume = +this.value / 100;
}

getAudio.addEventListener("play", playBtn);
getAudio.addEventListener("pause", pauseBtn);
getPlay.addEventListener("click", playPauseBtn);
getNext.addEventListener('click', nextBtn);
getPrev.addEventListener('click', prevBtn);
getStop.addEventListener("click", stopBtn);

getAudio.addEventListener("timeupdate", updateProgress);
getAudio.addEventListener("ended", nextBtn);

getProgressCtn.addEventListener("click", setAudioProgress);
getVolume.addEventListener("mousemove", setVolume);