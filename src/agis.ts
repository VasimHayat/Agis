

class AgisLibrary {
    public elements: (NodeListOf<HTMLElement> | null);

    public element: (HTMLElement | null);

    private isIdSelector: boolean;

    startsWith(stringVal: string, key: string) {
        return stringVal.substr(0, 1) == key;
    }

    private isId(selector: string) {
        return this.startsWith(selector, "#");
    }


    init = (selector: string) => {
        this.isIdSelector = this.isId(selector);
        if (this.isIdSelector) {
            selector = selector.substr(1, selector.length);
            this.element = document.getElementById(selector);
        } else {
            this.elements = document.querySelectorAll(selector);
        }
        return this;
    }

    addClass = (classList: string) => {
        if (this.isIdSelector) {
            this.element.classList.add(classList);
        } else {
            this.elements.forEach((ele) => {
                ele.classList.add(classList);
            })
        }


        return this;
    }
    removeClass = (classList: string) => {
        if (this.isIdSelector) {
            this.element.classList.remove(classList);
        } else {
            this.elements.forEach((ele) => {
                ele.classList.remove(classList);
            })
        }

        return this;
    }
    hasClass = (className: string) => {
        if (this.isIdSelector) {
            return this.element.classList.contains(className);
        } else {
            const nodeLen = this.elements.length;
            if (nodeLen == 0) { return false }
            for (let i = 0; i < nodeLen; i++) {
                if (this.elements[i].classList.contains(className)) {
                    return true;
                }
                if (i == nodeLen - 1) {
                    return false;
                }
            }


        }


    }




}

const Agis = new AgisLibrary().init;
