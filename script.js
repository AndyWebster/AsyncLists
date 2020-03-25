const pageOneData = {
    pageCount: 2,
    page: 1,
    content: [
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?dogs'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?pidgeon'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?puffin'
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
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?bats'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?fruit'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?platypus'
            },
        ],
        [
            {
                selector: '[item-title]',
                type: 'innerHTML',
                value: 'An item'
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
                value: 'https://source.unsplash.com/random/400x200?pinto'
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
const endpoint = parent.getAttribute('async-endpoint')
const templateSelector = parent.getAttribute('template-selector')

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
    const clone = document.querySelector(templateSelector).cloneNode(true)
    const newNode = parent.appendChild(clone)
    newNode.removeAttribute('hidden')
    newNode.setAttribute('template-clone', true)
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



const prev = document.querySelector('[async-prev]')
const next = document.querySelector('[async-next]')
const loadMore = document.querySelector('[async-more]')
function checkButtonDisability(page, pageCount) {
    if (prev && next) {
        prev.disabled = (page <= 1)
        next.disabled = (page >= pageCount)
    }
    if (loadMore) {
        loadMore.disabled = (page === pageCount)
    }
}

async function handleRequest(nextPage, clearEntries = false) {
    try {
        setLoading(true)

        // FETCH RESPONSE
        const response = await getData(nextPage)
        const { pageCount, page, content } = response

        // UPDATE STATE
        checkButtonDisability(page, pageCount)
        setPage(page)
        setPageCount(pageCount)
        

        // UPDATE DOM
        if (clearEntries) {
            parent.innerHTML = ""
        }
        content.forEach(cloneAndFill)
        setLoading(false)
    } catch (err) {
        console.error(err)
        setLoading(false)
    }  

    
}

if (prev && next) {

    function handlePrev() {
        const prevPage = getPage() - 1
        handleRequest(prevPage, true)
    }

    function handleNext() {
        const nextPage = getPage() + 1
        handleRequest(nextPage, true)
    }

    handleNext()
    prev.addEventListener('click', handlePrev)
    next.addEventListener('click', handleNext)

} else if (loadMore) {

    function handleMore() {
        const nextPage = getPage() + 1
        handleRequest(nextPage)
    }

    handleMore()
    loadMore.addEventListener('click', handleMore)
    
}



