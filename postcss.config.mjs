const config = {
  plugins: {
    '@tailwindcss/postcss': {
      plugins: [
        // Ensure you install this package: npm install @tailwindcss/typography
        '@tailwindcss/typography',
        'tailwindcss-animate',  
      ],
    },
  },
}

export default config
