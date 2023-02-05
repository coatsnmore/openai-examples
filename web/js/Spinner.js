class Spinner {

    activate() {
        let spinner = document.getElementById("spinner");
        spinner.classList.add("active");
        spinner.style.display = 'inline'
    }

    deactivate() {
        document.getElementById("spinner").style.display = 'none';
    }
}

export default Spinner;