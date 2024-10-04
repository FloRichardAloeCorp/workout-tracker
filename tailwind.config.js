/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      'yellow': {
        '50': '#fffaeb',
        '100': '#feefc2',
        '200': '#fde08a',
        '300': '#fcca4d',
        '400': '#fbb424',
        '500': '#f5920b',
        '600': '#d96c06',
        '700': '#b44a09',
        '800': '#92390e',
        '900': '#78300f',
        '950': '#451703',
      },
      'purple': {
        '50': '#f8f7fb',
        '100': '#f2f0f7',
        '200': '#e8e5f1',
        '300': '#d4cee4',
        '400': '#bdb1d4',
        '500': '#a491c1',
        '600': '#9077b0',
        '700': '#7e659c',
        '800': '#6a5483',
        '900': '#58466c',
        '950': '#392d48',
      },
      'green': {
        '50': '#edfcf5',
        '100': '#d4f7e6',
        '200': '#adedd2',
        '300': '#78ddb8',
        '400': '#37b88d',
        '500': '#1eab80',
        '600': '#118a69',
        '700': '#0d6f56',
        '800': '#0d5845',
        '900': '#0c483a',
        '950': '#052921',
      },
      'blue': {
        '50': '#f0fafb',
        '100': '#d9eff4',
        '200': '#b7dfea',
        '300': '#85c7db',
        '400': '#44a2c2',
        '500': '#3089aa',
        '600': '#2b708f',
        '700': '#285c76',
        '800': '#294d61',
        '900': '#264253',
        '950': '#142a38',
      }
    },
    extend: {
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: '#FFFFFF',
          danger: '#F27A68',
          success: '#3FCD9D',
        }
      }
    }
  })],
}

