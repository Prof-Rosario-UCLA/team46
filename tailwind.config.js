// tailwind.config.js

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: '3rem 3rem 1fr 2rem',
      },
    },
  },
  plugins: [],
};
