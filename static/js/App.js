import { slowType } from './SlowTyper.js';
import { MatrixAnimation } from './MatrixAnimation.js';
import { ThemeManager } from './ThemeManager.js';
import { ProjectManager } from './ProjectManager.js';
import { Project } from './Project.js'; 

class App {
    constructor() {
        this.matrixAnimation = new MatrixAnimation('matrixCanvas');
        this.themeManager = new ThemeManager();
        this.textElement = document.getElementById("text");
        this.projectManager = new ProjectManager('.project-container');
        this.loadInitialProjects();
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('DOMContentLoaded', () => this.domContentLoaded()); 
    }

    domContentLoaded() {
        console.log('DOMContentLoaded event Loaded');
        this.setupWelcomeScreen();
        this.setupThemeSwitcher();
    }

    async fetchProjectData() {
        try {
            const response = await fetch('/static/data/projects.json');
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            const data = await response.text();
            console.log("Raw JSON Data:", data);
            return JSON.parse(data);
        } catch (error) {
            console.error('Error fetching project data:', error);
            return [];
        }
    }

    async loadInitialProjects() {
        const projectData = await this.fetchProjectData(); 
        projectData.forEach(project => {
            this.projectManager.addProject(new Project(project));
        });
        this.projectManager.renderProjects();
    }

    async setupWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
        welcomeScreen.addEventListener('click', async () => {
            welcomeScreen.style.display = 'none';
            this.showTopbar();
            this.animateButtons();
            this.typeWelcomeMessage();
            await this.themeManager.initTheme();
            this.matrixAnimation.start();
            if (this.themeManager.currentThemeData && this.themeManager.currentThemeData.musicPlaylist) {
            this.themeManager.playPlayList(this.themeManager.currentThemeData.musicPlaylist);
            }
            this.projectManager.transitionProjects(); 
        });
        } else {
        console.error("Welcome screen element not found.");
        }
    }

    showTopbar() {
        setTimeout(() => {
        const topbar = document.querySelector(".topbar");
        topbar.style.top = "0";
        }, 100);
    }

    animateButtons() {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
        button.classList.add('slide-out');
        });
    }

    typeWelcomeMessage() {
        slowType(this.textElement, "saucesec.tech", 50);
    }

    setupThemeSwitcher() {
        const changeThemeButton = document.getElementById('change_theme');
        if (changeThemeButton) {
        changeThemeButton.addEventListener('click', () => {
            console.log("Change theme clicked");
            this.themeManager.switchTheme();
        });
        } else {
        console.error("Change theme button not found.");
        }
    }
}

// Usage
const app = new App();
