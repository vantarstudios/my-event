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
            spacing: {
                '0': '0vh',
                '1': '0.5vh',
                '1.5': '0.75vh',
                '2': '1vh',
                '2.5': '1.25vh',
                '3': '1.5vh',
                '3.5': '1.75vh',
                '4': '2vh',
                '5': '2.5vh',
                '6': '3vh',
                '7': '3.5vh',
                '8': '4vh',
                '9': '4.5vh',
                '10': '5vh',
                '11': '5.5vh',
                '12': '6vh',
                '14': '7vh',
                '16': '8vh',
                '20': '10vh',
                '24': '12vh',
                '28': '14vh',
                '32': '16vh',
                '36': '18vh',
                '40': '20vh',
                '44': '22vh',
                '48': '24vh',
                '52': '26vh',
                '56': '28vh',
                '60': '30vh',
                '64': '32vh',
                '72': '36vh',
                '80': '40vh',
                '96': '48vh',
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
