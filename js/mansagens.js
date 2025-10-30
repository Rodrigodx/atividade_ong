export function showError(errorBox, msg) {
    errorBox.style.display = "block";
    errorBox.innerHTML = msg;
    setTimeout(() => { errorBox.style.display = "none"; }, 6000);
}

export function showSuccess(errorBox, msg) {
    errorBox.style.display = "block";
    errorBox.classList.remove('form-errors');
    errorBox.classList.add('form-success');
    errorBox.innerHTML = msg;
    setTimeout(() => {
        errorBox.style.display = "none";
        errorBox.classList.remove('form-success');
        errorBox.classList.add('form-errors');
    }, 4000);
}
