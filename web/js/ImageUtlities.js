import html2canvas from 'html2canvas';

class ImageUtilities {

    static createBlob(base64Image) {
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

    setDownloadImage(character) {
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

    copyImage() {
        html2canvas(document.getElementById("card")).then(function (canvas) {
            let imgData = canvas.toDataURL("image/png");
            let image = document.getElementById("shareable-image");
            image.style.display = 'none';
            image.src = imgData;
            return image;
        }).then(image => {
            var blob = ImageUtilities.createBlob(image.src);
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
}

export default ImageUtilities;