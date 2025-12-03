const accessKey= "tDuaHnYSGCW355BktiGIVhZixaYpktwYK5EH_16U4OQ";

const formEl = document.querySelector("form");
const searchIdEl = document.getElementById("search-id");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchIdEl.value;
    console.log(inputData);
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;
    results.map((result) => {

    const imageWraper = document.createElement("div");
    imageWraper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small
    image.alt = result.alt_description;
    const imageLink = document.createElement("a")
    imageLink.href = result.links.html
    imageLink.target = "_blank"
    imageLink.textContent = result.alt_description;

    imageWraper.appendChild(image);
    imageWraper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWraper);
    });
    page++;

    if(page > 1){
        showMoreButtonEl.style.display = "block";
    }

}
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
    console.log("submitted");
});
showMoreButtonEl.addEventListener("click", () =>{
    searchImages();
});

const categoryCards = document.querySelectorAll(".search-result");
categoryCards.forEach(card => {
    card.addEventListener("click", () =>{
        const keyword = card.getAttribute("data-search");
        searchIdEl.value = keyword;
        page = 1;
        searchImages();
        window.scrollTo({ top: 0, behavior: "smooth"});
    });
});
