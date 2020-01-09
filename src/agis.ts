class AgisLibrary {
    public elements: (NodeListOf<HTMLElement> | HTMLCollectionOf<Element> | Array<any> | Window | null);


    public element: (HTMLElement | null);
    public nodes: Array<any>;
    private isIdSelector: boolean;

    startsWith(stringVal: string, key: string) {
        return stringVal.substr(0, 1) == key;
    }

    private isIdElement(selector: string) {
        return typeof selector == "string" && this.startsWith(selector, "#");
    }
    private isClsElement(selector: string) {
        return typeof selector == "string" && this.startsWith(selector, ".");
    }
    private isNodeElement(selector: any) {
        return selector && selector.nodeName;
    }


    init = (selector: any) => {

        if (!selector) return;
        this.isIdSelector = this.isIdElement(selector);
        if (selector === 'document') {
            return;
            //this.elements = [document];
        } else if (selector === 'window') {
            return;
            // this.elements = [window];
        } else if (this.isIdSelector) {
            selector = selector.substr(1, selector.length);
            this.element = document.getElementById(selector);
        } else if (this.isClsElement(selector)) {
            selector = selector.substr(1, selector.length);
            this.elements = document.getElementsByClassName(selector);
        } else if (this.isNodeElement(selector)) {
            this.elements = [selector];
        } else {
            this.elements = document.querySelectorAll(selector);
        }
        return this;
    }

    each = (obj: any, callback: Function) => {
        const isArr = Array.isArray(obj),
            keys = Object.keys(obj),
            len = keys.length;

        for (let i = 0; i < len; i++) {
            if (callback.call(obj[keys[i]], isArr ? parseInt(keys[i]) : keys[i], obj[keys[i]]) === false) {
                break; // stop if callback returns false
            }
        }
        return obj;
    };

    addClass = (classList: string) => {
        if (this.isIdSelector) {
            this.element.classList.add(classList);
        } else {
            this.each(this.elements, (index: any, ele: HTMLElement) => {
                ele.classList.add(classList);
            })
        }

        return this;
    }
    removeClass = (classList: string) => {
        if (this.isIdSelector) {
            this.element.classList.remove(classList);
        } else {
            this.each(this.elements, (index: any, ele: HTMLElement) => {
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
