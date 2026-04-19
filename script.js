const profileImg = document.getElementById("profile-img");
const modal = document.getElementById("profile-modal");
const closeModal = document.getElementById("close-modal");

profileImg.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

const revealElements = document.querySelectorAll("section, .card, .skill");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => {
  el.classList.add("hidden");
  revealObserver.observe(el);
});

// Card Hover Effect
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 15;
    const rotateY = (x - rect.width / 2) / 15;

    card.style.transform = `
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(-6px)";
  });
});

// Dark / Light Mode
const themeBtn = document.createElement("button");
themeBtn.innerHTML = "🌙";
themeBtn.style.cssText = `
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 6px 12px;
  border-radius: 50%;
  border: none;
  font-size: 27px;
  cursor: pointer;
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  z-index: 999;
`;
document.body.appendChild(themeBtn);

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeBtn.innerHTML = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = "🌙";
  }
});
