// =======================
// Profile Image Modal
// =======================
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

// =======================
// Scroll Reveal Animation
// =======================
const revealElements = document.querySelectorAll(
  "section, .card, .skill"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add("hidden");
  revealObserver.observe(el);
});

// =======================
// Skill Progress Animation
// =======================
const progressBars = document.querySelectorAll(".progress-bar div");

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = "0";
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

progressBars.forEach((bar) => {
  progressObserver.observe(bar);
});

// =======================
// Card 3D Hover Effect
// =======================
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

// =======================
// Scroll To Top Button
// =======================
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "⬆️";
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 15px;
  left: 15px;
  padding: 8px 10px;
  border-radius: 50%;
  border: none;
  font-size: 15px;
  cursor: pointer;
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  display: none;
  z-index: 999;
`;
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// =======================
// Dark / Light Mode
// =======================
const themeBtn = document.createElement("button");
themeBtn.innerHTML = "🌙";
themeBtn.style.cssText = `
  position: fixed;
  top: 25px;
  left: 25px;
  padding: 8px 12px;
  border-radius: 50%;
  border: none;
  font-size: 18px;
  cursor: pointer;
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  z-index: 999;
`;
document.body.appendChild(themeBtn);

// const currentTheme = localStorage.getItem("theme");
// if (currentTheme === "light") {
//   document.body.classList.add("light-mode");
//   themeBtn.innerHTML = "☀️";
// }
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
