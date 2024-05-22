import { MatrixAnimation } from './MatrixAnimation.js';

// MatrixAnimation
let interval = null;
let audio = new Audio();
audio.pause();
export class ThemeManager {

    // TODO: Somehow convert the videos to use the VP8/9 Codec so mozilla can play videos. 
    constructor() {
        this.themes = ["bubblegum", "european", "matrix", "space"];
        this.currentTheme = "matrix";
        this.matrixAnimation = new MatrixAnimation('matrixCanvas');
        this.textElement = document.getElementById("text");
        this.audio = new Audio();
        this.audio.pause();
        this.interval = null;
        this.initTheme()
            .catch(error => {
                console.error(`Error initializing theme: ${error}`);
            });
    }

    switchTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.currentTheme = this.themes[nextIndex];
        localStorage.setItem('currentTheme', this.currentTheme);

        this.loadTheme(this.currentTheme)
            .then(() => {
                console.log("Theme switched successfully");
            })
            .catch(error => {
                console.error(`Error switching theme: ${error}`);
            });
    }

    checkWelcomeScreen() {
        const welcomeScreen = document.getElementById("welcomeScreen");
        if (welcomeScreen && window.getComputedStyle(welcomeScreen).display === 'none') {
            // console.log('Welcome screen exists and is hidden.');
            return true;
        } else {
            // console.log('Welcome screen does not exist or is not hidden.');
            return false;
        }
    }
    
    async readTheme(theme) {
        const themePath = `./static/media/Themes/${theme}.json`;
        try {
            const response = await fetch(themePath);
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                console.error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error reading theme: ${error}`);
        }
    }

    playPlayList(list) {
        if (this.checkWelcomeScreen() == true) {
        if (this.interval != null) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.audio.pause();
        if (list.length === 0) return;

        let idx = 0;
        this.interval = setInterval(() => {
            if (this.audio.paused || this.audio.ended) {
                this.audio.src = `./static/media/Songs/${list[idx]}`;
                this.audio.load();
                let playPromise = this.audio.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log("Now Playing: ", list[idx]);
                    }).catch(error => {
                        console.error("Error playing audio:", error);
                    });
                }

                this.audio.volume = 0.05;
                idx = (idx + 1) % list.length;
            }
        }, 500);
    }
}


    async loadTheme(theme) {
        try {
            
            const data = await this.readTheme(theme);
            if (data) {
                console.log(data);
                this.currentThemeData = data;
                const video = document.getElementById("backgroundVideo");
                const matrixCanvas = document.getElementById("matrixCanvas");
                if ("videoPath" in data) {
                    video.src = data.videoPath;
                    video.load();
                    video.play();
                    video.style.display = "block";
                    matrixCanvas.style.display = "none";
                    this.matrixAnimation.stop();
                } else {
                    video.style.display = "none";
                    matrixCanvas.style.display = "block";
                    this.matrixAnimation.start();
                }
                if ("musicPlaylist" in data) {
                    try {
                        this.playPlayList(data.musicPlaylist);
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    this.audio.pause();
                }

                this.textElement.innerHTML = "";
                // slowType(this.textElement, "saucesec.tech", 150);
                if (app.isHome()) {
                    app.openHome()
                }
            }
        } catch (error) {
            console.error(`Error loading theme: ${error}`);
        }
    }

    async initTheme() {
        const savedTheme = localStorage.getItem('currentTheme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }
        try {
            await this.loadTheme(this.currentTheme);
        } catch (error) {
            console.error(`Error initializing theme: ${error}`);
        }
    }
}