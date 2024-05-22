export class SlowTyper {
    constructor(element, text, speed) {
        let index = 0;

        let tempDiv = document.createElement('div');
        element.appendChild(tempDiv);

        const cancelCallback = [false];

        let timer = setInterval(() => {
            if (index < text.length && !cancelCallback[0]) {
                let span = document.createElement('span');
                span.className = 'enlarge smooth-size';
                setTimeout(() => {
                    span.className = 'smooth-size';
                }, 100);
                span.innerHTML = text.charAt(index);
                tempDiv.appendChild(span);
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        this.tempDiv = tempDiv;
        this.cancelCallback = () => {cancelCallback[0] = true};
        this.duration = text.length * speed
    }
}

export class ShowSocials {
    constructor(element, delay, socials, speed) {
        let index = 0;

        let tempDiv = document.createElement('div');
        tempDiv.classList.add("flex-center", "offset-v-50")
        element.appendChild(tempDiv);

        const cancelCallback = [false];

        let bbBottom = tempDiv.getBoundingClientRect().bottom;
        let pageBottom = window.innerHeight;
        let offset = pageBottom - bbBottom;

        setTimeout(() => {
            let timer = setInterval(() => {
                if (index < socials.length && !cancelCallback[0]) {
                    let a = document.createElement("a");
                    a.className = 'enlarge smooth-size';
                    a.target = "_blank";
                    setTimeout(() => {
                        a.className = 'smooth-size';
                    }, 100);
                    a.href = socials[index].url;
                    a.style.position = 'relative';
                    a.style.top = `${offset}px`;
                    a.style.opacity = '0';
                    a.classList.add("float-up");
                    setTimeout(() => {
                        a.style.top = '0';
                        a.style.opacity = '1';
                    }, 100)
                    // a.style.bottom = '0';


                    let img = document.createElement('img');
                    img.src = socials[index].icon;
                    img.width = socials[index].bounds[0]
                    img.height = socials[index].bounds[1]
                    a.appendChild(img);

                    tempDiv.appendChild(a)
                    index++;
                }
                else {
                    clearInterval(timer);
                }
            }, speed);
        }, delay)

        this.tempDiv = tempDiv;
        this.cancelCallback = () => {cancelCallback[0] = true};
    }
}

export class ShowProjects {
    /**
     *
     * @param element {HTMLDivElement}
     * @param speed {Number}
     */
    constructor(element, speed) {
        const cancelCallback = [false];

        element.classList.add("no-bars");

        const container = document.createElement("div");
        element.appendChild(container);

        fetch("static/data/projects.json").then(r => r.json()).then(projects => {
            // description, image, link, title

            let index = 0;

            let timer = setInterval(() => {
                if (index < projects.length && !cancelCallback[0]) {
                    const p = projects[index];

                    const el = this.createElement(p);
                    container.appendChild(el)

                    let bbBottom = el.getBoundingClientRect().top;
                    let pageBottom = window.innerHeight;
                    let offset = pageBottom - bbBottom;

                    el.style.top = `${offset}px`
                    el.style.opacity = "0"
                    setTimeout(() => {
                        el.classList.add("float-up")
                        setTimeout(() => {
                            el.style.top = "0"
                            el.style.opacity = "1"
                        }, 100)
                    }, 10)

                    index++;
                }
                else {
                    clearInterval(timer);
                }
            }, speed);

            setTimeout(() => {
                element.classList.remove("no-bars")
            }, (projects.length * speed)+600)
        }).catch(e => {
            console.log(e)
            element.innerText = "Error loading projects!";
        });

        this.cancelCallback = () => {cancelCallback[0] = true};
        this.container = container;
    }

    createElement(project) {
        const title = project.title;
        const link = project.link;
        const image = project.image;
        const description = project.description;

        const container = document.createElement('div');
        container.classList.add("project-container")

        const linkEl = document.createElement('a');
        linkEl.href = link;
        linkEl.target = "_blank";
        linkEl.classList.add("full-height")

        const imgWrap = document.createElement("div");
        imgWrap.classList.add("project-image-wrap");

        const imgEl = document.createElement('img');
        imgEl.src = image;
        imgEl.classList.add("project-image")

        imgWrap.appendChild(imgEl);

        const titleEl = document.createElement("h1");
        titleEl.textContent = title;

        const descriptionEl = document.createElement("p");
        descriptionEl.textContent = description;

        const splitterEl = document.createElement("div");
        splitterEl.classList.add("splitter")

        linkEl.appendChild(imgWrap);
        linkEl.appendChild(titleEl);
        linkEl.appendChild(splitterEl);
        linkEl.appendChild(descriptionEl);

        container.appendChild(linkEl);

        return container;
    }
}