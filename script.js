const API_KEY= "a5f7cbf590f84a96b0ea94b3e0602cbc";
const url= "https://newsapi.org/v2/everything?q=";
window.addEventListener("load",() =>fetchNews("India"));
function reload() {
    window.location.reload();
}
async function fetchNews (query) {
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);

}
function bindData(articles) {
    const cardsContainer=document.getElementById('cc');
    const nCt= document.getElementById('tnc');
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
      if(!article.urlToImage) return;
      const cardClone= nCt.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);  
    });

}

 function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector("#ni");
    const newsTitle = cardClone.querySelector("#nt");
    const newsSource = cardClone.querySelector("#ns");
    const newsDesc = cardClone.querySelector("#nd");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url,"_blank");
    });
 }
 let currSelect = null;
 function onNavitem(id) {
    fetchNews(id);
    const navitem = document.getElementById(id);
    currSelect?.classList.remove('active');
    currSelect=navitem;
    currSelect.classList.add('active');
 }
 const searchButton = document.getElementById('sab');
 const searchtxt = document.getElementById('st');
 searchButton.addEventListener('click', ()=>{
    const query=searchtxt.value;
    if(!query)return;
    fetchNews(query);
    currSelect.classList.remove('active');
    currSelect = null;
 });