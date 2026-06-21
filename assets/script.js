/* =========================================================
   PRESTIGE SERVICE AUTOMOBILE — interactions
   ========================================================= */
(function(){
  "use strict";

  var WA_NUMBER = "33761109422";

  /* ---------- WhatsApp link builder ---------- */
  document.querySelectorAll("[data-wa-msg]").forEach(function(el){
    var msg = el.getAttribute("data-wa-msg");
    el.setAttribute("href", "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- nav scroll state ---------- */
  var nav = document.querySelector(".nav");
  var onScroll = function(){
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector(".nav__burger");
  if (burger){
    burger.addEventListener("click", function(){
      nav.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", nav.classList.contains("menu-open"));
    });
    document.querySelectorAll(".nav__links a").forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("menu-open"); });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------- hero parallax (subtle) ---------- */
  var heroImg = document.querySelector(".hero__media img");
  if (heroImg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.addEventListener("scroll", function(){
      var y = window.scrollY;
      if (y < window.innerHeight){
        heroImg.style.transform = "scale(1.06) translateY(" + (y * 0.08) + "px)";
      }
    }, { passive: true });
  }

  /* ---------- process slider ---------- */
  var track = document.querySelector(".process__track");
  if (track){
    var slides = Array.prototype.slice.call(track.querySelectorAll(".process__slide"));
    var dotsWrap = document.querySelector(".process__dots");
    var prevBtn = document.querySelector('[data-process="prev"]');
    var nextBtn = document.querySelector('[data-process="next"]');

    slides.forEach(function(_, i){
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Étape " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function(){
        track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: "smooth" });
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    var updateDots = function(){
      var center = track.scrollLeft + track.clientWidth / 2;
      var closest = 0, min = Infinity;
      slides.forEach(function(s, i){
        var mid = s.offsetLeft - track.offsetLeft + s.clientWidth / 2;
        var d = Math.abs(mid - center);
        if (d < min){ min = d; closest = i; }
      });
      dots.forEach(function(d, i){ d.classList.toggle("is-active", i === closest); });
    };
    track.addEventListener("scroll", function(){
      window.requestAnimationFrame(updateDots);
    }, { passive: true });

    var scrollByCard = function(dir){
      var card = slides[0];
      var gap = parseFloat(getComputedStyle(track).gap || 22);
      var amount = (card.clientWidth + gap) * dir;
      track.scrollBy({ left: amount, behavior: "smooth" });
    };
    if (prevBtn) prevBtn.addEventListener("click", function(){ scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function(){ scrollByCard(1); });
  }

  /* ---------- zones interactive rings ---------- */
  var tiers = document.querySelectorAll(".zone-tier");
  var rings = document.querySelectorAll(".ring");
  var centerLabel = document.querySelector("[data-zone-label-target]");
  if (tiers.length){
    tiers.forEach(function(tier){
      tier.addEventListener("click", function(){
        var target = tier.getAttribute("data-tier");
        tiers.forEach(function(t){ t.classList.toggle("is-active", t === tier); });
        rings.forEach(function(r){
          r.classList.toggle("is-active", r.getAttribute("data-tier") === target);
        });
        if (centerLabel){
          var label = tier.getAttribute("data-zone-label");
          if (label) centerLabel.textContent = label;
        }
      });
    });
  }

  /* ---------- footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
