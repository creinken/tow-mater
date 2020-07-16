class Page {
    constructor(url, elements = {}) {
        this.url = url
        this.elements = elements
    }

    buildSelf(elements) {
        // elements structured as such
        // ele = {tag: { attr: "attrValue", attr2: "attr2Value"...},
        //        tag2: { attr: "attrValue"...}...}
        // get or create elements needed for page content
        let main = document.getElementById('main-content'),
            container = document.createElement('div');


        // itterate over object of elements
        for (const [key, value] of Object.entries(elements)) {
            // create element
            let newElement = document.createElement(`${key}`)
                // itterate over object of attributes and set them for the current element
                for (const [attr, attrValue] of Object.entries(value)) {
                    switch (attr) {
                        case "class":
                            newElement.classList.add(attrValue);
                            break;
                        case "listener":
                            let type = attrValue.type,
                                cbFunc = attrValue.cbFunc;
                            newElement.addEventListener(type, cbFunc);
                            break;
                        default:
                            newElement.setAttribute(attr, attrValue);

                    }
                }
            container.appendChild(newElement)
        }


        // wipe main's content and load it with this page's content
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
        main.appendChild(container);
    }
}
