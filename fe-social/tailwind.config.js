// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// const config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         "color-accent": "var(--color-accent)",
//         "color-gray": "var(--color-gray)",
//         "color-light-gray": "var(--color-light-gray)",
//         "color-dark-gray": "var(--color-dark-gray)",
//         "color-dark": "var(--color-dark)",
//         "color-light": "var(--color-light)",
//         "color-link": "var(--color-links)",
//       },
//     },
//   },
//   plugins: [],
// };

// module.exports = config;



// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-accent": "var(--color-accent)",
        "color-gray": "var(--color-gray)",
        "color-light-gray": "var(--color-light-gray)",
        "color-dark-gray": "var(--color-dark-gray)",
        "color-dark": "var(--color-dark)",
        "color-light": "var(--color-light)",
        "color-link": "var(--color-links)",
      },
    },
  },
  plugins: [],
};

module.exports = config;