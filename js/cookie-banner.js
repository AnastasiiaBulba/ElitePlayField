// Cookie banner logic
document.addEventListener("DOMContentLoaded", function () {
  var banner = document.getElementById("cookie-banner");

  if (!banner) return;

  // Check if user has already accepted cookies
  if (!localStorage.getItem("cookieConsent")) {
    banner.style.display = "flex";
  }

  var acceptBtn = banner.querySelector(".cookie-banner__accept");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      banner.style.display = "none";
    });
  }

  // For testing: clear localStorage when pressing Ctrl+Shift+C
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      localStorage.removeItem("cookieConsent");
      banner.style.display = "flex";
      console.log("Cookie consent cleared for testing");
    }
  });
});
