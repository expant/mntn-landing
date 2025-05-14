gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const initMobileMenu = () => {
  const mobileMenuOpenBtn = document.querySelector(".header__mobile-menu");
  const mobileMenuExitBtn = document.querySelector(".mobile-menu__exit");

  gsap.set(".mobile-menu-wrapper", { x: "100vw", duration: 0.5 });

  mobileMenuOpenBtn.addEventListener("click", () => {
    document.body.classList.add("no-scroll");

    let tl = gsap.timeline({
      onComplete: () => {
        tl.kill();
      },
    });

    tl.timeScale(1.5);
    tl.fromTo(
      ".mobile-menu-wrapper",
      {
        display: "none",
        opacity: 0,
        x: "100vw",
      },
      {
        display: "block",
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
    tl.from(".mobile-menu", {
      opacity: 0,
      x: 200,
    });
  });

  mobileMenuExitBtn.addEventListener("click", () => {
    document.body.classList.remove("no-scroll");

    gsap.to(".mobile-menu-wrapper", {
      opacity: 0,
      x: "100vw",
      duration: 0.5,
      ease: "power2.out",
    });
  });
};

const initOnScroll = () => {
  const contentNums = gsap.utils.toArray(".content__text-num");
  const contentImgs = gsap.utils.toArray(".content__item-img");

  contentNums.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -200,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top center",
      },
    });
  });

  contentImgs.forEach((el) => {
    gsap.from(el, {
      x: 100,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top center",
      },
    });
  });

  document.fonts.ready.then(() => {
    gsap.set(".hero__title-xl", { opacity: 1 });

    let split;
    SplitText.create(".hero__title-xl", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.lines, {
          duration: 1,
          yPercent: 100,
          opacity: 0,
          stagger: 0.5,
          ease: "expo.out",
        });
        return split;
      },
    });
  });
};

const initHoverReveal = () => {
  const mobileMenuItems = gsap.utils.toArray(".mobile-menu__item-link");
  const desktopMenuItems = gsap.utils.toArray(".menu__item-link");

  [...mobileMenuItems, ...desktopMenuItems].forEach((el) => {
    const original = el.querySelector(".original");
    const reveal = el.querySelector(".reveal");

    el.addEventListener("mouseenter", () => {
      gsap
        .timeline()
        .to(original, { y: "-100%", duration: 0.1 })
        .to(reveal, { y: "-100%", duration: 0.1 }, 0);
    });

    el.addEventListener("mouseleave", () => {
      gsap
        .timeline()
        .to(reveal, { y: "0%", duration: 0.1 })
        .to(original, { y: "0%", duration: 0.1 }, 0);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHoverReveal();
  initOnScroll();
});
