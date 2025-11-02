gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,Draggable,MotionPathPlugin,Observer);


/** PROGRESS BAR SCROLL INDICATOR============================================================================================= */

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
  document.getElementById('scroll-progress-bar').style.width = scrolled + '%';
});

/** LOGO ZOOM============================================================================================= */
gsap.to("#logo", {
  scale: 600, // zoom final
  transformOrigin: "center center",
  scrollTrigger: {
    trigger: "#logo",
    start: "10% top",  
    end: "1500px top",
    toggleActions: "play none none reverse",
    scrub : 1,
  }
});

/** LOGO OPACITY========================================================================================== */
// Timeline pour faire disparaître .window1
let tl = gsap.timeline({
  repeat: -1,
  yoyo: true
});

tl.to('.window1', {
  opacity: 0,
  yPercent: -100, // la fait monter hors de l'écran
  transformOrigin: "center center",
  scrollTrigger: {
    trigger: '.window1',
    start: '1000px top',
    end: '1100px top',
    scrub: true,
    onEnter: () => gsap.set('.window1', { pointerEvents: "none" }),  // devient non cliquable
    onLeaveBack: () => gsap.set('.window1', { pointerEvents: "auto" }) // redevient cliquable si on remonte
  }
});

/** LOGO ROTATION ANIMATION ON LOAD======================================================================= */

gsap.from('#logo' , {
    scale: 0,
    rotateX: "360deg",
    duration: 1,
    ease: "power1.inOut"
});


/** SCROLL EXPLORE ANIMATION ============================================================================== */
let tl2 = gsap.timeline({
    repeat: -1,
    yoyo: true
})

tl2.to('.scroll-explore', {
    opacity: 0.0,
    transformOrigin: "opacity center center",
    scrollTrigger: {
        trigger: '.window1',
        start: '10% top',
        end: '20% top',
        scrub: true,
    }
})

gsap.from('.scroll-explore' , {
    opacity: 0,
    duration: 7,
    ease: "power1.inOut"
});


// Sélectionne chaque ligne (span)
const lines = gsap.utils.toArray("aboutme span");

// Anime chaque span avec alternance gauche/droite
lines.forEach((line, i) => {
  gsap.to(line, {
    x: i % 2 === 0 ? -200 : 200, // alternance gauche/droite
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: line,
      start: "top 85%",
      toggleActions: "play none none reverse",
      markers: true,
    }
  });
});


gsap.to('.aboutme', {
    scrollTrigger: {
      trigger: '.aboutme',
      start: "10% top",
      end: "1700px top",
      scrub: true,
      markers: true,
    },
    scale: 2,
    opacity: 0,
    duration: 2,
});

// BANDEROLE++++++++++++++++++=  ====================================================

// Animation de la banderole  
let marqueeTween = gsap.to(".marquee-inner", {
  xPercent: -50,
  repeat: -1,
  ease: "linear",
  duration: 20, // vitesse du mouvement
});

// Stop / reprend selon le scroll
ScrollTrigger.create({
  trigger: ".marquee-section",
  start: "top bottom", // commence quand elle entre dans la vue
  end: "bottom top",   // s'arrête quand elle sort
  onEnter: () => marqueeTween.play(),
  onLeave: () => marqueeTween.pause(),
  onEnterBack: () => marqueeTween.play(),
  onLeaveBack: () => marqueeTween.pause(),
});

// DRAGGABLE PROJECTS =============================================================================================
// Animation d’arrivée avec ScrollTrigger
gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);

// Position initiale (empilées au centre)
gsap.set(".card", (i) => ({
  x: i * 15 - 30,
  y: i * 15 - 30,
  zIndex: 10 - i,
}));

// Animation d’apparition fluide quand la section entre en vue
gsap.to(".card", {
  opacity: 1,
  y: 0,
  stagger: 0.15,
  ease: "power3.out",
  duration: 1,
  scrollTrigger: {
    trigger: "#cards-section",
    start: "top 70%",
  },
});

// Rendre les cartes déplaçables (limitées à la section)
const container = document.querySelector("#cards-section");

Draggable.create(".card", {
  type: "x,y",
  bounds: container,
  inertia: false,
  edgeResistance: 1,
  onPress() {
    gsap.to(this.target, { scale: 1.05, zIndex: 20, duration: 0.1 });
  },
  onRelease() {
    gsap.to(this.target, { scale: 1, zIndex: 10, duration: 0.1 });
  },
});

// Gestion des boutons "En savoir plus" (scroll vers la bonne section)
document.querySelectorAll(".learn-more").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");

    gsap.to(window, {
      duration: 1,
      scrollTo: target,
      ease: "power2.inOut",
    });
  });
});

// On cible toutes les sections avec horizontal-wrapper
const sections = document.querySelectorAll(".project-section");

sections.forEach((section) => {
  const wrapper = section.querySelector(".horizontal-wrapper");
  const panels = wrapper.querySelectorAll(".panel");

  // Scroll horizontal pour chaque section
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + section.offsetWidth * (panels.length - 1),
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });

  // Animation fade + slide pour chaque panel
  panels.forEach((panel) => {
    gsap.to(panel, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: panel,
        containerAnimation: gsap.getProperty(wrapper, "x") || null,
        start: "left center",
        end: "right center",
        scrub: true
      }
    });
  });
});

// Effets d’apparition pour chaque section
sections.forEach((section) => {
  const img = section.querySelector("img");
  const text = section.querySelector(".content");

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      containerAnimation: ScrollTrigger.getById("horizontalScroll"),
      start: "left center",
      end: "right center",
      scrub: true,
      yoyo: true,
    }
  })
  .to(img, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0)
  .to(text, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.2);
});
