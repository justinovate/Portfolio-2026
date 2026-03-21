# Justin's Portfolio (Interactive Retro CLI Theme)

A fully responsive, interactive personal portfolio website designed with a deep-dark **Retro Arcade and Command-Line Interface (CLI)** aesthetic. 

The background features a **Live Neural Network Particle Canvas** that tracks mouse movements, rendering mathematical distance-based connected nodes.

## Features

- **Interactive Neural Network**: An HTML5 `<canvas>` background where particles dynamically generate connecting lines based on physical proximity and mouse coordinates.
- **Retro Terminal Aesthetic**: Designed with `Fira Code` monospace fonts, deep blacks, and glowing neon accents (Cyan, Magenta, Green).
- **Simulated CLI Output**: Includes CRT scanlines and a JS-driven text-typing effect that resembles a terminal execution prompt.
- **Scroll Reveal Animations**: Vanilla Javascript IntersectionObservers provide smooth scroll-triggered fades.
- **Zero Build Tools Required**: This project is built completely natively in static `HTML`, `CSS`, and vanilla `JavaScript`.

## Getting Started

Since this portfolio runs on native browser technologies with no dependencies or frameworks, installation is instant:

1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/justinovate/Portfolio-2025.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Portfolio-2025
   ```
3. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari):
   - You can simply double-click the `index.html` file in your file explorer.
   - Alternatively, use a tool like VS Code's **Live Server** extension for hot-reloading.

## File Architecture

- `index.html`: The core semantic markup housing the terminal window and content containers.
- `style.css`: Contains the extensive retro CLI theme rules, text-shadow effects, CRT scanlines, and neon styles.
- `script.js`: Handles the interactive Canvas logic (neural network nodes), the hero typing effect, active navigation states, and the scroll reveals.
- `JustinDeLeon_Resume.pdf`: Direct link to downloable CV.

## Deployment

Simply connect this repository to **GitHub Pages**, **Vercel**, or **Netlify** to host your static site in seconds. No build commands (like `npm run build`) are needed. Just set the root directory as the deployment source.
