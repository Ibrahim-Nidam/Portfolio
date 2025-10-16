/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./scripts/**/*.ts"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gold: {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                }
            },
            fontFamily: {
                stencil: ['"Saira Stencil One"', 'cursive'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        }
    },
    plugins: []
}