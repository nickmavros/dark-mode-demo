// Theme management system
class ThemeManager {
  constructor() {
    this.storageKey = "theme-preference";
    this.init();
  }

  init() {
    // Load saved preference or default to light
    const savedTheme = localStorage.getItem(this.storageKey) || "light";
    this.applyTheme(savedTheme);
    this.setupToggleListeners();
  }

  applyTheme(theme) {
    const isDark = theme === "dark";

    // Update master toggle and header icon
    const masterToggle = document.getElementById("master-toggle");
    const themeIcon = document.getElementById("theme-icon");

    masterToggle.checked = isDark;
    themeIcon.name = isDark ? "sunny-outline" : "moon-outline";

    // Method 1: Manual CSS approach
    const manualSection = document.getElementById("manual-theme");
    const manualToggle = document.getElementById("manual-toggle");
    const manualStatus = document.getElementById("manual-status");

    if (isDark) {
      manualSection.classList.add("dark-theme");
      manualStatus.textContent = "Dark";
      manualStatus.className = "status-indicator status-dark";
    } else {
      manualSection.classList.remove("dark-theme");
      manualStatus.textContent = "Light";
      manualStatus.className = "status-indicator status-light";
    }

    manualToggle.checked = isDark;

    // Method 2: Ionic built-in system
    const ionicToggle = document.getElementById("ionic-toggle");
    const ionicStatus = document.getElementById("ionic-status");

    document.body.classList.toggle("dark", isDark);
    ionicToggle.checked = isDark;

    if (isDark) {
      ionicStatus.textContent = "Dark";
      ionicStatus.className = "status-indicator status-dark";
    } else {
      ionicStatus.textContent = "Light";
      ionicStatus.className = "status-indicator status-light";
    }

    // Save preference
    localStorage.setItem(this.storageKey, theme);
  }

  setupToggleListeners() {
    // Master toggle (controls both methods)
    document
      .getElementById("master-toggle")
      .addEventListener("ionChange", (e) => {
        this.applyTheme(e.detail.checked ? "dark" : "light");
      });

    // Header toggle button
    document
      .getElementById("master-toggle-btn")
      .addEventListener("click", () => {
        const currentTheme = this.getCurrentTheme();
        this.applyTheme(currentTheme === "dark" ? "light" : "dark");
      });

    // Manual toggle
    document
      .getElementById("manual-toggle")
      .addEventListener("ionChange", (e) => {
        this.applyTheme(e.detail.checked ? "dark" : "light");
      });

    // Ionic toggle
    document
      .getElementById("ionic-toggle")
      .addEventListener("ionChange", (e) => {
        this.applyTheme(e.detail.checked ? "dark" : "light");
      });
  }

  getCurrentTheme() {
    return localStorage.getItem(this.storageKey) || "light";
  }
}

// Form handlers
function handleManualSubmit() {
  const input = document.getElementById("manual-input");
  const value = input.value.trim();

  if (value) {
    alert(`Manual form submitted with value: "${value}"`);
    input.value = "";
  } else {
    alert("Please enter some text first!");
  }
}

function handleIonicSubmit() {
  const input = document.getElementById("ionic-input");
  if (input) {
    input.getInputElement().then((nativeInput) => {
      const value = nativeInput.value.trim();

      if (value) {
        alert(`Ionic form submitted with value: "${value}"`);
        nativeInput.value = "";
      } else {
        alert("Please enter some text first!");
      }
    });
  }
}

// Initialize theme manager when page loads
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});

// Also initialize when Ionic is ready (for better compatibility)
document.addEventListener("deviceready", () => {
  new ThemeManager();
});
