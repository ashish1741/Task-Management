// vite.config.js
export default {
  // ...other configuration options
  build: {
    rollupOptions: {
      input: 'src/main.js', // Replace 'src/main.js' with your actual entry point
    },
  },
  optimizeDeps: {
    include: ['dependency-package'], // Specify dependencies or files to include for optimization
  },
};
