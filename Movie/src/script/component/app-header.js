import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <style>
    .sizeimage-carousel {
      width: 100%;
      height: 350px;
      object-fit: cover;
      object-position: center;
    }
    </style>

    <nav class="navbar navbar-light" style="background-color: #1A374D;">
        <div class="container-fluid">
            <a class="navbar-brand" style="color: white">Movie Info</a>
            <form class="d-flex">
                <input id="search-title" class="form-control mr-3" type="search" placeholder="ex : The Batman" aria-label="Search">
                <button id="search-button" type="submit" class="btn btn-secondary">Search</button>
            </form>
        </div>
    </nav>

    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg" class="d-block sizeimage-carousel" alt="attack on titan">
          <div class="carousel-caption d-none d-md-block">
            <h2>The Batman</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://image.tmdb.org/t/p/original/dK12GIdhGP6NPGFssK2Fh265jyr.jpg" class="d-block sizeimage-carousel" alt="case study vanitas">
          <div class="carousel-caption d-none d-md-block">
            <h2>Red Notice</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://image.tmdb.org/t/p/original/7CamWBejQ9JQOO5vAghZfrFpMXY.jpg" class="d-block sizeimage-carousel" alt="akebi-chan no sailor fuku">
          <div class="carousel-caption d-none d-md-block">
            <h2>Restless</h2>
          </div>
        </div>
      </div>
      
    </div>
  `;
  }
}

customElements.define("app-header", AppHeader);