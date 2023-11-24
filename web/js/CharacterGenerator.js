import Spinner from './Spinner';

class CharacterGenerator {

    constructor(imageUtilities) {
        this.imageUtilities = imageUtilities
        this.spinner = new Spinner();
    }

    // async functions return promises and resolve with whatever is returned
    async getCharacter(theme) {
        this.spinner.activate();

        let imageContainer = document.getElementById("image");
        imageContainer.childNodes.forEach(child => imageContainer.removeChild(child));

        let profileContainer = document.getElementById("profile");
        profileContainer.childNodes.forEach(child => profileContainer.removeChild(child));

        const host = 'http://localhost:8888/characters/';
        // const host = 'https://4l8lmpmgh9.execute-api.us-east-1.amazonaws.com/character-generator';

        theme = theme || 'Fantasy';
        const types = ['dog', 'cat', 'bear', 'salamander', 'horse', 'seal', 'rabbit', 'squirrel', 'giraffe', 'monkey', 'porcupine', 'mink', 'donkey', 'moose', 'gorilla', 'zebra', 'hyena', 'deer', 'elk', 'bird', 'lizard', 'snake', 'celestial', 'demon', 'angel', 'house', 'clown', 'hippo', 'planet', 'god', 'robot', 'forest', 'wolf', 'spider', 'mongoose', 'kangaroo', 'dinosaur'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        // fetch returns promises
        const response = await fetch(`${host}?type=${randomType}&theme=${theme}`);
        const json = await response.json();

        return json;
    }

    renderCharacter(character) {

        const characterImage = character.image;

        // let cardContainer = document.getElementById("card");
        let imageContainer = document.getElementById("image");
        imageContainer.childNodes.forEach(child => imageContainer.removeChild(child));

        let image = new Image();
        image.src = "data:image/jpeg;base64," + characterImage;
        imageContainer.appendChild(image);
        image.className = 'card-img-top';

        let profile = document.getElementById('profile');
        profile.innerHTML = `
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text">
                <div><b>Age:</b> ${character.age}</div>
                <div><b>Alignment:</b> ${character.alignment}</div>
                <div><b>HP:</b> ${character.hp}</div>
                <div><b>Species:</b> ${character.species}</div>
                <div><b>Class:</b> ${character.class}</div>
                <div><b>Home Town:</b> ${character.homeTown}</div>
                <div><b>Favorite Weapon:</b> ${character.favoriteWeapon}</div>
                <div><b>Darkest Fear:</b> ${character.darkestFear}</div>
                <div><b>Hidden Secret:</b> ${character.mostHiddenSecret}</div>
                <div><b>Background:</b> ${character.background}</div>
            </p>
            `;

        this.spinner.deactivate();
        this.imageUtilities.setDownloadImage(character);
    }


    refreshCharacter(theme) {
        console.log(`theme: ${theme}`)

        let imageContainer = document.getElementById("image");
        imageContainer.childNodes.forEach(child => imageContainer.removeChild(child));

        let profileContainer = document.getElementById("profile");
        profileContainer.childNodes.forEach(child => profileContainer.removeChild(child));

        this.getCharacter(theme).then(character => {
            this.renderCharacter(character)
        });
    }

}

export default CharacterGenerator