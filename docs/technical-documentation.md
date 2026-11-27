# Technical Documentation — Assignment 4

## Student Information

- **Name:** Deemah Alzuabi
- **Student ID:** 202354030
- **University:** King Fahd University of Petroleum and Minerals (KFUPM)
- **Course:** SWE 363 — Web Engineering
- **Assignment:** Assignment 4 — Personal Web Application

## 1. Project Overview

This project is an enhanced version of my personal portfolio developed throughout SWE 363. Assignment 4 focuses on improving visual design, interactivity, usability, code quality, performance, and documentation.

The website presents my academic background, technical skills, projects, research interests, and professional experiences through a responsive and interactive interface.

## 2. System Architecture

The website follows a single-page, client-side architecture without external frameworks or backend dependencies.

| Technology | Responsibility |
|---|---|
| HTML5 | Website structure and semantic content |
| CSS3 | Styling, layouts, themes, and animations |
| Vanilla JavaScript | User interactions and dynamic functionality |
| SVG | Decorative graphics and timeline visualization |
| GitHub REST API | Retrieving public repository information |
| localStorage | Saving theme preferences |

The separation of HTML, CSS, and JavaScript improves code readability and maintainability while keeping the project simple.

## 3. File Structure

```
assignment4/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── documents/
│       └── CV.pdf
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
├── .gitignore
└── README.md
```

The stylesheet and JavaScript file are organized into sections with descriptive comments to make individual components easier to locate and maintain.

## 4. Visual Design

### 4.1 Color Palette and Typography

I researched different portfolio websites and redesigned my previous color palette to create a softer, more elegant, and professional appearance.

The updated palette combines muted pink, gray, black, white, and gold.

CSS custom properties are used to maintain consistent colors throughout the website and simplify theme management.

Georgia is used for headings, while system sans-serif fonts are used for body text to improve readability without requiring external font downloads.

### 4.2 Background Transitions

CSS linear gradients are used to create smooth transitions between sections with different background colors.

This improves visual continuity and avoids sharp boundaries between sections.

## 5. Feature Implementation

### 5.1 Navigation System

The website uses anchor links to navigate between sections.

On smaller screens, the navigation changes into a hamburger menu. JavaScript controls its visibility and updates accessibility attributes.

### 5.2 Light and Dark Mode

CSS variables define the colors used in both themes.

JavaScript toggles the `dark-mode` class and stores the selected theme in `localStorage`, allowing the preference to persist after refreshing the page.

### 5.3 Personal Character Animation

An AI-generated character was added to the About Me section to represent my personality without displaying my actual photograph.

The character includes decorative SVG circles, glow effects, and sparkles.

CSS positioning, transformations, and animations control its appearance, while JavaScript supports scroll-based visual effects.

### 5.4 Interactive Journey Timeline

The timeline presents my academic, leadership, professional, and research experiences in chronological order.

Each milestone contains a date, category, title, description, and visual node.

The implementation uses:

- HTML to structure the milestones.
- CSS to control positioning, colors, and transitions.
- SVG to display the timeline path.
- JavaScript to calculate scroll progress and activate milestones.

The timeline uses `getBoundingClientRect()` to calculate element positions and `requestAnimationFrame()` to coordinate animation updates.

`ResizeObserver` helps recalculate the timeline layout when its dimensions change.

### 5.5 CV Download

The CV is stored locally as a PDF document.

```html
<a href="assets/documents/CV.pdf"
   download="Deemah_Alzuabi_CV.pdf">
    Download CV
</a>
```

The HTML `download` attribute allows visitors to download the document without requiring JavaScript or a backend service.

### 5.6 Project Filtering and Sorting

Project cards use HTML data attributes to store information about their technologies, names, and difficulty levels.

| Attribute | Purpose |
|---|---|
| `data-technologies` | Technology filtering |
| `data-level` | Difficulty-level filtering |
| `data-name` | Alphabetical sorting |

The `updateProjects()` function combines filtering and sorting to keep the displayed results consistent.

The original project order is preserved so users can return to the default arrangement.

### 5.7 GitHub API Integration

The website retrieves public repositories using the GitHub REST API and JavaScript's asynchronous `fetch()` function.

The implementation follows these steps:

1. Request repository data.
2. Validate the API response.
3. Filter the selected repositories.
4. Calculate repository statistics.
5. Generate repository cards dynamically.
6. Display appropriate feedback if an error occurs.

GitHub statistics are calculated from the selected repositories.

| Statistic | Calculation |
|---|---|
| Repositories Loaded | `filteredRepos.length` |
| Total Stars | Sum of `stargazers_count` using `reduce()` |
| Total Forks | Sum of `forks_count` using `reduce()` |

The statistics reuse the existing API response without requiring an additional request.

### 5.8 Contact Section

The contact section uses a two-column layout containing personal contact information and a contact form.

JavaScript validates the name, email address, and message fields before displaying feedback.

The contact form is a front-end demonstration and does not send messages to a backend server.

