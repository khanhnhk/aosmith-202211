/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"darkish-red": "#D93D3D",
				"darkish-green": "#80A67B",
				"light-green": "#C3E2C3",
				"bright-green": "#3AA637",
				"dark-green": "#10733B",
				"t-dark-green": "#377845"
			},
			fontFamily: {"roboto": ['Roboto', "sans-serif"]}
		},
		screens: {
      'xs': '360px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
		}
	},
	plugins: [],
}
