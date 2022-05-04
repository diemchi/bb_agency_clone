// Initialize Swiper
new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    lazy: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 55,
        },
    },
});

// animation aos
AOS.init();

// lazy load img
loadLazyImage = () => {
  var e = [].slice.call(document.querySelectorAll("img.lazy"));
  if("IntersectionObserver" in window){
    var t = new IntersectionObserver(function(e,n) {
      e.forEach(function(e) {
        if(e.isIntersecting) {
          setTimeout(() => {
            var n = e.target;
            if(n.dataset.srcset) {
              n.srcset = n.dataset.srcset
            }
            n.src = n.dataset.src;
            n.classList.remove("lazy");
            t.unobserve(n);
          },0)
        }
      })
    });
    e.forEach(function(e){ t.observe(e) });
  } else {
    var n = false;
    lazyLoad = function() {
      if(n === false) {
        n = true;
        e.forEach(function(t) {
          if(t.getBoundingClientRect().top<=window.innerHeight
          && t.getBoundingClientRect().bottom>=0
          && getComputedStyle(t).display!=="none") {
            setTimeout(() => {
              if(t.dataset.srcset) {
                t.srcset = t.dataset.srcset
              }
              t.src = t.dataset.src;
              t.classList.remove("lazy");
              e = e.filter(function(e){ return e!==t });
              if(e.length===0){
                document.removeEventListener("scroll",lazyLoad);
                window.removeEventListener("resize",lazyLoad);
                window.removeEventListener("orientationchange",lazyLoad)
              }
            },0);
          }
        });
        n = false;
      }
    };
    
    document.addEventListener("scroll",loadLazyImage);
    window.addEventListener("resize",loadLazyImage);
    window.addEventListener("orientationchange",loadLazyImage);
  }
};

setTimeout(() => {loadLazyImage()},0);

// animation project card
window.addEventListener("scroll", function (e) {
  var eleTarget = document.querySelector("#intro");
  var blockChange = document.querySelector("#wrapper");
  if(document.getElementById("wrapper").classList.contains("open-header-mobile")) {
    document.getElementById("wrapper").classList.remove("open-header-mobile");
  }

  if(window.scrollY + window.innerHeight > (eleTarget.offsetTop + eleTarget.offsetHeight)) {
    blockChange.classList.remove("bg-green");
  } else {
    blockChange.classList.add("bg-green");
  }

});

document.getElementById("btn-toggle-menu").onclick = function() {
  document.getElementById("wrapper").classList.toggle("open-header-mobile");
};
