# Technical Documentation — Assignment 4

## Student Information

- **Name:** Deemah Alzuabi
- **Student ID:** 202354030
- **Course:** SWE 363 — Web Engineering
- **Assignment:** Assignment 4

## 1. Introduction

Assignment 4 focuses on enhancing the personal portfolio developed in previous assignments by improving its functionality, visual design, interactivity, usability, performance, and documentation.

The website was developed using HTML, CSS, and vanilla JavaScript without relying on external front-end frameworks.

The main objective was to create a professional portfolio that combines personal information, academic experiences, technical projects, and interactive features within a consistent and responsive interface.

## 2. System Architecture

The application follows a client-side architecture consisting of three main layers.

| Layer | Technology | Responsibility |
|---|---|---|
| Structure | HTML5 | Defines the website sections and content. |
| Presentation | CSS3 | Controls styling, layouts, colors, responsiveness, and animations. |
| Behavior | JavaScript | Handles user interactions, filtering, sorting, API requests, and dynamic updates. |

External repository information is retrieved from the GitHub REST API.

```
User
  |
  v
HTML Interface
  |
  +-- CSS Styling and Animations
  |
  +-- JavaScript Functionality
        |
        +-- DOM Manipulation
        +-- Local Storage
        +-- GitHub REST API
```

The website does not require a dedicated backend server or database.

## 3. File Organization

| File or Directory | Responsibility |
|---|---|
| `index.html` | Website structure, sections, and content. |
| `css/styles.css` | Styling, animations, responsive layouts, and themes. |
| `js/script.js` | Interactive functionality and API integration. |
| `assets/images/` | Personal character and project images. |
| `assets/documents/` | Downloadable CV document. |
| `docs/` | Technical documentation and AI usage report. |
| `README.md` | Project overview, setup instructions, and user guide. |
| `.gitignore` | Excludes unnecessary files from version control. |

Separating responsibilities into different files improves readability, maintainability, and future development.

## 4. Visual Design and UI/UX Improvements

### 4.1 Color Palette

I independently researched existing portfolio websites to explore different color combinations and visual styles.

The previous color palette was redesigned because some colors appeared too dark or visually harsh.

The updated design uses softer shades of pink, black, gray, white, and gold to create a professional and elegant appearance.

CSS variables are used to maintain consistent colors throughout the website and support theme switching.

### 4.2 Typography

Typography was selected to improve readability and establish a clear visual hierarchy between headings, descriptions, labels, and buttons.

The design aims to balance a professional academic appearance with personal creativity.

### 4.3 Background Color Transitions

Different website sections use different background colors. Initially, the transitions between these sections appeared too sharp.

CSS linear gradients were introduced to create smoother transitions.

The gradient starts with the background color of the previous section and gradually transitions into the background color of the current section.

This improves visual continuity without requiring additional JavaScript or animation libraries.

## 5. Technical Implementation

### 5.1 Theme Management

The website supports light and dark modes.

JavaScript handles the theme button interaction, while CSS variables control the appearance of the website under each theme.

The selected theme is stored using `localStorage`, allowing the website to remember the user's preference after refreshing or reopening the page.

**Technical concepts:**

- CSS custom properties.
- JavaScript event listeners.
- DOM class manipulation.
- Browser Local Storage.

### 5.2 Personal Character

An AI-generated cartoon-style character was added to the About Me section to represent my personality without displaying my actual photograph.

The character is surrounded by decorative SVG circles, glow effects, and sparkle elements.

CSS positioning, transformations, transitions, and animations are used to control the visual presentation.

JavaScript is used to support scroll-based character interactions in the submitted project version.

The decorative elements are separated from the main image to allow independent styling and positioning.

### 5.3 Interactive Journey Timeline

The Journey section presents my academic, leadership, professional, and research experiences in chronological order.

Each milestone contains:

- A date.
- An experience category.
- A title.
- A description.
- A visual milestone node.

The timeline implementation combines HTML, CSS, SVG, and JavaScript.

JavaScript calculates the positions of milestone nodes and constructs an SVG path connecting them.

As the user scrolls through the section, the timeline progress is updated, and milestone elements receive active or revealed states.

CSS controls the appearance of these states, including visual transitions and highlighted nodes.

**Technical concepts:**

- SVG path manipulation.
- DOM positioning.
- `getBoundingClientRect()`.
- Scroll event handling.
- CSS transitions.
- `requestAnimationFrame()`.
- `ResizeObserver`.

