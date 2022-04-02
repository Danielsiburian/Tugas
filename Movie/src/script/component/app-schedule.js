import "bootstrap/dist/css/bootstrap.min.css";

class AppSchedule extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <div>
        <div class="list-group" id="list-tab" role="tablist">
        </div>
        <br>
        <h5><span id="top-upcoming"></span></h5>
    </div>
  `;
  }
}

customElements.define("app-schedule", AppSchedule);