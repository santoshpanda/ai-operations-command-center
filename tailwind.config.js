/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-100', 'bg-red-50', 'text-red-800', 'border-red-500',
    'bg-yellow-100', 'bg-yellow-50', 'text-yellow-800', 'border-yellow-500',
    'bg-green-100', 'bg-green-50', 'text-green-800', 'border-green-500',
    'bg-blue-100', 'bg-blue-50', 'text-blue-800', 'border-blue-500',
  ]
}
