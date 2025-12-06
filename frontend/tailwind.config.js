/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f4ff',
                    100: '#e0e9ff',
                    200: '#c7d6fe',
                    300: '#a4b9fc',
                    400: '#7f95f7',
                    500: '#5c6df0',
                    600: '#4f4fe4',
                    700: '#4140c9',
                    800: '#3636a3',
                    900: '#303381',
                    950: '#1e1e4b',
                },
                sidebar: {
                    dark: '#1a1a2e',
                    hover: '#252542',
                }
            },
        },
    },
    plugins: [],
}
