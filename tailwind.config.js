/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
    content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            borderRadius: {
                '4xl': '6vh',
            },
            colors: {
                primary: '#f15a24',
                black: '#1e1e1e',
                grey: '#676767',
            },
            lineHeight: {
                1: '.1rem',
            },
            keyframes: {
                slideRight: {
                    '0%': { transform: 'translateX(-5vw)' },
                    '100%': { transform: 'translateX(0px)' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(5vw)' },
                    '100%': { transform: 'translateX(0px)' },
                },
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-1.5vh)' },
                    '100%': { transform: 'translateY(0px)' },
                },
            },
            animation: {
                'slide-right': 'slideRight 1s ease-out',
                'slide-left': 'slideLeft 1s ease-out',
                float: 'float 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        function ({ addVariant }) {
            addVariant('child', '& > *');
        },
    ],
};

module.exports = tailwindConfig;
