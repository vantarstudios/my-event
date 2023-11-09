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
            colors: {
                primary: '#f15a24',
                black: '#1e1e1e',
                grey: '#676767',
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *');
        },
    ],
};

module.exports = tailwindConfig;
