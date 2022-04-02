import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function app() {
  const baseUrl = "https://advanced-movie-search.p.rapidapi.com";

  const getItem = () => {
    axios
      .get(`https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=80&page=1`, {
        headers: {
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com',
            'X-RapidAPI-Key': 'd8c937670cmsh6789746bca7f5c7p1deb24jsn25b95c5e75cb',
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllItemCard(responseJson.results);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };


  const getItemSearch = (title) => {
    axios
      .get(`https://advanced-movie-search.p.rapidapi.com/search/movie?query=${title}`, {
        headers: {
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com',
            'X-RapidAPI-Key': 'd8c937670cmsh6789746bca7f5c7p1deb24jsn25b95c5e75cb',
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllItemSearch(responseJson.results);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const renderAllItemCard = (data) => {
    const resultMovie = document.querySelector("#movie-card-item");
    resultMovie.innerHTML = "";

    data.forEach((item) => {
      if (item.popularity == null) {
        item.popularity = "-";
      }
      if (item.release_date == null) {
        item.release_date = "-";
      }
      if (item.vote_average == "0") {
        item.vote_average = "-";
      }

      resultMovie.innerHTML += `
      <style>
      .card-item {
        width: 14rem;
      }
      @media screen and (max-width: 1024px) {
        .card-item {
          width: 100%;
        }
      }
      </style>
      <div class="card card-item m-2">
        <img src="${item.poster_path}" class="img-thumbnail" alt="image thumbnail">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h5 class="card-title">${item.overview}</h5>
          <table class="mt-3 mb-3">
            <tr>
              <td>Popularity</td>
              <td>: ${item.popularity}</td>
            </tr>
            <tr>
              <td>Start</td>
              <td>: ${item.release_date}</td>
            </tr>
            <tr>
              <td>Score</td>
              <td>: ${item.vote_average}</td>
            </tr>
          </table>
        </div>
      </div>
      `;
    });
  };

  // function render schedule anime
  const renderAllItemTable = (data) => {
    const hiddenItem = document.getElementById("movie-card-item");
    hiddenItem.classList.add("d-none");

    const tableSchedule = document.getElementById("table-schedule");
    tableSchedule.innerHTML = `
    <table class="table table-bordered table-striped table-dark">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Popularity</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody id="listItem">
        </tbody>
    </table>
    `;

    const listScheduleElements = document.querySelector("#listItem");
    listScheduleElements.innerHTML = "";

    data.forEach((item) => {
      if (item.popularity == null) {
        item.popularity = "-";
      }
      if (item.vote_average == null) {
        item.vote_average = "-";
      }

      listScheduleElements.innerHTML += `
      <tr>
        <th scope="row">${item.id}</th>
        <td><img src="${item.poster_path}" alt="thumbnails ${item.title}" class="img-thumbnail"></td>
        <td>${item.title}</td>
        <td>${item.popularity}</td>
        <td>${item.vote_average}</td>
      </tr>
      `;
    });
  };

  // function render search anime
  const renderAllItemSearch = (data) => {
    const resultMovie = document.querySelector("#movie-search-item");
    resultMovie.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      resultMovie.innerHTML += `
      <h2>${data[i].title}</h2>
      <img src="${data[i].poster_path}" class="img-thumbnail" alt="image thumbnail">
      <dl class="row mt-3">
        <dt class="col-sm-2">My Movie Id</dt>
        <dd class="col-sm-10">${data[i].id}</dd>

        <dt class="col-sm-2">Popularity</dt>
        <dd class="col-sm-10">${data[i].popularity}</dd>

        <dt class="col-sm-2 text-truncate">Score</dt>
        <dd class="col-sm-10">${data[i].vote_average}</dd>

        <dt class="col-sm-2">Nesting</dt>
        <dd class="col-sm-10">
          <p>${data[i].overview}</p>
        </dd>
      </dl>
      `;
    }
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    // get item upcoming anime
    const getValueCard = document.getElementById("top-upcoming");
    getValueCard.addEventListener("click", () => {
      const hiddenTable = document.getElementById("table-schedule");
      hiddenTable.classList.add("d-none");
      const displaySearch = document.getElementById("anime-search-item");
      displaySearch.classList.add("d-none");
      const displayCard = document.getElementById("anime-card-item");
      displayCard.classList.remove("d-none");
    });
    getItem();
    // get item search
    const searchForm = document.getElementById("search-button");
    searchForm.addEventListener("click", function (event) {
      const hiddenCard = document.getElementById("anime-card-item");
      hiddenCard.classList.add("d-none");
      const hiddenTable = document.getElementById("table-schedule");
      hiddenTable.classList.add("d-none");
      const displaySearch = document.getElementById("anime-search-item");
      displaySearch.classList.remove("d-none");

      const valueTitle = document.getElementById("search-title").value;
      event.preventDefault();
      getItemSearch(valueTitle);
    });
  });
}

export default app;
