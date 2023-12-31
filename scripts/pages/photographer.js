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
    price.innerText = `${finalPrice}€ / jour`;

    priceArea.appendChild(likesPrint);
    likesPrint.appendChild(heart);
    priceArea.appendChild(price);

    const likes = document.querySelectorAll(".likes");
    likes.forEach((like) => like.addEventListener("click", function () {
        const nbLiked = document.querySelectorAll(".isLiked");
        likesPrint.innerText = totLikes + nbLiked.length;
        likesPrint.appendChild(heart);
    }));


    //Sorting select
    const sort = document.querySelector("#sort-btn");
    const dropdown = document.querySelector(".dropdown");
    const arrow = document.createElement('i');
    arrow.classList.add("fa-solid", "fa-chevron-down");

    sort.addEventListener("click", function() {
        dropdown.style.display = "flex";
        // sort.style.display = "none";
    });

    //Sorting popularity
    const popularity_btn = document.querySelector("#popularity_btn");

    popularity_btn.addEventListener("click", function () {
        const popularityOrdonnees = Array.from(media);

        popularityOrdonnees.sort(function (a, b) {
            return b.likes - a.likes;
        });

        document.querySelector(".media_section").innerHTML = "";
        popularityOrdonnees.forEach((media) => {
            if(media.photographerId == id) {
                const photographerMedia = mediaTemplate(media);
                const userMediaDOM = photographerMedia.getUserMediaDOM();
                photographerMediaSection.appendChild(userMediaDOM);
                console.log("Tri popularité");
            }
        });
        sort.innerText = "Popularité";
        sort.appendChild(arrow);
        sort.style.display = "block";
        dropdown.style.display = "none";
    });

    //Sorting date
    const date_btn = document.querySelector("#date_btn");

    date_btn.addEventListener("click", function () {
        const datesOrdonnees = Array.from(media);

        datesOrdonnees.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        document.querySelector(".media_section").innerHTML = "";
        datesOrdonnees.forEach((media) => {
            if(media.photographerId == id) {
                const photographerMedia = mediaTemplate(media);
                const userMediaDOM = photographerMedia.getUserMediaDOM();
                photographerMediaSection.appendChild(userMediaDOM);
                console.log("Tri date");
            }
        });
        sort.innerText = "Date";
        sort.appendChild(arrow);
        sort.style.display = "block";
        dropdown.style.display = "none";
    });

    //Sorting title
    const title_btn = document.querySelector("#title_btn");

    title_btn.addEventListener("click", function () {
        const titlesOrdonnees = Array.from(media);

        titlesOrdonnees.sort(function (a, b) {
            if(a.title < b.title) {
                return -1;
            }
            else if (a.title > b.title) {
                return 1;
            }
            else {
                return 0;
            }
        });

        document.querySelector(".media_section").innerHTML = "";
        titlesOrdonnees.forEach((media) => {
            if(media.photographerId == id) {
                const photographerMedia = mediaTemplate(media);
                const userMediaDOM = photographerMedia.getUserMediaDOM();
                photographerMediaSection.appendChild(userMediaDOM);
                console.log("Tri titre");
            }
        });
        sort.innerText = "Titre";
        sort.appendChild(arrow);
        sort.style.display = "block";
        dropdown.style.display = "none";
    });
    loadFormButton();
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

const closePhotoBtn = document.getElementById("closePhoto_btn");

closePhotoBtn.addEventListener('click', function () {
    closePhotoModal();
});

closePhotoBtn.addEventListener('keydown', function (event) {
    if(event.code === 'Enter') {
        closePhotoModal();
    }
});

