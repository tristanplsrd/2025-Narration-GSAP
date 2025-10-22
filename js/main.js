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



/** LOGO OPACITY========================================================================================== */
// Timeline pour faire disparaître .window1
let tl = gsap.timeline({
  repeat: -1,
  yoyo: true
});

tl.to('.window1', {
  opacity: 0,
  yPercent: -100, // la fait "monter" hors de l'écran
  transformOrigin: "center center",
  scrollTrigger: {
    trigger: '.window1',
    start: '1000px top',
    end: '1300px top',
    scrub: true,
    onEnter: () => gsap.set('.window1', { pointerEvents: "none" }),  // devient non cliquable
    onLeaveBack: () => gsap.set('.window1', { pointerEvents: "auto" }) // redevient cliquable si on remonte
  }
});



/** CARD========================================================================================== */

gsap.registerPlugin(Draggable);

// Sélectionne toutes les cartes
const cards = document.querySelectorAll('.card');

// Empile les cartes au centre avec un léger décalage visuel (rotation / z-index)
cards.forEach((card, i) => {
  gsap.set(card, {
    x: 0,
    y: 0,
    rotation: gsap.utils.random(-2, 2),
    zIndex: i + 1 // chaque carte légèrement au-dessus de la précédente
  });

  // Rends chaque carte déplaçable
  Draggable.create(card, {
    type: "x,y",
    edgeResistance: 0.9,
    inertia: true,
    bounds: ".workspace",
    onPress() {
      this.target.style.zIndex = 9999; // Passe au premier plan quand on la prend
      gsap.to(this.target, { scale: 1.05, duration: 0.2 }); // petit effet de zoom
    },
    onRelease() {
      gsap.to(this.target, { scale: 1, duration: 0.2 }); // retour à la taille normale
      this.target.style.zIndex = ""; // Réinitialise la pile
    }
  });
});


