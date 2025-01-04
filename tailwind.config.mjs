/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#E42575',
        surface: '#1E1B2C',
        'surface-dark': '#13111C',
        'text-secondary': '#9B9BA7',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(180deg, rgba(88,51,125,0.2) 0%, rgba(13,11,18,0) 100%)',
      },
    },
  },
  plugins: [],
};
