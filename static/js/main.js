(() => {
  const lightbox = document.querySelector(".lightbox");
  const image = lightbox?.querySelector("img");
  const caption = lightbox?.querySelector("p");
  const download = lightbox?.querySelector("a");
  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const source = trigger.dataset.lightbox;
      image.src = source;
      image.alt = trigger.dataset.title || "Expanded portfolio image";
      caption.textContent = trigger.dataset.title || "";
      download.href = source;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
  lightbox?.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  document.querySelector("#copy-phone")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(button.dataset.phone);
      button.querySelector("span").textContent = "Copied";
      window.setTimeout(() => { button.querySelector("span").textContent = "Copy"; }, 1800);
    } catch {
      button.querySelector("span").textContent = "Select manually";
    }
  });
  document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:shanta15-4953@diu.edu.bd?subject=${subject}&body=${body}`;
  });
})();
