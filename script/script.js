

let sliderItems = document.getElementById('slides'), //контейнер слайдеров
  prev = document.getElementById('prev'),
  next = document.getElementById('next'),
  dots = document.querySelectorAll(".dot"),
  wrapper = document.getElementById("wrapper-slider");

  wrapper.onmouseover = () => {
    prev.classList.add('show')
    next.classList.add('show')
  }
  wrapper.onmouseout = () => {
    prev.classList.remove('show')
    next.classList.remove('show')
  }

function slide() {
  let slides = sliderItems.getElementsByClassName('slide'), //слайды
    slidesLength = slides.length, //5
    index = 0,
    allowShift = true,
    slideSize = slides[0].offsetWidth; 

  // Clone first and last slide
  sliderItems.appendChild(slides[0].cloneNode(true));
  sliderItems.insertBefore(slides[slidesLength - 1].cloneNode(true), slides[0]);

  // Click events
  prev.onclick = () => {
    shiftSlide(false);
    activeDot(index)
  }
  next.onclick = () => {
    shiftSlide(true);
    activeDot(index)
  }

  // Transition events
  sliderItems.addEventListener('transitionend', checkIndex);

  // Click dots
  function clickDot(m) {
    sliderItems.classList.add('shifting');
    sliderItems.style.left = -(slideSize * (m + 1)) + "px";
  }

  //
  function activeDot(n) {
    for (dot of dots) {
      if (index == slidesLength) {
        n = 0;
        dots[n].classList.add('active');
        dot.classList.remove('active');
      } else if (index == -1) {
        n = slidesLength - 1;
        dots[n].classList.add('active');
        dot.classList.remove('active');
      }
      dot.classList.remove('active');
    }
    dots[n].classList.add('active');
  }


  function shiftSlide(dir) {
    sliderItems.classList.add('shifting');
    if (allowShift) {
      if (dir == true) {     //click next
        sliderItems.style.left = sliderItems.offsetLeft - slideSize + "px";
        index++;
      } else if (dir == false) {   //click left   
        sliderItems.style.left = sliderItems.offsetLeft + slideSize + "px";
        index--;
      }
    }
    allowShift = false;
  }

  function checkIndex() {
    sliderItems.classList.remove('shifting');
    if (index == -1) {
      sliderItems.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }
    if (index == slidesLength) {
      sliderItems.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    allowShift = true;
  }

  dots.forEach((item, indexDot) => {
    item.onclick = () => {
      index = indexDot;
      activeDot(index);
      clickDot(index);
    }
  })
}

slide();
window.addEventListener('resize', slide);