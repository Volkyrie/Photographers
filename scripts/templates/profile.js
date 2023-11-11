function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

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
        btn.setAttribute("id", "form-button")
        btn.textContent = "Contactez-moi";
        btn.classList.add('contact_button');
        btn.setAttribute("onclick", "displayModal()");

        const location = document.createElement('span');
        location.innerText = `${data.city}, ${data.country}`;
        location.classList.add('location');

        const tagline = document.createElement('span');
        tagline.innerHTML = data.tagline;
        tagline.classList.add('tagline');

        article.appendChild(infos);
        infos.appendChild(h1);
        infos.appendChild(location);
        infos.appendChild(tagline);
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
            
        }
        else {
            var img = document.createElement('video');
            img.setAttribute("src", videoLink);
            img.setAttribute("title", data.title);
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
            
        }

        const picInfos = document.createElement('div')
        picInfos.classList.add('picInfos');

        const title = document.createElement('span');
        title.innerHTML = data.title;
        title.classList.add('title');

        const likes = document.createElement('span');
        likes.innerHTML = data.likes;
        likes.classList.add('likes');
        likes.setAttribute('id', id);
        likes.addEventListener("click", function () {
            let currentLikes = parseInt(likes.textContent);
            
            likes.classList.toggle("isLiked");

            if(likes.classList.contains("isLiked")) {
                likes.innerHTML = currentLikes + 1;
                
            }
            else {
                likes.innerHTML = currentLikes - 1;
            }
            likes.appendChild(heart);
        });

        const heart = document.createElement('i');
        heart.classList.add("fa-solid", "fa-heart", "heart");

        article.appendChild(img);
        article.appendChild(picInfos);
        picInfos.appendChild(title);
        picInfos.appendChild(likes);
        likes.appendChild(heart);
        return (article);
    }
    return { title, picture, getUserMediaDOM }
}