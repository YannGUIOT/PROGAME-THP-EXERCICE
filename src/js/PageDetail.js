import icons from "./icons";
import { playVideo } from "./tools";

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");
    let screenshotsHTML = "";

    const displayGame = (gameData) => {
      console.log(gameData);
      let developersHTML = "";
      let tagsHTML = "";
      let svgLogos = "";
      let genresHTML = "";
      let storesHTML = "";
      gameData.developers.forEach(element => {developersHTML += `${element.name} &nbsp; `});
      gameData.tags.forEach(element => {tagsHTML += `<div class="tag">&nbsp;# ${element.name}&nbsp;</div>`});
      gameData.parent_platforms.forEach(element => {svgLogos += `<div class="logo-platform"><div class="logo-svg">${icons[element.platform.id]}</div><div class="logo-text">${element.platform.name}</div></div>`;});
      gameData.genres.forEach(element => {genresHTML += `<div class="article-genre">&nbsp; ${element.name}&nbsp;&nbsp;</div>`});
      gameData.stores.forEach(element => {storesHTML += `&nbsp; <a target='_blank' href=http://${element.store.domain}>${element.store.name}</a> &nbsp;`});

      const resultsContent = `
        <section class="page-detail">
          <div class="article-images">
            <div class="article-img-cover" style="background-image: url('${gameData.background_image}');"></div>
            <div class="article-img-previews"></div>
            <div class="article-svg">${svgLogos}</div>
            <div id="video"><div><button id="play" onclick="playVideo(${gameData.id})">PLAY |></button></div></div>
          </div>
          <div class="article-detail">
            <div class="title">${gameData.name}</div>
            <div class="article-genres"> <div><u>Genres</u> :</div> <div class="genre-bottom">${genresHTML}</div></div>
            <div class="release-date"><u>Release date</u> : &nbsp; <span id="releaseDate">${gameData.released}</span></div>
            <div class="description">${gameData.description_raw}</div>
            <div class="developers"><u>Developed by</u> : &nbsp;  <span id="dev">${developersHTML}</span></div>
            <div class="detail-rating"><u>Note</u> : &nbsp; ${gameData.rating} / ${gameData.rating_top} &nbsp; ( ${gameData.ratings_count} votes )</div>
            <div class="tags"> ${tagsHTML} </div>
            <div class="stores"><u>Stores</u> : ${storesHTML}</div>
            <div class="website"><u>Game Website</u> : &nbsp;<a href="${gameData.website}" target="_blank">${gameData.name}</a></div>
          </div>
        </section>`;

      const resultsContainer = document.querySelector('.page-detail');
      resultsContainer.innerHTML = resultsContent;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((response) => {
          // Fetch screenshots
          fetch(`https://api.rawg.io/api/games/${response.id}/screenshots?key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            for(let i=0; i<4; i++){
              screenshotsHTML += `<div class="article-img-preview" style="background-image: url('${response.results[i].image}');"></div>`;
            }
            const resultsScreenshots = document.querySelector('.article-img-previews');
            resultsScreenshots.innerHTML = screenshotsHTML;
          });

          displayGame(response);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
      </section>
    `;

    preparePage();
  };

  render();
};


export default PageDetail;