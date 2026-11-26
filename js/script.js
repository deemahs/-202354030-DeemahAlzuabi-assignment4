// ========================================
// Select Elements
// ========================================

// Theme toggle button and form-related elements
const themeButton = document.getElementById("themeButton");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

// Project filtering elements
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterState = document.getElementById("filterStatus");

// Project sorting and level filtering elements
const projectSort = document.getElementById("projectSort");
const projectsGrid = document.getElementById("projectsGrid");

// Store the original card order so "Default" sort can restore it
const originalProjects = Array.from(projectCards);
const levelSelect = document.getElementById("levelSelect");

// ========================================
// Dark / Light Mode
// ========================================

/**
 * Apply the given theme to the page and update the toggle button.
 * @param {boolean} isDark - Whether dark mode should be active.
 */
function applyTheme(isDark) {
  // Toggle the dark-mode class on the body element
  document.body.classList.toggle("dark-mode", isDark);

  // Switch the button emoji to reflect the current theme
  themeButton.textContent = isDark ? "☀️" : "🌙";

  // Update ARIA attributes so screen readers announce the current state
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  themeButton.setAttribute("aria-pressed", String(isDark));
}

// Restore the saved theme from localStorage on page load.
// Wrapped in try/catch in case localStorage is unavailable (e.g., private browsing).
try {
  const savedTheme = localStorage.getItem("portfolioTheme");

  applyTheme(savedTheme === "dark");
} catch (error) {
  applyTheme(false);
  console.warn("Could not load theme preference:", error);
}

// Toggle theme on button click and save the preference
themeButton.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);

  // Save the new theme to localStorage so it persists across visits
  try {
    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Could not save theme preference:", error);
  }
});

// ========================================
// Mobile Navigation
// ========================================

function toggleMenu(isOpen) {
  navLinks.classList.toggle("active", isOpen);
  menuToggle.classList.toggle("active", isOpen);

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
}

// Open or close the mobile menu
menuToggle.addEventListener("click", function () {
  const isOpen = !navLinks.classList.contains("active");
  toggleMenu(isOpen);
});

// Close the menu when a navigation link is selected
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    toggleMenu(false);
  });
});

// Close the menu using the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && navLinks.classList.contains("active")) {
    toggleMenu(false);
    menuToggle.focus();
  }
});

// Reset the menu when switching to desktop
window
  .matchMedia("(max-width: 650px)")
  .addEventListener("change", function (event) {
    if (!event.matches) {
      toggleMenu(false);
    }
  });

// ========================================
// Dynamic Project Filtering and Sorting
// ========================================

// Track the currently selected technology filter (default: show all)
let selectedFilter = "all";

/**
 * Update project visibility based on the active technology filter,
 * level filter, and sort order. This single function handles all
 * three features together so they always stay in sync.
 */
function updateProjects() {
  const sortType = projectSort.value;

  // Start with the original project order
  const sortedProjects = [...originalProjects];

  // Sort projects alphabetically using localeCompare
  if (sortType === "az") {
    sortedProjects.sort(function (a, b) {
      return a.dataset.name.localeCompare(b.dataset.name);
    });
  } else if (sortType === "za") {
    sortedProjects.sort(function (a, b) {
      return b.dataset.name.localeCompare(a.dataset.name);
    });
  }

  let visibleCount = 0;

  sortedProjects.forEach(function (card) {
    // Re-append each card in the new sorted order
    projectsGrid.appendChild(card);

    // Check if the card matches the selected technology filter
    const technologies = card.dataset.technologies.split(" ");
    const matchesTechnology =
      selectedFilter === "all" || technologies.includes(selectedFilter);

    // Check if the card matches the selected level filter.
    // Uses strict equality (===), so data-level values must be lowercase.
    const selectedLevel = levelSelect.value;
    const matchesLevel =
      selectedLevel === "all" || card.dataset.level === selectedLevel;

    // A card is visible only if it passes both filters
    const matches = matchesTechnology && matchesLevel;
    card.hidden = !matches;
    if (matches) {
      visibleCount++;
    }
  });

  // Update the status message to tell the user how many projects are shown
  if (visibleCount === 0) {
    filterState.textContent =
      "No projects found for this filter. Try another technology.";
  } else {
    const projectWord = visibleCount === 1 ? "project" : "projects";

    if (selectedFilter === "all") {
      filterState.textContent = `Showing ${visibleCount} ${projectWord}.`;
    } else {
      const selectedButton = document.querySelector(
        `.filter-btn[data-filter="${selectedFilter}"]`,
      );

      filterState.textContent =
        `Showing ${visibleCount} ${projectWord} using ` +
        `${selectedButton.textContent.trim()}.`;
    }
  }
}

