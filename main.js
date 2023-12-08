const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

let isDragging = false, startX, startScrollLeft;

// add event listeners for the arrow btn to scroll carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragstart = () => {
  isDragging = true;
  carousel.classList.add("dragging");
  // record the initial cursor and scroll postion of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // update the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}


const dragstop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);  