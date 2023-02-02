

// async functions return promises and resolve with whatever is returned
async function getCharacter() {
    let spinner = document.getElementById("spinner");
    spinner.classList.add("active");

    const host = 'http://localhost:4000';

    const types = ['dog', 'cat', 'bear', 'salamander', 'horse', 'seal', 'squirrel', 'giraffe', 'monkey', 'porcupine', 'mink', 'donkey', 'moose', 'gorilla', 'zebra', 'hyena', 'deer', 'elk', 'bird', 'lizard', 'snake', 'celestial', 'demon', 'angel', 'house', 'clown', 'hippo', 'planet', 'god', 'robot', 'mountain', 'forest', 'wolf', 'spider', 'mongoose', 'kangaroo', 'dinosaur'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // fetch returns promises
    const response = await fetch(`${host}/characters?type=${randomType}`);
    const json = await response.json();

    return json;
}

function renderCharacter(character) {

    const characterImage = character.image;

    let imageContainer = document.getElementById("image");
    let image = new Image();
    image.src = "data:image/jpeg;base64," + characterImage;
    imageContainer.appendChild(image);

    let profile = document.getElementById('profile');
    profile.innerHTML = `
    <h1><b>Name:</b> ${character.name}</h1>
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
    `;

    document.getElementById("spinner").remove();
}

getCharacter().then(character => renderCharacter(character));


