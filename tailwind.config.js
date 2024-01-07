/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
    content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontSize: {
              xs: ['1vh', '1.5vh'],
              sm: ['1.5vh', '2vh'],
              base: ['2vh', '2.5vh'],
              lg: ['2.5vh', '3vh'],
              xl: ['3vh', '3.5vh'],
              '2xl': ['3.5vh', '4vh'],
              '3xl': ['4vh', '4.5vh'],
              '4xl': ['4.5vh', '5vh'],
              '5xl': ['5vh', '5.5vh'],
              '6xl': ['5.5vh', '6vh'],
              '7xl': ['6vh', '6.5vh'],
              '8xl': ['6.5vh', '7vh'],
              '9xl': ['7vh', '7.5vh'],
              '10xl': ['7.5vh', '8vh'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
                slide: {
                    '0%': { transform: 'translateX(-5vw)' },
                    '100%': { transform: 'translateX(0px)' },
                },
            },
            animation: {
                slide: 'slide 1s ease-out',
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
