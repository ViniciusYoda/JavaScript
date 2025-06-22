function debounce(func, ms) {
    let timeout;
    function debounced(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), ms);
    }
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
}