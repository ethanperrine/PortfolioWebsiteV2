import {ShowProjects, ShowSocials, SlowTyper} from './SlowTyper.js';
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

        this.homeSectionElement = document.getElementById("home-section");
        this.projectsSectionElement = document.getElementById("projects-section");
        this.apiSectionElement = document.getElementById("api-section");
        this.projectsSectionElement.style.display = "none";
        this.apiSectionElement.style.display = "none";

        /**
         * @type {SlowTyper}
         */
        this.slowTyper = null;
        /**
         * @type {ShowSocials}
         */
        this.lastSocials = null;
        /**
         * @type {ShowProjects}
         */
        this.lastShowProjects = null;

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
            // this.typeWelcomeMessage();
            await this.themeManager.initTheme();
            this.openHome();
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
        this.slowTyper?.tempDiv?.remove?.()
        this.lastSocials?.tempDiv?.remove?.();
        // this.lastSlowType = slowType(this.textElement, "saucesec.tech", 150);
        this.slowTyper = new SlowTyper(this.textElement, "saucesec.tech", 150);
        this.lastSocials = new ShowSocials(this.textElement, this.slowTyper.duration, [
            {
                url: "https://t.me/MisterTheMan",
                icon: "https://telegram.org/img/t_logo.png",
                bounds: [50, 50]
            },
            {
                url: "https://discord.com/users/1128131957683933321",
                icon: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/653714c1f22aef3b6921d63d_636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg",
                bounds: [50, 70]
            },
        ], 150)
    }

    showProjects() {
        this.lastShowProjects?.cancelCallback?.()
        this.lastShowProjects?.container?.remove?.();
        this.lastShowProjects = new ShowProjects(this.projectsSectionElement, 300);
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

    isHome() {
        return this.homeSectionElement.style.display === "block"
    }

    openHome() {
        this.slowTyper?.cancelCallback?.()
        this.lastSocials?.cancelCallback?.()
        this.homeSectionElement.style.display = "block";
        this.projectsSectionElement.style.display = "none";
        this.apiSectionElement.style.display = "none";

        this.typeWelcomeMessage()

    }

    openProjects() {
        this.slowTyper?.cancelCallback?.()
        this.lastSocials?.cancelCallback?.()
        this.homeSectionElement.style.display = "none";
        this.projectsSectionElement.style.display = "block";
        this.apiSectionElement.style.display = "none";

        this.showProjects();
    }

    openApi() {
        this.slowTyper?.cancelCallback?.()
        this.lastSocials?.cancelCallback?.()
        this.homeSectionElement.style.display = "none";
        this.projectsSectionElement.style.display = "none";
        this.apiSectionElement.style.display = "block";
    }
}

// Usage
window.app = new App();
