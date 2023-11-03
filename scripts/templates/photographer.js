function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const a = document.createElement('a');
        a.href=`/photographer.html?id=${data.id}`;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('span');
        location.innerText = `${data.city}, ${data.country}`;
        location.classList.add('location');
        const tagline = document.createElement('span');
        tagline.innerHTML = data.tagline;
        tagline.classList.add('tagline');
        const price = document.createElement('span');
        price.innerHTML = `${data.price}€/jour`;
        price.classList.add('price');
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tagline);
        article.appendChild(price);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}