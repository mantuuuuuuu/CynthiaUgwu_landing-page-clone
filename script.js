const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
var timeout;  //global variable


function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from("#homefooter", {
      y: "-5",
      opacity: 0,
      duration: 1.2,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptakaro() {
  // define default scale values
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);
    // hum purane xscale 0r yscale ko save kr rhe h
    var xdiff = details.clientX - xprev;
    var ydiff = details.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    yprev = details.clientY;
    xprev = details.clientX;

    circleMouseFollower(xscale, yscale);

    // ye timeout hum bss wapas circle ko shi shape m laane k liye use kr rhe h

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1 , 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale} , ${yscale}) `;
  });
}

circleChaptakaro();
circleMouseFollower();
firstPageAnim();


// ye image ko move kraane k liye use kr rhe h 

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var difference = 0;

  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    difference = details.clientX - rotate;
    rotate = details.clientX;

    gsap.utils.clamp(-20, 20, difference);

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, difference * 0.5),
    });
  });
});
