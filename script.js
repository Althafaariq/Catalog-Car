document.addEventListener("DOMContentLoaded", () => {
  // ===== Modal / Lightbox =====
  const modal = document.getElementById("lightbox");
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".modal-close");
  const spinner = modal.querySelector(".spinner");
  const FALLBACK = "https://source.unsplash.com/1200x800/?luxury-car";

  function openModal(src, title) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    // reset state
    spinner.style.display = "block";
    modalImg.style.display = "none";
    caption.textContent = title || "";

    // load image
    modalImg.onload = () => {
      spinner.style.display = "none";
      modalImg.style.display = "block";
    };
    modalImg.onerror = () => {
      modalImg.src = FALLBACK; // fallback otomatis
    };
    modalImg.src = src;
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modalImg.removeAttribute("src");
  }

  // Open from buttons
  document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-img");
      const title =
        btn.closest(".card")?.querySelector("h2")?.textContent || "";
      openModal(src, title);
    });
  });

  // Close handlers
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(); // klik overlay
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ===== Back to Top =====
  const backToTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    backToTopBtn.style.display = y > 320 ? "block" : "none";
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
