function createBlob(base64Image) {
    // Split the base64 string on the comma
    var commaIndex = base64Image.indexOf(",") + 1;
    var base64 = base64Image.substring(commaIndex);

    // Decode the base64 string
    var rawData = atob(base64);

    // Create an ArrayBuffer with the binary data
    var arrayBuffer = new ArrayBuffer(rawData.length);
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < rawData.length; i++) {
        uint8Array[i] = rawData.charCodeAt(i);
    }

    // Create a Blob with the ArrayBuffer
    var blob = new Blob([uint8Array], { type: "image/png" });
    return blob;
}

function setDownloadImage(character) {
    html2canvas(document.getElementById("card")).then(function (canvas) {
        let imgData = canvas.toDataURL("image/png");
        let image = document.getElementById("shareable-image");
        image.style.display = 'none';
        image.src = imgData;
        return image;
    }).then(image => {
        const downloadLink = document.getElementById("download-link");
        downloadLink.href = image.src;
        downloadLink.download = `${character.name}.png`
    });
}

function copyImage() {
    html2canvas(document.getElementById("card")).then(function (canvas) {
        let imgData = canvas.toDataURL("image/png");
        let image = document.getElementById("shareable-image");
        image.style.display = 'none';
        image.src = imgData;
        return image;
    }).then(image => {
        var blob = createBlob(image.src);
        navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob,
            }),
        ])
            .then(function () {
                console.log("Image copied to the clipboard!");
                document.getElementById("message").innerHTML = `Image copied to clipboard!`;
            })
            .catch(function (error) {
                console.error("Could not copy image: ", error);
                document.getElementById("message").innerHTML = `Could not copy image.`;
            });
    });
}

// async functions return promises and resolve with whatever is returned
async function getCharacter(theme) {
    let imageContainer = document.getElementById("image");
    imageContainer.childNodes.forEach(child => imageContainer.removeChild(child));

    let profileContainer = document.getElementById("profile");
    profileContainer.childNodes.forEach(child => profileContainer.removeChild(child));

    let spinner = document.getElementById("spinner");
    spinner.classList.add("active");
    spinner.style.display = 'inline'

    const host = 'http://localhost:4000/characters/';
    // const host = 'https://4l8lmpmgh9.execute-api.us-east-1.amazonaws.com/character-generator';

    theme = theme || 'Fantasy';
    const types = ['dog', 'cat', 'bear', 'salamander', 'horse', 'seal', 'rabbit', 'squirrel', 'giraffe', 'monkey', 'porcupine', 'mink', 'donkey', 'moose', 'gorilla', 'zebra', 'hyena', 'deer', 'elk', 'bird', 'lizard', 'snake', 'celestial', 'demon', 'angel', 'house', 'clown', 'hippo', 'planet', 'god', 'robot', 'forest', 'wolf', 'spider', 'mongoose', 'kangaroo', 'dinosaur'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // fetch returns promises
    const response = await fetch(`${host}?type=${randomType}&theme=${theme}`);
    const json = await response.json();

    return json;
}

function renderCharacter(character) {

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

    // document.getElementById("spinner").remove();
    document.getElementById("spinner").style.display = 'none';
    setDownloadImage(character);
}

getCharacter("Fantasy").then(character => renderCharacter(character));

function refreshCharacter(theme) {
    console.log(`theme: ${theme}`)

    let imageContainer = document.getElementById("image");
    imageContainer.childNodes.forEach(child => imageContainer.removeChild(child));

    let profileContainer = document.getElementById("profile");
    profileContainer.childNodes.forEach(child => profileContainer.removeChild(child));

    getCharacter(theme).then(character => renderCharacter(character))
}   