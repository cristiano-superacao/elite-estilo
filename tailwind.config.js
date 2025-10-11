module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'oklch(30% 0.1 240)', // tom escuro
        },
        secondary: {
          DEFAULT: 'oklch(98% 0.01 240)', // tom claro
        },
        accent: {
          DEFAULT: 'oklch(60% 0.18 40)', // destaque
        },
        muted: {
          DEFAULT: 'oklch(60% 0.02 240)', // texto secundário
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
