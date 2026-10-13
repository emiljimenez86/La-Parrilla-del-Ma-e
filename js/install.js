if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

const DISMISS_KEY = "parrilla-mane-hide-install";
let deferredPrompt;
const installBar = document.getElementById("installBar");
const installBtn = document.getElementById("installBtn");
const installClose = document.getElementById("installClose");
const iosInstructions = document.getElementById("ios-instructions");
const androidInstructions = document.getElementById("android-instructions");

function isAppInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function hideInstallBar() {
  if (installBar) installBar.classList.add("is-hidden");
  if (androidInstructions) androidInstructions.style.display = "none";
}

function hideAllInstallUi() {
  document.documentElement.classList.add("is-installed");
  hideInstallBar();
  if (iosInstructions) {
    iosInstructions.classList.add("is-hidden");
    iosInstructions.style.display = "none";
  }
}

if (isAppInstalled()) {
  hideAllInstallUi();
} else if (localStorage.getItem(DISMISS_KEY) === "1") {
  hideInstallBar();
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

window.addEventListener("appinstalled", () => {
  localStorage.setItem(DISMISS_KEY, "1");
  hideAllInstallUi();
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (choice.outcome === "accepted") {
        localStorage.setItem(DISMISS_KEY, "1");
        hideAllInstallUi();
      }
      return;
    }

    if (androidInstructions) {
      androidInstructions.style.display = "block";
    }
  });
}

if (installClose) {
  installClose.addEventListener("click", () => {
    localStorage.setItem(DISMISS_KEY, "1");
    hideInstallBar();
  });
}

if (
  document.documentElement.classList.contains("is-ios") &&
  !isAppInstalled() &&
  iosInstructions
) {
  iosInstructions.style.display = "block";
}
