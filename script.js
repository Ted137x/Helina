// ===================================
// PLAYLIST
// ===================================

const playlist = [

    {
        id: "song1",
        title: "The Winner Takes It All",
        src: "./songs/The Winner Takes It All   ABBA.m4a"
    },

    {
        id: "song2",
        title: "Song 2",
        src: "./songs/In My Dreams   Gary Moore.m4a"
    },

    {
        id: "song3",
        title: "Song 3",
        src: "./songs/Resimdeki Gözyaşları   Cem Karaca.m4a"
    },

    {
        id: "song4",
        title: "Song 4",
        src: "./songs/Il mondo   Jimmy Fontana.m4a"
    },

    {
        id: "song5",
        title: "Song 5",
        src: "./songs/What A Wonderful World   Louis Armstrong.m4a"
    },

    {
        id: "song6",
        title: "Song 6",
        src: "./songs/Big Iron   Marty Robbins.m4a"
    }

];


// ===================================
// PLAYER VARIABLES
// ===================================

const audio = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");

const buttons = document.querySelectorAll(".image-button");

let currentTrackIndex = null;
let playerState = "stop";


// ===================================
// INITIAL STATE
// ===================================

// No song is selected at the beginning.

audio.removeAttribute("src");
audio.load();

buttons.forEach(button => {
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
});


// ===================================
// PLAYER STATE
// ===================================

function setPlayerState(state) {

    playerState = state;

    playButton.classList.toggle(
        "is-playing",
        state === "play"
    );

    console.log("Player state:", playerState);

}


// ===================================
// SELECT SONG
// ===================================

function selectTrack(index) {

    // Check whether the playlist index exists.
    const track = playlist[index];

    if (!track) {
        console.error("Song not found:", index);
        return;
    }

    // Stop the previous song.
    audio.pause();

    setPlayerState("stop");

    // Update the selected song.
    currentTrackIndex = index;

    // Load the new song.
    audio.src = track.src;
    audio.load();

    // Update button appearance.
    buttons.forEach(button => {

        const buttonIndex = Number(button.dataset.track);

        const isSelected = buttonIndex === index;

        button.classList.toggle("selected", isSelected);

        button.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

    });

    console.log("Selected song:", track.title);

}


// ===================================
// PLAY FUNCTION
// ===================================

async function playMusic() {

    // Make sure a song has been selected.
    if (currentTrackIndex === null) {
        console.warn("Please select a song first.");
        return;
    }

    // Restart only if the song has reached its end.
    if (audio.ended) {
        audio.currentTime = 0;
    }

    try {

        await audio.play();

    }

    catch (error) {

        setPlayerState("stop");

        console.error("Could not play the song:", error);

    }

}


// ===================================
// STOP FUNCTION
// ===================================

function stopMusic() {

    // Pause without resetting the song position.
    audio.pause();

    setPlayerState("stop");

}


// ===================================
// SONG BUTTON EVENTS
// ===================================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const trackIndex = Number(button.dataset.track);

        selectTrack(trackIndex);

    });

});


// ===================================
// PLAY / STOP BUTTON EVENTS
// ===================================

playButton.addEventListener("click", () => {

    if (playerState !== "play") {
        playMusic();
    }

});


stopButton.addEventListener("click", () => {

    stopMusic();

});


// ===================================
// AUDIO EVENTS
// ===================================

audio.addEventListener("play", () => {

    setPlayerState("play");

});


audio.addEventListener("pause", () => {

    setPlayerState("stop");

});


audio.addEventListener("ended", () => {

    setPlayerState("stop");

});


audio.addEventListener("error", () => {

    console.error(
        "Could not load the audio file:",
        audio.src
    );

});


// ===================================
// INITIAL PLAYER STATE
// ===================================

setPlayerState("stop");