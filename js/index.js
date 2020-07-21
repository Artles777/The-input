window.addEventListener('DOMContentLoaded', ()=> {
    const wrapper = document.getElementById('wrapper'),
          input = wrapper.querySelector('.input'),
          fieldForValue = wrapper.querySelector('.field-for-value'),
          fragment = document.createDocumentFragment();

    let inputValue;

    // Render DOM span-elements in the DOM tree
    const renderSpan = () => {
        input.addEventListener('input', () => {
            checkInput();
            inputValue = parseInt(input.value);

            if (inputValue > 1000) {
                addSpanElemBig();
            } else {
                addSpanElem();
            }

            if (fieldForValue.childNodes.length !== fragment.childNodes.length) {
                removeSpanElem();
            }
            fieldForValue.appendChild(fragment);
        });
    };

    // Generating much span-elements
    const addSpanElem = () => {
        for (let i = 0; i < inputValue; i++) {
            fragment.appendChild(document.createElement('span'));
            eachGenerateValue();
        }
    };

    // Generating very big count span-elements
    const addSpanElemBig = () => {
        console.log('large value');
        if ( inputValue === 0 || inputValue === undefined ) {
            return false;
        } else {
            let y = parseInt(inputValue / inputValue);
            for (let i = 0; i < inputValue; i++) {
                console.log("номер шага =" + i);
                setTimeout(() => {
                    for (let c = 0; c < y; c++) {
                        fragment.appendChild(document.createElement('span'));
                        eachGenerateValue();
                    }
                    console.log('Print!');
                    fieldForValue.appendChild(fragment);
                },i * 300)
            }
        }
    };

    // Deleting each span-element if run re render DOM
    const removeSpanElem = () => document.querySelectorAll('span').forEach(item => item.parentNode.removeChild(item));

    // Logic operating generating random value
    const generateRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Create random value in the each span-element
    const eachGenerateValue = () => fragment.childNodes.forEach(item => item.textContent = generateRandomValue(0, 9));

    // Audit the input on a NaN and negative number
    const checkInput = () => input.value = input.value.replace(/\D/, '');

    renderSpan();
});