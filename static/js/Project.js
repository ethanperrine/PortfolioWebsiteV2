export class Project {
    constructor(title, description, image, link) {
        this.title = title || 'Untitled Project'; 
        this.description = description || 'Description unavailable.'; 
        this.image = image || '/static/media/ProjectImages/image-not-found.png'; 
        this.link = link || '#'; 
    }

    render() {
        try { 
            const projectItem = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h2');
            const description = document.createElement('p');
            const link = document.createElement('a');
    
            projectItem.classList.add('project-item', 'slide-in');
            img.src = this.image;
            img.alt = `${this.title} Image`;
            img.onerror = () => {
                if (img.src !== 'http://localhost:5432/path/to/actual-default-image.jpg') {
                    img.src = 'http://localhost:5432/path/to/actual-default-image.jpg';
                } else {
                    console.error('Default image also failed to load.');
                }
            };
            title.classList.add('project-title'); 
            link.href = this.link;
            link.textContent = this.title;
            description.classList.add('project-description');
            description.textContent = this.description;
            title.appendChild(link);
            projectItem.appendChild(img);
            projectItem.appendChild(title);
            projectItem.appendChild(description);
            return projectItem;
        } catch (error) {
            console.error('Error rendering project:', error);
            const errorItem = document.createElement('div');
            errorItem.textContent = 'Error rendering project';
            return errorItem; 
        }
    }
}

