const container = document.querySelector(".container");
const music_image = document.querySelector("#music_image");
const audio = document.querySelector("#audio");
const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const duration = document.querySelector("#duration");
const current_time = document.querySelector("#current_time");
const progress_bar = document.querySelector("#progress_bar");
const volume = document.querySelector("#volume");
const volume_bar = document.querySelector("#volume_bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(music_list);

window.addEventListener("load",() => {
    let music = player.get_music();
    display_music(music);
    display_music_list(player.music_list);
    is_playing_now();
})

const display_music = (music) => {
    title.innerHTML = music.get_name();
    singer.innerHTML = music.singer;
    music_image.src = "img/" + music.image;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click",() => {
    const is_music_playing = container.classList.contains("playing");
    is_music_playing ? pause_music() : play_music();
})

prev.addEventListener("click",() => {
    prev_music();
})




next.addEventListener("click",() => {
    next_music();
})


const prev_music = () => {
    player.prev();
    let music = player.get_music();
    display_music(music);
    play_music();
    is_playing_now();
}

const next_music = () =>{
    player.next();
    let music = player.get_music();
    display_music(music);
    play_music();
    is_playing_now();
}

const pause_music = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const play_music = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const calculate_time = (total_second) => {
    const minute = Math.floor(total_second / 60);
    const second = Math.floor(total_second % 60);

    const updated_second = second < 10 ? `0${second}` : `${second}`;

    const result = `${minute}:${updated_second}`;

    return result;
}

const display_music_list = (list) => {
    for (let i = 0; i < list.length; i++) {
        let li_tag = `
        <li li-index='${i}' onclick="selected_music(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].get_name()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
        `;
        ul.insertAdjacentHTML("beforeend",li_tag);

        let li_audio_duration = ul.querySelector(`#music-${i}`);
        let li_audio_tag = ul.querySelector(`.music-${i}`);

        li_audio_tag.addEventListener("loadeddata", () => {
            li_audio_duration.innerText = calculate_time(li_audio_tag.duration);
        })

    }
}

const selected_music = (li) => {
    player.index = li.getAttribute("li-index");
    display_music(player.get_music());
    play_music();
    is_playing_now();
}

const is_playing_now = () => {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}


audio.addEventListener("loadedmetadata",() => {
    duration.textContent = calculate_time(audio.duration);
    progress_bar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate",() => {
    progress_bar.value = Math.floor(audio.currentTime);
    current_time.textContent = calculate_time(progress_bar.value);
});

progress_bar.addEventListener("input", () => {
    current_time.textContent = calculate_time(progress_bar.value);
    audio.currentTime = progress_bar.value;
})


let muteState = "not_muted";
volume.addEventListener("click", () => {
    if (muteState == "not_muted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volume_bar.value = 0;
    }
    else {
        audio.muted = false;
        muteState = "not_muted";
        volume.classList = "fa-solid fa-volume-high";
        volume_bar.value = 100;
    }
});


volume_bar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;

    if (value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    }
    else {
        audio.muted = false;
        muteState = "not_muted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

audio.addEventListener("ended", () => {
    next_music();
});