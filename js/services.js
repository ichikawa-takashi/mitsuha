document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".js-service-tab");
  const panels = document.querySelectorAll(".js-service-panel");

  if (!tabs.length || !panels.length) return;

  function activateService(serviceName) {
    tabs.forEach(function (tab) {
      const isActive = tab.dataset.service === serviceName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach(function (panel) {
      const isActive = panel.id === "service-" + serviceName;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  }

  tabs.forEach(function (tab) {
    ["mouseenter", "focus", "click"].forEach(function (eventName) {
      tab.addEventListener(eventName, function () {
        activateService(tab.dataset.service);
      });
    });
  });
});
