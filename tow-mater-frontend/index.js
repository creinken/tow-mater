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

    fetchURL() {
        let resJson = fetch(this.url)
        .then(function(response) {
            return response.json()
        });

        return resJson;
    }

    buildSelf() {
        // elements structured as such
        // ele = [{tag: { attr: "attrValue", attr2: "attr2Value"...},
        //        tag2: { attr: "attrValue", children: [{tag: {attr: "attrValue"}}]}...}]
        // get or create elements needed for page content
        let main = document.getElementById('main-content');


        // wipe main's content and load it with this page's content
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
        this.elementPlacer(this.elements, main);
    }

    elementPlacer(elements, parentElement) {
        for (const idx of elements) {
            // create element
            this.attrCreator(idx, parentElement);


        }
    }

    attrCreator(obj, element) {
        for (const [attr, attrValue] of Object.entries(obj)) {
            if (htmlTags.indexOf(attr) >= true) {
                let newElement = document.createElement(attr);
                element.appendChild(newElement);
                this.attrCreator(attrValue, newElement);
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
                        this.elementPlacer(attrValue, element)
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

class LogPage extends Page {
    displayLog() {
        let towLog = this.fetchURL(),
            logTable = document.getElementById('tow-log');
        towLog.then((json) => {
            for (const i of json) {
                this.attrCreator({tr:
                                    {class: "row",
                                    children: [
                                        {td:
                                            {innerText: `${i.tow_type}`}
                                        },
                                        {td:
                                            {innerText: `${i.subtype}`}
                                        },
                                        {td:
                                            {innerText: `${i.driver.name}`}
                                        },
                                        {td:
                                            {innerText: `${i.dispatcher.name}`}
                                        }
                                    ]}
                                }, logTable);
            }
        })
    }
}

const loginPage = new Page("http://localhost:3000/login", [{div: {
                                                                id: "login-div",
                                                                class: "container",
                                                                children: [
                                                                    {h2: {
                                                                        innerText: "Please Login Below"}
                                                                    },
                                                                    {form: {
                                                                        id: "login-form",
                                                                        class: "form",
                                                                        action: "http://localhost:3000/login",
                                                                        method: "POST",
                                                                        children: [
                                                                            {label: {
                                                                                for: "user_name",
                                                                                innerText: "Username: "}
                                                                            },
                                                                            {input: {
                                                                                name: "user_name"}
                                                                            },
                                                                            {br: {}
                                                                            },
                                                                            {label: {
                                                                                for: "password",
                                                                                innerText: "Password: "}
                                                                            },
                                                                            {input: {
                                                                                name: "password",
                                                                                type: "password"}
                                                                            },
                                                                            {br: {}
                                                                            },
                                                                            {input: {
                                                                                type: "submit",
                                                                                innerText: "Login"
                                                                            }}
                                                                        ]}
                                                                    }
                                                                ]}
                                                            }]);

const dispatchPage = new LogPage("http://localhost:3000/tows", [{div: {
                                                            id: "dispatch-div",
                                                            class: "container",
                                                            children: [
                                                                {h2: {
                                                                    innerText: "Dispatch Tow Log"}
                                                                },
                                                                {div: {
                                                                    class: "container",
                                                                    children: [
                                                                        {form: {
                                                                            id: "dispatch-form",
                                                                            class: "form",
                                                                            action: "http://localhost:3000/tows",
                                                                            method: "POST",
                                                                            children: [
                                                                                {label: {
                                                                                    for: "tow_type",
                                                                                    innerText: "Type: "}
                                                                                },
                                                                                {input: {
                                                                                    id: "tow_tow_type",
                                                                                    name: "tow[tow_type]"}
                                                                                },
                                                                                {br: {}
                                                                                },
                                                                                {label: {
                                                                                    for: "subtype",
                                                                                    innerText: "Subtype: "}
                                                                                },
                                                                                {input: {
                                                                                    id: "tow_subtype",
                                                                                    name: "tow[subtype]"}
                                                                                },
                                                                                {br: {}
                                                                                },
                                                                                {label: {
                                                                                    for: "tow_driver",
                                                                                    innerText: "Driver: "}
                                                                                },
                                                                                {input: {
                                                                                    id: "tow_driver",
                                                                                    name: "tow[driver]"}
                                                                                },
                                                                                {br: {}
                                                                                },
                                                                                {label: {
                                                                                    for: "tow_dispatcher",
                                                                                    innerText: "Dispatcher: "}
                                                                                },
                                                                                {input: {
                                                                                    id: "tow_dispatcher",
                                                                                    name: "tow[dispatcher]"}
                                                                                },
                                                                                {br: {}
                                                                                },
                                                                                {input: {
                                                                                    type: "submit",
                                                                                    innerText: "Submit"
                                                                                }}
                                                                            ]}
                                                                        },
                                                                        {hr: {}
                                                                        },
                                                                        {table: {
                                                                            id: "log-table",
                                                                            name: "tow log",
                                                                            children: [
                                                                                {thead: {
                                                                                    children: [
                                                                                        {tr: {
                                                                                            class: "row",
                                                                                            children: [
                                                                                                {th: {
                                                                                                    innerText: "type"}
                                                                                                },
                                                                                                {th: {
                                                                                                    innerText: "sub type"}
                                                                                                },
                                                                                                {th: {
                                                                                                    innerText: "driver"}
                                                                                                },
                                                                                                {th: {
                                                                                                    innerText: "dispatcher"}
                                                                                                }
                                                                                            ]}
                                                                                        }
                                                                                    ]
                                                                                }},
                                                                                {tbody: {
                                                                                    id: "tow-log"
                                                                                }}
                                                                            ]}
                                                                        }
                                                                    ]}
                                                                }
                                                            ]}
                                                        }]
                                                    );



document.addEventListener('DOMContentLoaded', function() {
    dispatchPage.buildSelf();
    dispatchPage.displayLog();
});
