const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens =[...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

// get the number of cards that can fit in carousel at once
let cardPenView = Math.round(carousel.offsetWidth / firstCardWidth);

// insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPenView).reverse().forEach(card => {
   carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPenView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});



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

const autoPlay = () => {
  if(window.innerWidth < 800) return; // return is window is smaller than 800
// autoplay the carousel after every 1000ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
}
autoPlay();


const infiniteScroll = () => {

  // if the carousel is at the beginning scroll to the end
  if(carousel.scrollLeft === 0){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");

  // if carousel is at the end scroll to the beginning
  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  //clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if(wrapper.matched(".hover")) autoPlay();

}

carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);  
carousel.addEventListener("scroll", infiniteScroll);