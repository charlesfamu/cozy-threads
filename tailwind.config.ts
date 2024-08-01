import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounce200: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(-0.5rem)' },
          '40%': { transform: 'translateY(0)' },
        },
        bounce400: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(-0.5rem)' },
          '40%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        bounce200: 'bounce200 1s infinite',
        bounce400: 'bounce400 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
