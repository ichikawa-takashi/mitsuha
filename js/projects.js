document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".js-project-modal");
  const openButtons = document.querySelectorAll(".js-project-open");

  if (!modal || !openButtons.length) return;

  const closeButtons = modal.querySelectorAll(".js-project-close");
  const beforeImage = modal.querySelector(".js-project-before");
  const afterImage = modal.querySelector(".js-project-after");
  const projectNumber = modal.querySelector(".js-project-number");
  let lastFocusedElement = null;

  function openModal(button) {
    lastFocusedElement = button;
    beforeImage.src = button.dataset.before;
    afterImage.src = button.dataset.after;
    projectNumber.textContent = button.dataset.project;
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("is-modal-open");
    document.body.classList.add("is-modal-open");
    modal.querySelector(".project-modal__close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("is-modal-open");
    document.body.classList.remove("is-modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openModal(button);
    });
  });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
});
