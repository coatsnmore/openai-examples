import '../styles/styles.scss'
// import * as bootstrap from 'bootstrap'

import ImageUtilities from './ImageUtlities';
import CharacterGenerator from './CharacterGenerator';

let imageUtilities = new ImageUtilities();
let generator = new CharacterGenerator(imageUtilities);

async function setup() {
    let copyButtonElement = document.getElementById("copyButton");
    copyButtonElement.addEventListener('click', imageUtilities.copyImage);

    let navElements = document.getElementsByClassName('nav-link');
    Array.from(navElements).forEach(navLink => {
        navLink.addEventListener('click', function () {
            generator.refreshCharacter(navLink.textContent)
        })
    });
}

setup().then(generator.getCharacter("Fantasy").then(character => generator.renderCharacter(character)));

