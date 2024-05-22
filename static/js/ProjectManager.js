export class ProjectManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    transitionProjects() {
        const oldProjectItems = this.container.querySelectorAll('.project-item');
        oldProjectItems.forEach(item => item.classList.add('slide-out'));
        setTimeout(() => {
        oldProjectItems.forEach(item => item.remove()); 
        this.renderProjects(); 
        }, 500);
    }

    renderProjects() {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';
        this.projects.forEach(project => {
            projectContainer.appendChild(project.render());
        });
    }
}
