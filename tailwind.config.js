/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Asegúrate de incluir Preline:
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Asegúrate de requerir el plugin de Preline después de instalarlo
    require('preline/plugin'),
  ],
};
