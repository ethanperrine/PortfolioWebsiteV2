let timer = null;

export function slowType(element, text, speed) {
    let index = 0;
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    let tempSpan = document.createElement('span');
    tempSpan.className = 'enlarge';
    tempSpan.innerHTML = "";
    element.appendChild(tempSpan);

    timer = setInterval(() => {
        if (index < text.length) {
            let span = document.createElement('span');
            span.className = 'enlarge smooth-size';
            setTimeout(() => {
                span.className = 'smooth-size';
            }, 100)
            span.innerHTML = text.charAt(index);
            element.appendChild(span);
            index++;
        } else {
            clearInterval(timer);
            timer = null;
        }
    }, speed);
}