/* ==========================================================================
   FENDI — LINK HUB
   Interaction layer: cursor glow, ripple, scroll reveal
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------------
     2. Ripple effect bila button diklik
     ------------------------------------------------------------------------ */
  function initRipple() {
    const buttons = document.querySelectorAll(".link-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);

        ripple.classList.add("ripple");
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";

        btn.appendChild(ripple);

        window.setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Init
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initRipple();
  });
})();
