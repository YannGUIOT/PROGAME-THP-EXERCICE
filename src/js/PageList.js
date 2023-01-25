import searchGame from "./tools";
import icons from "./icons";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";


const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    // On enlève les espaces en trop (avec trim()) et 
    // on remplace les espaces entre les mots par des '-' 
    // afin que le terme de recherche soit plus clair pour l'API.

    const displayResults = (articles) => {

      const resultsContent = articles.map((article) => {
        let platformsHTML = "";
        let genresHTML = "";
        article.parent_platforms.forEach(element => {
        // platformsHTML += `<div class="platform"> &nbsp; ${element.platform.name} &nbsp; </div>`
        platformsHTML += `<p class="logo-platform-pageList"> ${icons[element.platform.id]} </p>`;
        });
        article.genres.forEach(element => {
        genresHTML += `<div class="genre-list"> &nbsp; ${element.name} &nbsp; </div>`
        });

        return `<a href="#pagedetail/${article.id}">
        <article class="cardGame" style="background-image: url('${article.background_image}');"> 
          <div class="banner"> 
            <span class="name">${article.name}</span> 
          </div>
          <div class="resources">
            <div class="platforms">
              ${platformsHTML}
            </div>
            <div class="ratings">
              <p class="note">${article.rating} / ${article.rating_top} <\p>
              <p class="counts">${article.ratings_count} Ratings! <\p>
            </div>
            <div class="genres">
              ${genresHTML}
            </div>
          </div>
          <div class="dateBanner"> 
            <div class="empty"></div>
            <div class="date">${article.released.substring(0, 4)} 
              &nbsp; &nbsp; <span class="moreInfo"> More Informations </span>
            </div> 
          </div> 
        </article></a>`
        });

      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };
    
    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
          console.log(responseData.results);
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `;

    preparePage();
  };
  
  render();
};

document.querySelector("#findgame").addEventListener('keypress', (event) =>{
  if(event.key === 'Enter'){ 
    searchGame();
  };
});

document.querySelector('form svg').addEventListener('click', searchGame);

export default PageList;