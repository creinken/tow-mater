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
        let main = document.getElementById('main-content')
        let container = document.createElement('div')

        // set element attributes


        // add listeners to elements


        // add elements to parents


        // wipe main's content and load it with this page's content
        main.innerHTML = "";
        main.appendChild(container);
    }
}
