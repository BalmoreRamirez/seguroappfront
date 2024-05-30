/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": {
                    '300': '#1C1E4D',
                    '500': '#223E69',
                    '700': '#223E69',
                },
            },
            spacing: {
                'fluid': '100%',
            },
        },
        container: {
            center: true,
            padding: '15px',
            screens: {
                sm: '540px',
                md: '720px',
                lg: '960px',
                xl: '1140px',
            },
        },
    },
    plugins: [],
}