// Attach click handlers to each technology filter button
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedFilter = button.dataset.filter;

    // Update active state and ARIA attributes on all buttons
    filterButtons.forEach(function (item) {
      const selected = item === button;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    updateProjects();
  });
});

// Re-filter when the sort order or level selection changes
projectSort.addEventListener("change", updateProjects);
levelSelect.addEventListener("change", updateProjects);

// Run once on page load to set the initial display
updateProjects();

// ========================================
// Assignment 3 - GitHub API Integration
// ========================================

// GitHub username used for the API request
const githubUsername = "deemahs";

// DOM elements for the GitHub section
const githubStatus = document.getElementById("githubStatus");
const githubRepos = document.getElementById("githubRepos");
const githubStats = document.getElementById("githubStats");
const retryGithub = document.getElementById("retryGithub");

/**
 * Fetch and display selected GitHub repositories using the REST API.
 * Shows loading state, handles errors, and provides a retry button.
 */
async function loadGitHubRepos() {
  // Reset the UI before making a new request
  githubStatus.textContent = "Loading repositories...";
  githubRepos.replaceChildren();
  retryGithub.hidden = true;
  githubStats.hidden = true;
  githubStats.replaceChildren();

  try {
    // Send a GET request to the GitHub REST API
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?sort=updated&per_page=6`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const repos = await response.json();
    // Validate that the API returned an array
    if (!Array.isArray(repos)) {
      throw new Error("Invalid GitHub API response");
    }

    // Filter the response to show only specific selected repositories
    const selectedRepos = [
      "202354030-DeemahAlzuabi-assignment4",
      "202354030-DeemahAlzuabi-assignment3",
      "202354030-DeemahAlzuabi-assignment2",
      "202354030-DeemahAlzuabi-assignment1",
    ];

    const filteredRepos = repos.filter(function (repo) {
      return selectedRepos.includes(repo.name);
    });

    if (filteredRepos.length === 0) {
      githubStatus.textContent = "No public repositories available.";
      return;
    }
    // Show GitHub statistics
    githubStats.hidden = false;

    githubStats.innerHTML =
      '<div class="stat-item"><span class="stat-number">' +
      filteredRepos.length +
      '</span><span class="stat-label">Repos Loaded</span></div>' +
      '<div class="stat-item"><span class="stat-number">' +
      filteredRepos.reduce(function (sum, repo) {
        return sum + (repo.stargazers_count || 0);
      }, 0) +
      '</span><span class="stat-label">Total Stars</span></div>' +
      '<div class="stat-item"><span class="stat-number">' +
      filteredRepos.reduce(function (sum, repo) {
        return sum + (repo.forks_count || 0);
      }, 0) +
      '</span><span class="stat-label">Total Forks</span></div>';
    // Create a card for each repository with its details and link
    filteredRepos.forEach(function (repo) {
      const card = document.createElement("article");
      card.className = "github-card";

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent = repo.description || "No description available.";

      const language = document.createElement("p");
      language.textContent = `Language: ${repo.language || "Not specified"}`;

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = "View Repository";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(title, description, language, link);
      githubRepos.appendChild(card);
    });

    githubStatus.textContent = `Showing ${filteredRepos.length} selected repositories.`;
  } catch (error) {
    // Display a user-friendly error message and show the retry button
    console.error("GitHub API Error:", error);

    githubStatus.textContent = "Unable to load repositories. Please try again.";

    retryGithub.hidden = true;
  }
}

// Allow the user to retry the API request if it fails
retryGithub.addEventListener("click", loadGitHubRepos);

// Fetch repositories on page load
loadGitHubRepos();

// ========================================
// Contact Form Validation
// ========================================

// Handle contact form submission with client-side validation
contactForm.addEventListener("submit", function (event) {
  // Prevent the default browser form submission
  event.preventDefault();

  // Get references to form input fields
  const nameField = document.getElementById("name");

  const emailField = document.getElementById("email");

  const messageField = document.getElementById("message");

  // Clear previous validation states from all fields
  const fields = [nameField, emailField, messageField];

  fields.forEach(function (field) {
    field.removeAttribute("aria-invalid");
  });

  // Read and trim the input values
  const name = nameField.value.trim();

  const email = emailField.value.trim();

  const message = messageField.value.trim();

  // Validate each field in order: name → email → email format → message
  let error = "";
  let invalidFields = null;

  if (!name) {
    error = "Please enter your name.";
    invalidFields = nameField;
  } else if (!email) {
    error = "Please enter your email.";
    invalidFields = emailField;
  } else if (
    !emailField.validity.valid ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    // Check both the browser's built-in validation and a regex pattern
    error = "Please enter a valid email address.";
    invalidFields = emailField;
  } else if (!message) {
    error = "Please enter your message.";
    invalidFields = messageField;
  }

  // If validation fails, mark the field as invalid and focus it
  if (error) {
    invalidFields.setAttribute("aria-invalid", "true");

    formMessage.className = "form-message error";
    formMessage.textContent = error;

    invalidFields.focus();

    return;
  }

  // All fields are valid — show a success confirmation message

  formMessage.className = "form-message success";

  formMessage.textContent =
    `Thank you, ${name}! Your form is valid. ` +
    "This portfolio demo does not send messages.";

  // Reset the form fields after successful validation
  contactForm.reset();
});

// ========================================
// Current Year
// ========================================

// Set the footer copyright year to the current year automatically
year.textContent = new Date().getFullYear();

// ========================================
// Back to Top Button
// ========================================

const backToTop = document.getElementById("backToTop");

// Show the back-to-top button when the user scrolls past 300 pixels
window.addEventListener("scroll", function () {
  backToTop.hidden = window.scrollY < 300;
});

// Scroll smoothly to the top of the page when the button is clicked
backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Set initial visibility based on the current scroll position
backToTop.hidden = window.scrollY < 300;
// ========================================
// Animated Character - Scroll Parallax
// ========================================

const characterWrapper = document.querySelector(".character-wrapper");

const characterImg = document.querySelector(".character-img");

const characterGlow = document.querySelector(".character-glow");

const aboutSection = document.getElementById("about");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function animateCharacterOnScroll() {
  if (!characterWrapper || !aboutSection || prefersReducedMotion) {
    return;
  }

  const rect = aboutSection.getBoundingClientRect();
  const windowH = window.innerHeight;

  let sectionProgress = (windowH - rect.top) / (windowH + rect.height);

  sectionProgress = Math.max(0, Math.min(1, sectionProgress));

  let opacity = 1;
  let translateY = 0;
  let scale = 1;

  if (sectionProgress < 0.2) {
    // Stage 1: Entrance
    const t = sectionProgress / 0.2;

    opacity = t;
    scale = 0.9 + 0.1 * t;
    translateY = 30 * (1 - t);
  } else if (sectionProgress < 0.6) {
    // Stage 2: Parallax
    const t = (sectionProgress - 0.2) / 0.4;

    translateY = -15 * t;
  } else if (sectionProgress < 0.85) {
    // Stage 3: Floating
    translateY = -15;

    characterWrapper.classList.add("floating");
  } else {
    // Stage 4: Transition out
    const t = (sectionProgress - 0.85) / 0.15;

    translateY = -15 - 20 * t;
    opacity = 1 - 0.3 * t;
    scale = 1 - 0.03 * t;

    characterWrapper.classList.remove("floating");
  }

  if (sectionProgress < 0.6) {
    characterWrapper.classList.remove("floating");
  }

  characterWrapper.style.opacity = opacity;

  characterWrapper.style.transform = `translateY(${translateY}px) scale(${scale})`;

  if (characterGlow) {
    characterGlow.style.opacity = opacity * 0.6;
  }
}

let tickingChar = false;

window.addEventListener(
  "scroll",
  function () {
    if (!tickingChar) {
      window.requestAnimationFrame(function () {
        animateCharacterOnScroll();
        tickingChar = false;
      });

      tickingChar = true;
    }
  },
  { passive: true },
);

window.addEventListener("load", animateCharacterOnScroll);
window.addEventListener("resize", animateCharacterOnScroll);

if (prefersReducedMotion && characterWrapper) {
  characterWrapper.style.opacity = "1";
  characterWrapper.style.transform = "none";
}

/* =========================================
   5. JOURNEY TIMELINE — SVG SCROLL ANIMATION
   ========================================= */

var timelineSvg = document.getElementById("timelineSvg");
var timelinePathBg = document.getElementById("timelinePathBg");
var timelinePathFill = document.getElementById("timelinePathFill");
var timelineIndicator = document.getElementById("timelineIndicator");
var timelineEl = document.getElementById("timeline");
var milestones = document.querySelectorAll(".milestone");

var nodeAbsoluteYs = [];
var nodeRelativeYs = [];
var totalPathLength = 0;

function buildTimelinePath() {
  if (!timelineSvg || !timelineEl || milestones.length === 0) return 0;

  var timelineRect = timelineEl.getBoundingClientRect();
  var svgW = timelineRect.width;
  var svgH = timelineRect.height;

  // Set viewBox
  timelineSvg.setAttribute("viewBox", "0 0 " + svgW + " " + svgH);
  timelineSvg.style.width = svgW + "px";
  timelineSvg.style.height = svgH + "px";

  var points = [];
  nodeAbsoluteYs = [];
  nodeRelativeYs = [];

  milestones.forEach(function (ms) {
    var node = ms.querySelector(".milestone-node");
    if (!node) return;

    var nodeRect = node.getBoundingClientRect();

    var x = nodeRect.left - timelineRect.left + nodeRect.width / 2;
    var y = nodeRect.top - timelineRect.top + nodeRect.height / 2;

    points.push({ x: x, y: y });
    nodeRelativeYs.push(y);

    nodeAbsoluteYs.push(nodeRect.top + window.scrollY + nodeRect.height / 2);
  });

  if (points.length < 2) return 0;
  var d = "M " + points[0].x + " " + points[0].y;

  for (var i = 0; i < points.length - 1; i++) {
    var p0 = points[i === 0 ? i : i - 1];
    var p1 = points[i];
    var p2 = points[i + 1];
    var p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    var cp1x = p1.x + (p2.x - p0.x) / 6;
    var cp1y = p1.y + (p2.y - p0.y) / 6;
    var cp2x = p2.x - (p3.x - p1.x) / 6;
    var cp2y = p2.y - (p3.y - p1.y) / 6;

    d +=
      " C " +
      cp1x +
      " " +
      cp1y +
      ", " +
      cp2x +
      " " +
      cp2y +
      ", " +
      p2.x +
      " " +
      p2.y;
  }

  timelinePathBg.setAttribute("d", d);
  timelinePathFill.setAttribute("d", d);

  var pathLength = timelinePathFill.getTotalLength();

  timelinePathFill.style.strokeDasharray = pathLength;
  timelinePathFill.style.strokeDashoffset = pathLength;

  return pathLength;
}

// On scroll
function animateTimelineOnScroll() {
  if (!timelineEl || !timelinePathFill || totalPathLength === 0) return;
  if (nodeAbsoluteYs.length < 2) return;

  if (prefersReducedMotion) {
    milestones.forEach(function (ms) {
      ms.classList.add("revealed", "active");
    });

    timelinePathFill.style.strokeDashoffset = 0;
    return;
  }
  var windowH = window.innerHeight;
  var scrollY = window.scrollY;

  // Activation point: viewport center
  var activationY = scrollY + windowH * 0.5;

  // First and last node absolute Y positions
  var firstNodeY = nodeAbsoluteYs[0];
  var lastNodeY = nodeAbsoluteYs[nodeAbsoluteYs.length - 1];
  var span = lastNodeY - firstNodeY;

  if (span <= 0) return;

  // Calculate progress: 0 when activation reaches first node, 1 at last node
  var progress = (activationY - firstNodeY) / span;
  progress = Math.max(0, Math.min(1, progress));

  // Animate fill
  var offset = totalPathLength * (1 - progress);
  timelinePathFill.style.strokeDashoffset = offset;

  // Position the circle indicator
  if (timelineIndicator && progress > 0) {
    try {
      var point = timelinePathFill.getPointAtLength(totalPathLength * progress);

      timelineIndicator.setAttribute("cx", point.x);
      timelineIndicator.setAttribute("cy", point.y);
      timelineIndicator.style.r = progress > 0.02 ? "7" : "5";
      timelineIndicator.classList.add("visible");
    } catch (_) {}
  } else if (timelineIndicator) {
    timelineIndicator.classList.remove("visible");
  }

  // Activate milestones based on SVG progress position
  // Each milestone is activated when the SVG line has reached its node
  milestones.forEach(function (ms, idx) {
    if (idx >= nodeAbsoluteYs.length) return;

    var nodeProgress = (nodeAbsoluteYs[idx] - firstNodeY) / span;

    if (progress >= nodeProgress - 0.01) {
      ms.classList.add("revealed", "active");
    }
  });
}

/**
 * Initialise the timeline. Build path, then animate.
 */
function initTimeline() {
  totalPathLength = buildTimelinePath() || 0;
  animateTimelineOnScroll();
}

// Use ResizeObserver for dynamic recalculation
if ("ResizeObserver" in window && timelineEl) {
  var timelineResizeObserver = new ResizeObserver(function () {
    totalPathLength = buildTimelinePath() || 0;
    animateTimelineOnScroll();
  });

  timelineResizeObserver.observe(timelineEl);
}

// Also rebuild on resize for orientation changes / fallback
var resizeTimer;

window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(function () {
    totalPathLength = buildTimelinePath() || 0;
    animateTimelineOnScroll();
  }, 200);
});

// Scroll handler (uses rAF for performance, passive listener)
var ticking = false;

window.addEventListener(
  "scroll",
  function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        animateTimelineOnScroll();
        ticking = false;
      });

      ticking = true;
    }
  },
  { passive: true },
);

window.addEventListener("load", initTimeline);
