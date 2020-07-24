window.addEventListener('DOMContentLoaded', ()=> {
    const wrapper = document.getElementById('wrapper'),
          input = wrapper.querySelector('.input'),
          fieldForValue = document.querySelector('.field-for-value'),
          fragment = document.createDocumentFragment();

    // Value for input element
    let inputValue;

    // Value viewport for lazy loading
    let zoomScrolling = document.scrollingElement.clientHeight;

    // resulting value scroll
    let endScroll = document.scrollingElement.clientHeight - 238;

    const arrBtn = document.createElement('a');

    // Render DOM span-elements in the DOM tree
    const renderSpan = () => {
        input.addEventListener('input', () => {
            checkInput();
            inputValue = parseInt(input.value);
            for (let i = 0; i < zoomScrolling && i < inputValue; i++) addSpanElem();
            requestAnimationFrame(lazyPushSpan);
        });
    };

    // Generating much span-elements
    const addSpanElem = () => {
            fragment.append(document.createElement('span'));
            eachGenerateValue();
    };

    // The only rendering
    function lazyPushSpan() {
        fieldForValue.append(fragment);
        requestAnimationFrame(lazyPushSpan);
    }

    // Lazy loading
    const scrollDocument = () => {
        window.addEventListener('scroll', () => {
            let calc = inputValue - fieldForValue.childNodes.length;
            if (fieldForValue.scrollHeight - document.scrollingElement.scrollTop === endScroll) {
                for (let i = 0; i < calc && i < zoomScrolling; i++) {
                    addSpanElem();
                }
            }
            requestAnimationFrame(lazyPushSpan);
        });
    };

    // The Show arrow top from a value scrolling > 1000 and remove arrow top from a value < 1000
    const showArrowTop = () => {
        window.addEventListener('scroll', () => {
            if (document.scrollingElement.scrollTop > 1000) {
                addArrowTop();
            } else if (document.scrollingElement.scrollTop < 1000) {
                arrBtn.remove();
                inputFocus();
            }
            console.log(document.scrollingElement.scrollTop)
        });
    };

    // Adding arrow top before the field for value
    const addArrowTop = () => {
        arrBtn.classList.add('arrow-top');
        arrBtn.innerText = '⇑';
        fieldForValue.before(arrBtn);
    };

    // Deleting each span-element if run re render DOM
    const removeSpanElem = () => fieldForValue.childNodes.forEach(item => item.remove());

    // Logic operating generating random value
    const generateRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Create random value in the each span-element
    const eachGenerateValue = () => fragment.childNodes.forEach(item => item.textContent = generateRandomValue(0, 9));

    // Audit the input on a NaN and negative number
    const checkInput = () => input.value = input.value.replace(/\D/, '');

    // Sets the focus on the input
    const inputFocus = () => input.focus();

    // Clear span-elements inside a fragment
    const removeSpans = () => input.onkeydown = () => { for (let i = 0; i < inputValue; i++) removeSpanElem() };

    //Back to top on a click on button
    const backToTop = () => arrBtn.addEventListener('click', () => requestAnimationFrame(() => document.scrollingElement.scrollTop = -1))

    inputFocus();
    renderSpan();
    removeSpans();
    scrollDocument();
    showArrowTop();
    backToTop();
});