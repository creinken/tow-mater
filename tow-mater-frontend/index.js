const htmlTags = ["a", "abbr", "address", "area", "article", "aside",
                    "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br",
                    "button", "canvas", "caption", "cite", "code", "col", "colgroup",
                    "data", "datalist", "dd", "del", "details", "dfn", "dialog",
                    "div", "dl", "dt", "em", "embed", "fieldset", "figure", "footer",
                    "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header",
                    "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins",
                    "kbd", "keygen", "label", "legend", "li", "link", "main", "map",
                    "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript",
                    "object", "ol", "optgroup", "option", "output", "p", "param",
                    "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s",
                    "samp", "script", "section", "select", "small", "source", "span",
                    "strong", "style", "sub", "summary", "sup", "table", "tbody",
                    "td", "template", "textarea", "tfoot", "th", "thead", "time",
                    "title", "tr", "track", "u", "ul", "var", "video", "wbr"]


class Page {
    constructor(url, elements = []) {
        this.url = url
        this.elements = elements
    }

    buildSelf() {
        // elements structured as such
        // ele = [{tag: { attr: "attrValue", attr2: "attr2Value"...},
        //        tag2: { attr: "attrValue", children: [{tag: {attr: "attrValue"}}]}...}]
        // get or create elements needed for page content
        let main = document.getElementById('main-content');

        // itterate over object of elements
        function elementPlacer(elements, parentElement) {
            for (const idx of elements) {
                // create element
                attrCreator(idx, parentElement);

                function attrCreator(obj, element) {
                    for (const [attr, attrValue] of Object.entries(obj)) {
                        if (htmlTags.indexOf(attr) >= true) {
                            console.log(attr);
                            let newElement = document.createElement(attr);
                            element.appendChild(newElement);
                            attrCreator(attrValue, newElement);
                        } else {
                            switch (attr) {
                                case "class":
                                    element.classList.add(attrValue);
                                    break;
                                case "listener":
                                    let type = attrValue.type,
                                        cbFunc = attrValue.cbFunc;
                                    element.addEventListener(type, cbFunc);
                                    break;
                                case "children":
                                    elementPlacer(attrValue, element)
                                    break;
                                case "innerText":
                                    element.innerText = attrValue;
                                    break;
                                default:
                                    element.setAttribute(attr, attrValue);
                            }
                        }
                    }
                }
            }
        }

        // wipe main's content and load it with this page's content
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
        elementPlacer(this.elements, main);
    }
}

const loginPage = new Page("http://localhost:3000/login", [{div: {
                                                                id: "login-div",
                                                                class: "container",
                                                                children: [
                                                                    {ul: {
                                                                        id: "test-ul",
                                                                        class: "test",
                                                                        children: [
                                                                            {li: {
                                                                                class: "test-li",
                                                                                innerText: "list item 1"}
                                                                            },
                                                                            {li: {
                                                                                class: "test-li",
                                                                                innerText: "list item 2"}
                                                                            }
                                                                        ]}
                                                                    }
                                                                ]}
                                                            }]);
