const API_KEY = "81ad155ae1694576a244db6c53142d9a";
const url = "https://newsapi.org/v2/everything?q=";



window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article )=> {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta",});

    newsSource.innerHTML =`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}

// nav item click funtion
let currerntSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currerntSelectedNav?.classList.remove('active');// agar kisi new nav item ko select kia to purane wale ko remove kar do
    currerntSelectedNav = navItem;
    currerntSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener('click',() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currerntSelectedNav?.classList.remove('active');//remove active states from nav option is you are searching something
    currerntSelectedNav= null;
});