async function moveSlidePrev() {
    const { media } = await getMedia();
    const currentMedia = document.getElementById('title').innerText;
    let getID = new URL(document.location).searchParams;
    let id = getID.get("id");
    const mediaFilter = media.filter(item => item.photographerId == id);
    const imax = mediaFilter.length;
    
    for(let i=0; i < imax; i++) {
        if(currentMedia == mediaFilter[i].title){
            if(i>0) {
                const picture = `assets/images/${id}/${mediaFilter[i-1].image}`;
                let extension = picture.split('.').pop();
                document.getElementById('title').innerText = mediaFilter[i-1].title;
                if(extension == "jpg") {
                    document.getElementById('photo_print').setAttribute('src', picture);
                    document.getElementById('photo_print').style.display = "block";
                    document.getElementById('video_print').style.display = "none";
                    break;
                }
                else {
                    const picture = `assets/images/${id}/${mediaFilter[i-1].video}`;
                    document.getElementById('video_print').setAttribute('src', picture);
                    document.getElementById('video_print').style.display = "block";
                    document.getElementById('photo_print').style.display = "none";
                    break;
                }
            }
            else {
                const picture = `assets/images/${id}/${mediaFilter[imax-1].image}`;
                let extension = picture.split('.').pop();
                document.getElementById('title').innerText = mediaFilter[imax-1].title;
                if(extension == "jpg") {
                    document.getElementById('photo_print').setAttribute('src', picture);
                    document.getElementById('photo_print').style.display = "block";
                    document.getElementById('video_print').style.display = "none";
                    break;
                }
                else {
                    const picture = `assets/images/${id}/${mediaFilter[imax-1].video}`;
                    document.getElementById('video_print').setAttribute('src', picture);
                    document.getElementById('video_print').style.display = "block";
                    document.getElementById('photo_print').style.display = "none";
                    break;
                }
            }
        }
    }
}

async function moveSlideNext() {
    const { media } = await getMedia();
    const currentMedia = document.getElementById('title').innerText;
    let getID = new URL(document.location).searchParams;
    let id = getID.get("id");
    const mediaFilter = media.filter(item => item.photographerId == id);
    const imax = mediaFilter.length;
    

    for(let i=0; i < imax; i++) {
        if(currentMedia == mediaFilter[i].title){
            if(i < imax-1) {
                const picture = `assets/images/${id}/${mediaFilter[i+1].image}`;
                let extension = picture.split('.').pop();
                document.getElementById('title').innerText = mediaFilter[i+1].title;
                if(extension == "jpg") {
                    document.getElementById('photo_print').setAttribute('src', picture);
                    document.getElementById('photo_print').style.display = "block";
                    document.getElementById('video_print').style.display = "none";
                    break;
                }
                else {
                    const picture = `assets/images/${id}/${mediaFilter[i+1].video}`;
                    document.getElementById('video_print').setAttribute('src', picture);
                    document.getElementById('video_print').style.display = "block";
                    document.getElementById('photo_print').style.display = "none";
                    break;
                }
            }
            else {
                const picture = `assets/images/${id}/${mediaFilter[0].image}`;
                let extension = picture.split('.').pop();
                document.getElementById('title').innerText = mediaFilter[0].title;
                if(extension == "jpg") {
                    document.getElementById('photo_print').setAttribute('src', picture);
                    document.getElementById('photo_print').style.display = "block";
                    document.getElementById('video_print').style.display = "none";
                    break;
                }
                else {
                    const picture = `assets/images/${id}/${mediaFilter[0].video}`;
                    document.getElementById('video_print').setAttribute('src', picture);
                    document.getElementById('video_print').style.display = "block";
                    document.getElementById('photo_print').style.display = "none";
                    break;
                }
            }
        }
    }
}

const prev_btn = document.querySelector("#prevClick");

prev_btn.addEventListener("click", function () {
    moveSlidePrev();
});

prev_btn.addEventListener('keydown', function (event) {
    if(event.code === 'Enter') {
        moveSlidePrev();
    }
});

const next_btn = document.querySelector("#nextClick");

next_btn.addEventListener("click", function () {
    moveSlideNext();
});

next_btn.addEventListener('keydown', function (event) {
    if(event.code === 'Enter') {
        moveSlideNext();
    }
});