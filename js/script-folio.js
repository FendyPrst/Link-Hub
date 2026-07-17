/* ==========================================================================
   FENDI'Z — PORTFOLIO
   Tab-based pane navigation
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------------
     Tab navigation — swap panes with smooth transition, no page scroll
     ------------------------------------------------------------------------ */
  function initTabs() {
    const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
    const panes = Array.from(document.querySelectorAll(".pane"));
    const indicator = document.getElementById("tabIndicator");
    const railWrap = document.getElementById("tabRail");

    if (!tabButtons.length || !panes.length) return;

    const isPhoneLayout = () => window.matchMedia("(max-width: 640px)").matches;

    function positionIndicator(btn) {
      if (!indicator || !btn || !railWrap) return;
      const railRect = railWrap.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      if (isPhoneLayout()) {
        // horizontal top bar — indicator slides left/right under the icon
        const offsetLeft = btnRect.left - railRect.left + (btnRect.width - 24) / 2;
        indicator.style.transform = `translateX(${offsetLeft}px)`;
      } else {
        // vertical left dock — indicator slides up/down beside the icon
        const offsetTop = btnRect.top - railRect.top + (btnRect.height - 46) / 2;
        indicator.style.transform = `translateY(${offsetTop}px)`;
      }
    }

    function activate(target, { updateHash = true } = {}) {
      const nextBtn = tabButtons.find((b) => b.dataset.target === target);
      const nextPane = document.getElementById("pane-" + target);
      if (!nextBtn || !nextPane) return;

      tabButtons.forEach((b) => b.classList.toggle("active", b === nextBtn));

      panes.forEach((p) => {
        if (p === nextPane) return;
        if (p.classList.contains("active")) {
          p.classList.add("leaving");
          p.classList.remove("active");
          setTimeout(() => p.classList.remove("leaving"), 600);
        }
      });

      // small delay so the leaving pane starts before the new one enters
      requestAnimationFrame(() => {
        nextPane.classList.add("active");
      });

      positionIndicator(nextBtn);

      if (updateHash) {
        history.replaceState(null, "", "#" + target);
      }
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => activate(btn.dataset.target));
    });

    // allow other elements (e.g. CTA button) to jump to a tab
    document.querySelectorAll("[data-goto]").forEach((el) => {
      el.addEventListener("click", () => activate(el.dataset.goto));
    });

    window.addEventListener("resize", () => {
      const activeBtn = tabButtons.find((b) => b.classList.contains("active"));
      positionIndicator(activeBtn);
    });

    // initial state — respect URL hash if present
    const initial = (location.hash || "#pengenalan").replace("#", "");
    const initialBtn = tabButtons.find((b) => b.dataset.target === initial);
    activate(initialBtn ? initial : "pengenalan", { updateHash: false });
  }

  /* ------------------------------------------------------------------------
     Dock collapse/expand toggle (left floating rail)
     ------------------------------------------------------------------------ */
  function initRailToggle() {
    const rail = document.getElementById("tabRail");
    const toggle = document.getElementById("railToggle");
    if (!rail || !toggle) return;

    const STORAGE_KEY = "fendiz-rail-collapsed";

    function setCollapsed(collapsed) {
      rail.classList.toggle("collapsed", collapsed);
      document.body.classList.toggle("rail-collapsed", collapsed);
      toggle.setAttribute("aria-expanded", String(!collapsed));
      try {
        localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
      } catch (e) {
        /* ignore storage errors (e.g. private browsing) */
      }
    }

    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }
    setCollapsed(saved === "1");

    toggle.addEventListener("click", () => {
      setCollapsed(!rail.classList.contains("collapsed"));
    });
  }

  /* ------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initRailToggle();
    initTabs();
  });
})();
