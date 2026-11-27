# Personal Portfolio Website — Assignment 4

## Student Information

- **Name:** Deemah Alzuabi
- **Student ID:** 202354030
- **Course:** SWE 363 — Web Engineering
- **Assignment:** Assignment 4

## 1. Project Overview

This project is a personal portfolio website developed as part of SWE 363. It presents my academic background, technical skills, projects, professional experiences, and research interests.

Assignment 4 builds upon my previous portfolio by improving its visual design, interactivity, usability, code quality, and documentation.

My goal was to create a professional, elegant, and user-friendly portfolio that reflects my personality and interests while applying the web development concepts learned throughout the course.

## Live Deployment

The portfolio is deployed using GitHub Pages
and is publicly accessible.
View Live Portfolio : 
https://deemahs.github.io/-202354030-DeemahAlzuabi-assignment4/

## 2. Features

### Personal and Visual Features

- Redesigned color palette and typography.
- Light and dark mode with saved theme preferences.
- AI-generated personal character with visual effects and animation.
- Smooth background transitions between sections.
- Interactive academic and professional journey timeline.
- Downloadable CV in PDF format.
- Contact information displayed alongside the contact form.

### Functional Features

- Project filtering by technology.
- Project filtering by difficulty level.
- Alphabetical project sorting.
- Dynamic GitHub repository integration using the GitHub REST API.
- GitHub repository statistics, including loaded repositories, total stars, and total forks.
- GitHub API error handling.
- Contact form validation and feedback.
- Responsive navigation menu.
- Back-to-top button.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling, layouts, animations, and responsive design |
| JavaScript | Interactive functionality and DOM manipulation |
| SVG | Decorative elements and timeline visualization |
| GitHub REST API | Retrieving repository information |
| Local Storage | Saving theme preferences |
| Git and GitHub | Version control and repository management |
| ChatGPT | Technical guidance, image generation, debugging, and documentation |

## 4. Project Structure

```
assignment4/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── personal-character.png
│   │   ├── Badelna.png
│   │   └── Flowly.png
│   └── documents/
│       └── CV.pdf
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
├── .gitignore
└── README.md
```

## 5. Setup and Installation

### Requirements

- A modern web browser.
- Visual Studio Code or another code editor.
- Git, if cloning the repository.
- An internet connection for GitHub API functionality.

No additional packages, frameworks, or backend installation are required.

### Step 1: Clone the Repository

Copy the repository URL from GitHub and run:

```bash
git clone <repository-url>
```

### Step 2: Open the Project

Open the downloaded project folder in Visual Studio Code.

### Step 3: Run the Website

**Option 1 — Live Server (Recommended)**

1. Install the Live Server extension in Visual Studio Code.
2. Open `index.html`.
3. Right-click and select **Open with Live Server**.
4. The website will open in your browser.

**Option 2 — Open Directly**

Open `index.html` directly in a web browser.

## 6. User Guide

| Feature | How to Use |
|---|---|
| Navigation | Use the navigation bar to move between sections. |
| Theme Switch | Click the theme button to switch between light and dark mode. |
| Download CV | Click the Download CV button on the home page. |
| Journey Timeline | Scroll through the Journey section to explore my experiences. |
| Technology Filtering | Select a technology to display matching projects. |
| Level Filtering | Select a difficulty level from the dropdown menu. |
| Project Sorting | Select an alphabetical sorting option. |
| GitHub Repositories | Explore the displayed repositories and follow their GitHub links. |
| GitHub Statistics | View the statistics calculated from the selected repositories. |
| Contact Form | Enter the required information and submit the form for validation. |
| Back to Top | Click the arrow button to return to the top of the page. |

## 7. Code Quality and Performance

The project follows a structured approach to web development by separating HTML, CSS, and JavaScript into dedicated files.

The implementation includes:

- Reusable CSS classes and variables.
- Logical code organization and descriptive comments.
- Responsive layouts using CSS Grid and Flexbox.
- Lazy loading for project images.
- Asynchronous image decoding for project images.
- Efficient animation scheduling using `requestAnimationFrame()`.
- Passive scroll event listeners.
- GitHub API response validation and error handling.
- Reduced-motion support for animations.

Additional performance improvements were explored, including WebP image compression and reducing unnecessary DOM operations.

## 8. Troubleshooting

| Issue | Possible Solution |
|---|---|
| Website does not open | Verify that `index.html` exists and open it using Live Server. |
| Images do not appear | Check image paths, filenames, and file extensions. |
| CV does not download | Verify that `CV.pdf` exists inside `assets/documents/`. |
| GitHub repositories do not load | Check the internet connection and GitHub API availability. |
| Styling does not appear | Verify the path to `css/styles.css`. |
| Interactive features do not work | Verify the JavaScript file path and check the browser console. |

## 9. AI Integration

ChatGPT was used as a supporting tool throughout Assignment 4 for:

- Personal character image generation.
- UI/UX and color palette suggestions.
- CSS positioning and animation guidance.
- Timeline development.
- CV download functionality.
- Contact section layout.
- GitHub statistics.
- Debugging and code review.
- Performance optimization guidance.
- Documentation support.

I independently researched portfolio designs, selected the final visual style, prepared the website content, and made the final implementation decisions.

Detailed AI usage, modifications, learning outcomes, and the required declaration are documented in [AI Usage Report](docs/ai-usage-report.md).

## 10. Documentation

Additional documentation is available in the following files:

- [Technical Documentation](docs/technical-documentation.md)
- [AI Usage Report](docs/ai-usage-report.md)

## 11. Future Improvements

Possible future improvements include:

- Connecting the contact form to a backend service.
- Adding more academic and professional projects.
- Further improving accessibility and performance.
- Expanding the portfolio as my professional experience develops.

## Author

**Deemah Alzuabi**

Computer Science Undergraduate Student  
King Fahd University of Petroleum and Minerals (KFUPM)
