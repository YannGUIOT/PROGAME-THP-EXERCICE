import icons from "./icons";

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");
    let screenshotsHTML = "";

    const displayGame = (gameData) => {
      console.log(gameData);
      let developersHTML = "";
      let tagsHTML = "";
      let platformsHTML = "";
      let svgLogos = "";
      let genresHTML = "";
      gameData.developers.forEach(element => {developersHTML += `${element.name} &nbsp; `});
      gameData.tags.forEach(element => {tagsHTML += `# ${element.name} &nbsp; `});
      gameData.parent_platforms.forEach(element => {
        platformsHTML += `<div class="article-platform"> &nbsp; ${element.platform.name} &nbsp; </div>`;
        svgLogos += `<div class="logo-platform">${icons[element.platform.id]}</div>`;
      });
      gameData.genres.forEach(element => {genresHTML += `<div class="article-genre"> &nbsp; ${element.name} &nbsp; </div>`});

      const resultsContent = `
        <section class="page-detail">
          <div class="article-images">
            <div class="article-img-cover" style="background-image: url('${gameData.background_image}');"></div>
            <div class="article-img-previews"></div>
            <div class="article-svg">${svgLogos}</div>
          </div>
          <div class="article-detail">
            <h1 class="title">${gameData.name}</h1>
            <p class="release-date">Release date : <span id="releaseDate">${gameData.released}</span></p>
            <p class="description">${gameData.description_raw}</p>
            <p class="developers">Developed by : &nbsp;  <span id="dev">${developersHTML}</span></p>
            <p class="detail-rating">note : &nbsp; ${gameData.rating} / ${gameData.rating_top} &nbsp; ( ${gameData.ratings_count} votes )</p>
            <p class="website">website : <a href="${gameData.website}" target="_blank">${gameData.name}</a></p>
            <p class="tags"> ${tagsHTML} </p>
            <div class="article-platforms-genres">${platformsHTML} &nbsp; - &nbsp; ${genresHTML}</div>

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

          // Fetch platforms
          // fetch(`https://api.rawg.io/api/games/${response.id}/game-series?key=${API_KEY}`)
          // .then((response) => response.json())
          // .then((response) => {
          //   console.log(response);
            // for(let i=0; i<4; i++){
            //   platformsHTML += `<div class="platform">${response.results[i].name}</div>`;
            // }
            // const resultsScreenshots = document.querySelector('.article-platforms');
            // resultsScreenshots.innerHTML = platformsHTML;
          // });


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