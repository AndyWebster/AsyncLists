const pageOneData = {
    pageCount: 2,
    page: 1,
    content: [
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'First item'
            },
            {
                selector: '[item-copy]',
                type: 'innerHTML',
                value: 'With some copy text'
            },
            {
                selector: '[item-img-src]',
                type: 'attribute',
                attribute: 'src',
                value: 'https://source.unsplash.com/random/400x200?cats'
            },
            {
                selector: '[item-img-alt]',
                type: 'attribute',
                attribute: 'alt',
                value: 'A random image'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'Second item'
            },
            {
                selector: '[item-copy]',
                type: 'innerHTML',
                value: 'With some copy text'
            },
            {
                selector: '[item-img-src]',
                type: 'attribute',
                attribute: 'src',
                value: 'https://source.unsplash.com/random/400x200?fish'
            },
            {
                selector: '[item-img-alt]',
                type: 'attribute',
                attribute: 'alt',
                value: 'A random image'
            },
        ],
    ]
}
const pageTwoData = {
    pageCount: 2,
    page: 2,
    content: [
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'Third item'
            },
            {
                selector: '[item-copy]',
                type: 'innerHTML',
                value: 'With some copy text'
            },
            {
                selector: '[item-img-src]',
                type: 'attribute',
                attribute: 'src',
                value: 'https://source.unsplash.com/random/400x200?birds'
            },
            {
                selector: '[item-img-alt]',
                type: 'attribute',
                attribute: 'alt',
                value: 'A random image'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'Last item'
            },
            {
                selector: '[item-copy]',
                type: 'innerHTML',
                value: 'With some copy text'
            },
            {
                selector: '[item-img-src]',
                type: 'attribute',
                attribute: 'src',
                value: 'https://source.unsplash.com/random/400x200?lizards'
            },
            {
                selector: '[item-img-alt]',
                type: 'attribute',
                attribute: 'alt',
                value: 'A random image'
            },
        ],
    ]
}

async function getData(page = 1) {
    function sendResponse() {
        if (page === 1) {
            return pageOneData
        }
        if (page === 2) {
            return pageTwoData
        }
    }
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(sendResponse());
        }, 1000);
    });

}

// Get dom data
const parent = document.querySelector('[async-endpoint]')
const endpoint = parent.getAttribute('[async-endpoint]')
const loadMore = document.querySelector('[async-load-more]')
const childSelector = parent.getAttribute('[child-template-selector]')

// DEFINE STATE MANAGEMENT
function useState(args) {
    const { getter, setter, initialValue } = args
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    function setState(fn) {
        const prev = getter()
        const next = isFunction(fn) ? fn(prev) : fn
        setter(next)
    }
    setState(initialValue)
    return [
        getter,
        setState
    ]
}

// INIT STATE MANAGEMENT
const [ getLoading, setLoading ] = useState({
    getter: () => parent.getAttribute('async-loading'),
    setter: value => parent.setAttribute('async-loading', value),
    initialValue: false
})
const [ getPage, setPage ] = useState({
    getter: () => parseInt(parent.getAttribute('async-page'),10),
    setter: value =>  parent.setAttribute('async-page', value),
    initialValue: 0
})
const [ getPageCount, setPageCount ] = useState({
    getter: () => parent.getAttribute('async-page-total'),
    setter: value =>  parent.setAttribute('async-page-total', value),
    initialValue: 1
})

function cloneAndFill(item) {
    const clone = parent.querySelector('[item-template]').cloneNode(true)
    const newNode = parent.appendChild(clone)
    newNode.removeAttribute('hidden')

    item.forEach(property => {
        const { selector, type, value, attribute } = property
        const target = newNode.querySelector(selector)

        // Handle different types of data
        if (type === 'innerHTML') {
            target.innerHTML = value
        }
        if (type === 'attribute') {
            target.setAttribute(attribute, value)
        }
    })
}

async function handleNext() {
    setLoading(true)
    const nextPage = getPage() + 1

    try {
        // Async part
        const response = await getData(nextPage)

        // Handle Response
        const { pageCount, page, content } = response
        setPage(page)
        setPageCount(pageCount)
        setLoading(false)

        if (page === pageCount) {
            loadMore.disabled = true
        }
        content.forEach(cloneAndFill)
    } catch (err) {
        console.error(err)
    }

    
}
handleNext()
loadMore.addEventListener('click', handleNext)


