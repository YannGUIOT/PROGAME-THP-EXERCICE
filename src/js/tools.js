import PageList from "./PageList";

const searchGame = () => {
  let search = document.getElementById("findgame").value;
  if (search == "") {
    search = PageList();
  } else {
    search = "&search=" + search;
    PageList(search);
  }
};

const playVideo = (id) => {
  fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.count > 0) {
        document.getElementById("video").innerHTML = `
          <h2>TRAILER</h2>
          <video controls style="width:100%">
              <source src="${responseData.results[0].data.max}" type="video/mp4">
          </video>`;
      }
    })
    .catch((error) => {
      console.error(error);
    }); 
}

export {searchGame , playVideo};