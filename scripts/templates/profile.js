function photographerTemplate(data) {
    const { name, portrait, city, country, tagline } = data;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {        
        const article = document.createElement( 'article' );
        article.classList.add('presentation');

        const infos = document.createElement('div');
        infos.classList.add('infos');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h1 = document.createElement( 'h1' );
        h1.textContent = name;

        const btn = document.createElement('button');
        btn.setAttribute("id", "form_button");
        btn.textContent = "Contactez-moi";
        btn.classList.add('contact_button');

        const location = document.createElement('span');
        location.innerText = `${city}, ${country}`;
        location.classList.add('location');

        const line = document.createElement('span');
        line.innerHTML = tagline;
        line.classList.add('tagline');

        article.appendChild(infos);
        infos.appendChild(h1);
        infos.appendChild(location);
        infos.appendChild(line);
        article.appendChild(btn);
        article.appendChild(img);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

function mediaTemplate(data) {
    const {id, title, image, likes, photographerId, video } = data;

    const picture = `assets/images/${photographerId}/${image}`;
    const videoLink = `assets/images/${photographerId}/${video}`;
    const slidesContainer = document.querySelector('#photo_print');
    

    function getUserMediaDOM() {        
        const article = document.createElement( 'article' );
        article.classList.add('art');

        if(image) {
            var img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute("alt", data.title);
            img.setAttribute("alt", data.title);
            img.setAttribute("tabindex", "0");
            img.setAttribute("role", "button");
            img.setAttribute("aria-pressed", "false");

            img.onclick = function() {
                const openPhotoModal = document.getElementById("photo_modal");
                openPhotoModal.style.display = "block";

                const modalVideo = document.getElementById("video_print");
                modalVideo.style.display = "none";

                const modalPhoto = document.getElementById("photo_print");
                modalPhoto.style.display = "block";
                const photoTitle = document.getElementById("title");
                modalPhoto.src = this.src;
                photoTitle.innerText = this.alt;
            }

            img.onkeypress = function() {
                const openPhotoModal = document.getElementById("photo_modal");
                openPhotoModal.style.display = "block";

                const modalVideo = document.getElementById("video_print");
                modalVideo.style.display = "none";

                const modalPhoto = document.getElementById("photo_print");
                modalPhoto.style.display = "block";
                const photoTitle = document.getElementById("title");
                modalPhoto.src = this.src;
                photoTitle.innerText = this.alt;
            }
            
        }
        else {
            img = document.createElement('video');
            img.setAttribute("src", videoLink);
            img.setAttribute("title", data.title);
            img.setAttribute("alt", data.title);
            img.setAttribute("tabindex", "0");
            img.setAttribute("role", "button");
            img.setAttribute("aria-pressed", "false");

            img.onclick = function() {
                const openVideoModal = document.getElementById("photo_modal");
                openVideoModal.style.display = "block";

                const modalPhoto = document.getElementById("photo_print");
                modalPhoto.style.display = "none";

                const modalVideo = document.getElementById("video_print");
                modalVideo.style.display = "block";
                const videoTitle = document.getElementById("title");
                modalVideo.src = this.src;
                videoTitle.innerText = this.title;
            }

            img.onkeypress = function() {
                const openVideoModal = document.getElementById("photo_modal");
                openVideoModal.style.display = "block";

                const modalPhoto = document.getElementById("photo_print");
                modalPhoto.style.display = "none";

                const modalVideo = document.getElementById("video_print");
                modalVideo.style.display = "block";
                const videoTitle = document.getElementById("title");
                modalVideo.src = this.src;
                videoTitle.innerText = this.title;
            }
            
        }

        const picInfos = document.createElement('div')
        picInfos.classList.add('picInfos');

        const title = document.createElement('span');
        title.innerHTML = data.title;
        title.classList.add('title');

        const mediaLikes = document.createElement('span');
        mediaLikes.innerHTML = likes;
        mediaLikes.classList.add('likes');
        mediaLikes.setAttribute('id', id);
        mediaLikes.addEventListener("click", function () {
            let currentLikes = parseInt(mediaLikes.textContent);
            
            mediaLikes.classList.toggle("isLiked");

            if(mediaLikes.classList.contains("isLiked")) {
                mediaLikes.innerHTML = currentLikes + 1;
                
            }
            else {
                mediaLikes.innerHTML = currentLikes - 1;
            }
            mediaLikes.appendChild(heart);
        });

        const heart = document.createElement('i');
        heart.classList.add("fa-solid", "fa-heart", "heart");
        heart.setAttribute("aria-labelledby", "Like");

        article.appendChild(img);
        article.appendChild(picInfos);
        picInfos.appendChild(title);
        picInfos.appendChild(mediaLikes);
        mediaLikes.appendChild(heart);
        return (article);
    }
    return { title, picture, getUserMediaDOM }
}