// HELPERS
function useState(args) {
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    const { getter, setter, initialValue } = args

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

// GET PARENT AND ENDPOINT
const parent = document.querySelector('[async-endpoint]')
const endpoint = parent.getAttribute('async-endpoint')
const isDemo = parent.hasAttribute('is-demo')

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
    getter: () => parseInt(parent.getAttribute('async-page-count'),10),
    setter: value =>  parent.setAttribute('async-page-count', value),
    initialValue: 1
})

// FILTERS
function getFilterArray() {
    const filterSelector = parent.getAttribute('filter-selector')
    const filterList = document.querySelectorAll(filterSelector)
   return [...filterList]
}
function getActiveFilters() {
    function isChecked(checkbox) {
        return checkbox.checked
    }
    function getName(element) {
        return element.name
    }
    return  getFilterArray().filter(isChecked).map(getName)
}
function initFilters(makeRequest) {
    try {
        function setDelay(callback, t) {
            let hasChanged = false
            let timerId = null
        
            function newTimer(fn) {
                hasChanged = true
                timerId = setTimeout( () => {
                    hasChanged = false
                    fn()
                },t)
            }
            function start(fn) {
                newTimer(fn)
            }
            function restart(fn) {
                clearTimeout(timerId)
                newTimer(fn)
            }
            function update(fn = callback) {
                hasChanged ? restart(fn) : start(fn)
            }
            return update
        }

        function handleChange() {
            setPage(1)
            setPageCount(1)
            makeRequest(getPage(), true)
        }
        
        const handleChangeWithDelay = setDelay(handleChange, 1000)

        function initFilterInput(element) {
            element.addEventListener('change',() => handleChangeWithDelay())
        }

        getFilterArray().forEach(initFilterInput)
    }
    catch (err) {
        console.error(err)
    }
}

// INIT PAGE CONTROLS
const prev = document.querySelector('[async-prev]')
const next = document.querySelector('[async-next]')
const loadMore = document.querySelector('[async-more]')

async function handleRequest(nextPage, clearEntries = false) {

    function hydrateTemplate(dataFields) {
        const templateSelector = parent.getAttribute('template-selector')
        const clone = document.querySelector(templateSelector).cloneNode(true)
        const newNode = parent.appendChild(clone)
        newNode.removeAttribute('hidden')
        newNode.setAttribute('template-clone', true)
        dataFields.forEach(field => {
            const { selector, type, value, attribute } = field
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

    function updateButtonDisability(page, pageCount) {
        if (prev && next) {
            prev.disabled = (page <= 1)
            next.disabled = (page >= pageCount)
        }
        if (loadMore) {
            loadMore.disabled = (page === pageCount)
        }
    }

    function deleteClones() {
        const templateClones = document.querySelectorAll('[template-clone]')
        if (templateClones && templateClones.length) {
            const cloneArray = [...templateClones]
            cloneArray.forEach(child => parent.removeChild(child))
        }
    }

    try {
        setLoading(true)

        // FETCH DATA
        const url = `${endpoint}?page=${nextPage}${["",...getActiveFilters()].join('&tag=')}`
        const tempApiTarget = document.querySelector('[temp-api-target]')
        tempApiTarget.innerText = url

        const response = await fetch(url)
        const json = await response.json()

        // UNPACK FIRST ITEM IF ARRAY, OR OBJECT
        const { pageCount, page, content } = Array.isArray(json) ? json[0] : json

        // UPDATE STATE
        updateButtonDisability(page, pageCount)
        setPage(page)
        setPageCount(page)
        // UPDATE DOM
        clearEntries && deleteClones()
        content.forEach(hydrateTemplate)
        setLoading(false)
    } catch (err) {
        console.error(err)
        setLoading(false)
    }  

    
}

// pass handleRequest as callback to filter controls
initFilters(handleRequest)

// INIT PAGING CONTROLS
if (prev && next) {
    function handlePrev() {
        const prevPage = getPage() - 1
        handleRequest(prevPage, true)
    }
    function handleNext() {
        const nextPage = getPage() + 1
        handleRequest(nextPage, true)
    }

    // INITIAL LOAD
    handleNext()

    // EVENT LISTENERS
    prev.addEventListener('click', handlePrev)
    next.addEventListener('click', handleNext)

} else if (loadMore) {
    function handleMore() {
        const nextPage = getPage() + 1
        handleRequest(nextPage)
    }

    // INITIAL LOAD
    handleMore()

    // EVENT LISTENER
    loadMore.addEventListener('click', handleMore)
}



