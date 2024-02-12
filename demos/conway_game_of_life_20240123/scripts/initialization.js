function initialization(startFunction) {
    let isListenerAdded = false;

    function afterDOMContentLoaded() {
        if (isListenerAdded) {
            document.removeEventListener('DOMContentLoaded', afterDOMContentLoaded)
            isListenerAdded = false;
        }
        startFunction();
    }

    if (document.readyState !== 'loading') {
        afterDOMContentLoaded();
    } else {
        isListenerAdded = true;
        document.addEventListener('DOMContentLoaded', afterDOMContentLoaded)
    }
}