(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Smooth Scroll Logic
   */
  const scrollto = (el) => {
    let element = select(el);
    if (!element) return;
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    })
  }

  on('click', '.scrollto', function(e) {
    if (this.hash && select(this.hash)) {
      e.preventDefault();
      scrollto(this.hash);
    }
  }, true);

  /**
   * Immersive Reveal Observer
   * This creates the "dopamine" effect by making content arise as you scroll.
   */
  const revealElements = select('.reveal', true);
  if (revealElements && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  /**
   * Back to top reveal
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 300) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    window.addEventListener('scroll', toggleBacktotop)
  }

})();
