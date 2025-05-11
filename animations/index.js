gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// document.addEventListener("DOMContentLoaded", () => {
//   ScrollSmoother.create({
//     wrapper: "#smooth-wrapper",
//     smooth: 1,
//     effects: true,
//   });
// });

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
    }
  });
});