### 5.9 Back-to-Top Button

JavaScript monitors the scroll position and displays a button after the user scrolls down the page.

Clicking the button returns the user to the top of the website.

## 6. Responsive Design

The website uses CSS Grid, Flexbox, flexible dimensions, and media queries to adapt to different screen sizes.

| Device | Layout |
|---|---|
| Desktop | Multi-column layouts and full navigation |
| Tablet | Adjusted spacing and stacked layouts where necessary |
| Mobile | Hamburger navigation and single-column content |

The objective is to maintain readability, accessibility, and usability across devices.

## 7. Accessibility

The website includes several accessibility considerations:

- Semantic HTML elements.
- Descriptive alternative text for images.
- Labels for form fields.
- Accessible button labels and ARIA attributes.
- Keyboard navigation support.
- Dynamic status messages.
- Reduced-motion support for animations.

The `prefers-reduced-motion` setting helps accommodate users who prefer fewer visual animations.

## 8. Code Quality

The project follows these code quality practices:

- Separating HTML, CSS, and JavaScript into dedicated files.
- Using descriptive variable, function, and class names.
- Organizing code into logical sections.
- Adding comments to explain important functionality.
- Using reusable CSS classes and variables.
- Validating API responses and handling errors.
- Reviewing unnecessary code and inconsistent formatting.

These practices improve readability and simplify future maintenance.

## 9. Performance Optimization

| Technique | Purpose |
|---|---|
| Lazy loading | Delays loading off-screen project images. |
| Asynchronous image decoding | Reduces interference with page rendering. |
| `requestAnimationFrame()` | Coordinates animation updates with browser rendering. |
| Passive event listeners | Supports efficient scroll event handling. |
| Resize debouncing | Reduces unnecessary layout recalculations. |
| `ResizeObserver` | Detects changes in timeline dimensions. |
| API data reuse | Avoids additional requests for repository statistics. |
| System fonts | Avoids external font downloads. |



## 10. Testing and Compatibility

The website is designed for modern browsers, including Chrome, Safari, Firefox, and Edge.

The following test cases are used to evaluate its functionality.

| Test Case | Expected Result |
|---|---|
| Navigation | Opens the corresponding section. |
| Mobile menu | Opens and closes correctly. |
| Theme switching | Changes the theme and preserves the preference. |
| CV download | Downloads the correct PDF file. |
| Character animation | Displays visual effects correctly. |
| Journey timeline | Updates progress while scrolling. |
| Project filtering | Displays matching projects. |
| Project sorting | Arranges projects in the selected order. |
| GitHub API | Retrieves and displays selected repositories. |
| GitHub statistics | Calculates the correct statistics. |
| API error handling | Displays appropriate error feedback. |
| Contact form | Validates user input and displays feedback. |
| Back-to-top button | Returns the user to the top. |
| Responsive design | Adapts to different screen sizes. |

## 11. Known Limitations

- GitHub integration requires an internet connection and is subject to API rate limits.
- GitHub statistics represent the selected repositories returned by the API.
- The contact form performs client-side validation only.
- Animation performance may vary depending on the device and browser.
- The website does not provide offline functionality.

## 12. User Guide

| Feature | Instructions |
|---|---|
| Navigation | Select a section from the navigation bar. |
| Theme | Click the theme button to switch between light and dark mode. |
| CV | Click Download CV on the home page. |
| Journey | Scroll through the timeline to explore my experiences. |
| Projects | Use the technology and difficulty-level filters. |
| Sorting | Select an alphabetical sorting option. |
| GitHub | Explore repository cards, statistics, and repository links. |
| Contact | Use the provided email, LinkedIn link, or demonstration form. |
| Back to Top | Click the arrow button to return to the beginning of the page. |

Setup instructions and troubleshooting information are available in the [README](../README.md).

## 13. Assignment Evolution

| Assignment | Main Contributions |
|---|---|
| Assignment 1 | HTML structure and portfolio content. |
| Assignment 2 | CSS styling and responsive design. |
| Assignment 3 | JavaScript functionality, project filtering, sorting, and GitHub API integration. |
| Assignment 4 | Visual redesign, character animation, interactive timeline, CV download, GitHub statistics, contact layout, and documentation improvements. |

## 14. AI Integration

ChatGPT was used for image generation, technical guidance, UI/UX suggestions, debugging, code review, performance optimization guidance, and documentation support.

I independently researched portfolio designs, selected the final visual style, prepared the personal content, and made the final implementation decisions.

Detailed AI usage, learning outcomes, modifications, and the required declaration are available in the [AI Usage Report](ai-usage-report.md).

## 15. Conclusion

Assignment 4 helped me improve my portfolio by combining technical functionality, personal creativity, and professional design.

Through this assignment, I developed a better understanding of responsive layouts, CSS animations, JavaScript interactions, API integration, code quality, and technical documentation.

The website provides a foundation for presenting my academic and professional experiences and can be expanded as I develop new skills and complete additional projects.