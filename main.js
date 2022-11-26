import { Coords, drawProduct, drawTable, circleHover } from "./Classes.js";

const pageDetailImageBlock = document.querySelector(".page-detail-image");
const pageDetailImage = pageDetailImageBlock.querySelector("img");

const coordinates = JSON.parse(localStorage.getItem("coordinates")) ? [] : null;

drawTable(coordinates);

coordinates.forEach((coords) => {
  const circle = document.createElement("div");
  circle.setAttribute("data-id", coords.id);
  circle.style.width = coords.circle + "px";
  circle.style.height = coords.circle + "px";
  circle.style.left = coords.left + "%";
  circle.style.top = coords.top + "%";
  circle.addEventListener("click", (e) => {
    circle.classList.toggle("active");
    const actives = document.querySelectorAll(".active");
    actives.forEach((active) => {
      if (active.dataset.id != e.target.dataset.id) {
        active.classList.remove("active");
        active.firstChild.remove();
      }
    });
    if (circle.classList[0] == "active") {
      drawProduct(coords, coordinates, circle);
    } else {
      circle.querySelector(".fly-div").remove();
    }
  });
  pageDetailImageBlock.appendChild(circle);
});

circleHover();
pageDetailImage.addEventListener("click", (e) => {
  const left = (e.offsetX * 100) / pageDetailImage.clientWidth;
  const top = (e.offsetY * 100) / pageDetailImage.clientHeight;

  const coords = new Coords(left - 1.6, top - 1.6, 20);

  coordinates.push(coords);
  coords.drawCircle(pageDetailImageBlock, coordinates);
  localStorage.setItem("coordinates", JSON.stringify(coordinates));
  circleHover();
  drawTable(coordinates);
});
