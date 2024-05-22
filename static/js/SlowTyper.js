// let timer = null;

export function slowType(element, text, speed) {
    let index = 0;
    // if (timer != null) {
    //     clearInterval(timer);
    //     timer = null;
    // }
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

    return [tempDiv, cancelCallback, text.length * speed]
}

/**
 *
 * @param element
 * @param delay
 * @param socials {[{url: string, icon: string, bounds: [Number]}]}
 * @param speed
 * @returns {(HTMLDivElement|boolean[])[]}
 */
export function showSocials(element, delay, socials, speed) {
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

    return [tempDiv, cancelCallback];
}