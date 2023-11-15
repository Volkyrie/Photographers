function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const a = document.createElement('a');
        a.href=`/photographer.html?id=${id}`;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('span');
        location.innerText = `${city}, ${country}`;
        location.classList.add('location');
        const line = document.createElement('span');
        line.innerHTML = tagline;
        line.classList.add('tagline');
        const money = document.createElement('span');
        money.innerHTML = `${price}€/jour`;
        money.classList.add('price');
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(location);
        article.appendChild(line);
        article.appendChild(money);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}