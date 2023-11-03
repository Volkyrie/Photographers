//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    // Récupération de la structure depuis le fichier JSON
    const photographers = await fetch("/data/photographers.json").then(photographers => photographers.json());
    // et bien retourner le tableau photographers seulement une fois récupéré
    return photographers
}

async function getMedia() {
    // Récupération de la structure depuis le fichier JSON
    const media = await fetch("/data/photographers.json").then(media => media.json());
    // et bien retourner le tableau media seulement une fois récupéré
    return media
}

async function displayMedia(photographers, media) {

    // DOM Elements
    const photographerProfile = document.querySelector(".photograph-header");
    const photographerMediaSection = document.querySelector(".media_section");
    const name = document.querySelector(".name");
    const priceArea = document.querySelector(".price-area");

    // Get the photographer's ID
    let getID = new URL(document.location).searchParams;
    let id = getID.get("id");
    
    // Get photographer's media and likes
    let initValue = 0;
    const mediaFilter = media.filter(item => item.photographerId == id);
    const photographerFilter = photographers.filter(item => item.id == id);
    const allLikes = mediaFilter.map(item => (item.likes));
    const dailyPrice = photographerFilter.map(item => (item.price));
    const totLikes = allLikes.reduce((totValue, nextValue) => totValue + nextValue, initValue);
    const finalPrice = dailyPrice.reduce((totValue, nextValue) => totValue + nextValue, initValue);


    // Priniting the photographer's profile
    photographers.forEach((photographer) => {
        if (photographer.id == id) {
            name.innerText = photographer.name;
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographerProfile.appendChild(userCardDOM);
        }
    });

    // Printing all medias of the photographer
    media.forEach((media) => {
        if(media.photographerId == id) {
            const photographerMedia = mediaTemplate(media);
            const userMediaDOM = photographerMedia.getUserMediaDOM();
            photographerMediaSection.appendChild(userMediaDOM);
        }
    });


    // Total likes and price/day part
    const likesPrint = document.createElement('span');
    likesPrint.innerText = totLikes;

    const heart = document.createElement('i');
    heart.classList.add("fa-solid", "fa-heart", "heart");

    const price = document.createElement('span');
    price.innerText = `${finalPrice} / jour`;

    priceArea.appendChild(likesPrint);
    likesPrint.appendChild(heart);
    priceArea.appendChild(price);
}

async function profileInit() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    // Récupère les media des photographes
    const { media } = await getMedia();
    displayMedia(photographers, media);
}

profileInit();

// Photo modal functions

function closePhotoModal() {
    const modal = document.getElementById("photo_modal");
    modal.style.display = "none";
}