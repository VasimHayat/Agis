class AgisLibrary {
    private _element: (HTMLElement | null);

    addClass = (classList: string) => {
        this._element.classList.add(classList);
        return this;
    }
    removeClass = (classList: string) => {
        this._element.classList.remove(classList);
        return this;
    }

    init = (id: string) => {
        this._element = document.getElementById(id);
        return this;
    }


}

const Agis = new AgisLibrary().init;