The timeline layout is recalculated when necessary to account for changes in screen dimensions.

### 5.4 CV Download Functionality

The website provides a Download CV button in the Home section.

The CV is stored as a PDF file inside:

```
assets/documents/CV.pdf
```

The HTML `download` attribute allows the browser to download the linked PDF using the specified filename.

This functionality does not require JavaScript, a backend server, or an external file storage service.

### 5.5 Project Filtering

Project cards contain HTML data attributes that describe their technologies, names, and difficulty levels.

JavaScript reads these attributes and compares them with the user's selected filters.

Technology filtering and difficulty-level filtering work together to determine which projects should be displayed.

The filtering status is updated to provide feedback about the displayed projects.

**Technical concepts:**

- HTML data attributes.
- JavaScript arrays.
- Event listeners.
- DOM manipulation.
- Conditional statements.

### 5.6 Project Sorting

The website supports the following sorting options:

- Default order.
- Name: A to Z.
- Name: Z to A.

JavaScript sorts project elements according to their names and updates their order within the project container.

Sorting works together with the existing filtering functionality.

### 5.7 GitHub REST API Integration

The website retrieves public repository information using the GitHub REST API.

The implementation uses JavaScript's `fetch()` function with asynchronous programming.

The general workflow is:

1. Display a loading message.
2. Send a request to the GitHub REST API.
3. Validate the API response.
4. Convert the response into JavaScript data.
5. Filter the repositories according to the selected repository names.
6. Calculate repository statistics.
7. Create repository cards dynamically.
8. Display feedback if an error occurs.

Repository cards are generated using DOM manipulation rather than manually writing each card in HTML.

Using `textContent` to display repository information helps prevent external text from being interpreted as HTML.

### 5.8 GitHub Statistics

Assignment 4 enhances the existing GitHub integration by displaying additional repository statistics.

| Statistic | Calculation |
|---|---|
| Repositories Loaded | Number of repositories in the filtered array. |
| Total Stars | Sum of `stargazers_count` values. |
| Total Forks | Sum of `forks_count` values. |

The number of repositories is calculated using the array's `length` property.

The total number of stars and forks is calculated using the JavaScript `reduce()` method.

The statistics reuse the existing GitHub API response instead of making an additional API request.

These statistics represent the selected repositories displayed in the portfolio, not necessarily all repositories associated with the GitHub account.

### 5.9 Contact Section

The Contact section was enhanced by adding personal contact information alongside the contact form.

The layout includes:

- Email address.
- LinkedIn profile.
- Location.
- Contact form.

The contact information and form are organized into separate layout areas to improve clarity and usability.

JavaScript provides client-side validation and feedback for the form fields.

The form is a front-end demonstration and does not send messages to a backend server.

### 5.10 Back-to-Top Button

The back-to-top button provides convenient navigation on longer pages.

JavaScript monitors the user's scroll position and controls the visibility of the button.

When clicked, the button returns the user to the top of the page.

## 6. Responsive Design

The website uses responsive design techniques to support different screen sizes.

The implementation includes:

- CSS Grid for structured layouts.
- Flexbox for alignment and flexible arrangements.
- Media queries for screen-size adjustments.
- Flexible image dimensions.
- Responsive navigation.
- Adaptive timeline and contact layouts.

The objective is to maintain readability and usability across desktop, tablet, and mobile devices.

## 7. Code Quality

The following practices are used to improve code quality:

| Practice | Purpose |
|---|---|
| Separation of HTML, CSS, and JavaScript | Improves organization and maintainability. |
| Descriptive variable and class names | Makes code easier to understand. |
| Logical code sections | Helps locate specific functionality. |
| Comments | Explain important components and implementation decisions. |
| Reusable CSS classes | Reduce repeated styling rules. |
| CSS variables | Maintain consistent colors and themes. |
| Reusable JavaScript functions | Reduce unnecessary duplication. |
| API response validation | Helps handle unexpected responses. |

Unused variables, inconsistent indentation, unnecessary files, and repeated operations were identified as areas for further code review and cleanup.

## 8. Performance Optimization

### 8.1 Image Loading

Project images use lazy loading to avoid loading images unnecessarily before they are needed.

Asynchronous image decoding is also used for project images to reduce interference with page rendering.

WebP image compression was explored as an additional optimization to reduce image file sizes while maintaining acceptable visual quality.

### 8.2 Animation Performance

