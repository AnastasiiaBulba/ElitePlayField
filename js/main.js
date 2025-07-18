// Dynamic loading of header and footer
function loadPartial(id, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

function createMobileMenu() {
  // Mobile menu logic
  const burger = document.getElementById("burger-menu");
  const modal = document.getElementById("mobile-menu-modal");
  const closeBtn = document.getElementById("close-mobile-menu");

  console.log("createMobileMenu called");
  console.log("burger:", burger);
  console.log("modal:", modal);
  console.log("closeBtn:", closeBtn);

  if (burger && modal) {
    console.log("Adding click event to burger");
    burger.addEventListener("click", function () {
      console.log("Burger clicked!");
      modal.classList.add("active");
      burger.classList.add("active");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("active");
      burger.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
        burger.classList.remove("active");
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        modal.classList.remove("active");
        burger.classList.remove("active");
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    });

    // Close menu when clicking on any link
    modal.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        modal.classList.remove("active");
        burger.classList.remove("active");
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      });
    });
  }
}

function enableSmoothScrollAnchors() {
  function isIndexPage() {
    const path = location.pathname.replace(/\\/g, "/");
    return (
      path === "/" ||
      path.endsWith("/index.html") ||
      path === "/index.html" ||
      path === "" ||
      location.protocol === "file:"
    );
  }

  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        const target = document.querySelector(hash);
        if (isIndexPage() && target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Close mobile menu if open
          const modal = document.getElementById("mobile-menu-modal");
          const burger = document.getElementById("burger-menu");
          if (modal && modal.classList.contains("active")) {
            modal.classList.remove("active");
            burger.classList.remove("active");
          }
        } else if (!target) {
          // If not on index or element doesn't exist — redirect to home with hash
          e.preventDefault();
          window.location.href = "./" + hash;
        }
      }
    });
  });
}

// Main initialization file
// Loading header/footer, mobile menu, smooth scrolling, footer year, cookie banner

document.addEventListener("DOMContentLoaded", function () {
  loadPartial("header", "partials/header.html", function () {
    enableSmoothScrollAnchors();
  });
  loadPartial("footer", "partials/footer.html");
  loadPartial("mobile-menu", "partials/mobile-menu.html", function () {
    console.log("Mobile menu loaded, calling createMobileMenu");
    createMobileMenu();
  });
  // footer-year.js and cookie-banner.js are self-subscribed to DOMContentLoaded
});
