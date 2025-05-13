export default {
    content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D3260',
        // 'primary-light': '#1D3260',
        // 'primary-dark': '#C63D1C',
        secondary: '#E94E241',
        // 'secondary-light': '#a5b4fc',
        // 'secondary-dark': '#4338ca',
        accent: '#facc15',
        // 'accent-light': '#fde047',
        // 'accent-dark': '#ca8a04',
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
      }
    },
  },
  plugins: [],
};