The website uses `requestAnimationFrame()` to coordinate animation updates with the browser's rendering process.

This is particularly useful for scroll-based animations.

CSS transformations and opacity changes are used for visual effects.

### 8.3 Scroll Event Handling

Passive scroll event listeners are used where appropriate.

Animation scheduling helps avoid unnecessary repeated updates during scrolling.

### 8.4 API Efficiency

GitHub repository statistics are calculated using the existing repository data.

This avoids an additional API request solely for calculating statistics.

### 8.5 Reduced Motion

The website includes reduced-motion support to accommodate users who prefer fewer animations.

This contributes to accessibility and a more comfortable browsing experience.

## 9. Accessibility

Accessibility considerations include:

- Semantic HTML elements.
- Alternative text for images.
- Labels for form fields.
- Accessible button labels.
- ARIA attributes for navigation and status messages.
- Visual feedback for interactive elements.
- Reduced-motion support.
- Responsive text and layouts.

These features aim to make the website easier to navigate and understand.

## 10. Testing and Verification

The following test cases are used to evaluate the website's functionality.

| Test Case | Expected Result |
|---|---|
| Navigation links | Navigate to the corresponding section. |
| Theme switching | Change between light and dark mode. |
| Theme persistence | Retain the selected theme after refreshing. |
| CV download | Download the correct PDF document. |
| Character animation | Display the character and its visual effects correctly. |
| Journey timeline | Update timeline progress during scrolling. |
| Technology filtering | Display projects matching the selected technology. |
| Level filtering | Display projects matching the selected difficulty level. |
| Combined filtering | Apply technology and level filters together. |
| Project sorting | Arrange projects according to the selected order. |
| GitHub API | Retrieve and display selected repositories. |
| GitHub statistics | Display values calculated from repository data. |
| API failure | Display appropriate error feedback. |
| Contact form validation | Identify missing or invalid input. |
| Back-to-top button | Return the user to the top of the page. |
| Responsive layout | Maintain a usable layout at different screen sizes. |

### Browser Compatibility

The website is designed for modern browsers supporting HTML5, CSS3, JavaScript, and the Fetch API.

Recommended browser testing includes:

- Google Chrome.
- Safari.
- Mozilla Firefox.
- Microsoft Edge.

Recommended screen sizes include desktop, tablet, and mobile layouts.

Actual browser compatibility and performance results should be recorded after completing the tests.

## 11. Known Limitations

- GitHub repository information depends on internet connectivity and API availability.
- GitHub API requests are subject to rate limits.
- Repository statistics only represent the selected repositories returned by the API.
- The contact form performs client-side validation but does not send messages through a backend service.
- Animation behavior may vary depending on device performance and browser settings.

## 12. User Guide

### Getting Started

Open the website using a modern browser or run it locally using Live Server.

### Navigation

Use the navigation bar to access Home, About, Journey, Projects, GitHub, and Contact.

### Changing the Theme

Click the theme button to switch between light and dark mode. The selected preference is saved locally.

### Downloading the CV

Click the Download CV button in the Home section to download the PDF document.

### Exploring the Journey

Scroll through the Journey section to view academic and professional milestones and their visual effects.

### Exploring Projects

Use the technology buttons and difficulty-level dropdown to filter projects.

Use the sorting dropdown to change the order of project cards.

### Viewing GitHub Repositories

Navigate to the GitHub section to view selected repositories and their statistics.

Repository links provide access to the corresponding GitHub pages.

### Contact Information

Use the provided email address or LinkedIn link to contact me directly.

The contact form demonstrates client-side input validation.

### Returning to the Top

Click the back-to-top button when it becomes visible.

## 13. AI Integration

ChatGPT was used for technical guidance, image generation, UI/UX suggestions, debugging, code review, performance optimization guidance, and documentation.

I independently researched portfolio designs, selected the website content and visual style, and made the final development decisions.

AI suggestions were reviewed against the existing project structure and adapted according to the assignment requirements.

Complete AI usage details, benefits, challenges, learning outcomes, modifications, and the required declaration are provided in [AI Usage Report](ai-usage-report.md).

## 14. Conclusion

Assignment 4 provided an opportunity to improve my existing portfolio by combining technical functionality with personal creativity and professional design.

The project helped me develop a better understanding of responsive layouts, CSS animations, JavaScript interactions, API integration, code organization, performance considerations, and technical documentation.

The portfolio provides a foundation that can continue to develop alongside my academic and professional experience.