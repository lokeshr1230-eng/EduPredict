import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#f8f9ff", "tertiary": "#002141", "surface-tint": "#455f88",
        "on-tertiary-container": "#68a2e9", "secondary-fixed-dim": "#ffb866", "secondary": "#875200",
        "tertiary-container": "#003765", "on-background": "#0b1c30", "on-error-container": "#93000a",
        "inverse-on-surface": "#eaf1ff", "primary-fixed": "#d6e3ff", "inverse-primary": "#adc7f7",
        "surface-container": "#e5eeff", "on-primary-fixed-variant": "#2d476f", "tertiary-fixed-dim": "#a2c9ff",
        "secondary-fixed": "#ffddba", "error-container": "#ffdad6", "surface-container-high": "#dce9ff",
        "surface-variant": "#d3e4fe", "surface-dim": "#cbdbf5", "secondary-container": "#ffb55c",
        "primary-container": "#1a365d", "on-error": "#ffffff", "inverse-surface": "#213145",
        "primary": "#002045", "surface-container-lowest": "#ffffff", "surface-container-highest": "#d3e4fe",
        "on-tertiary": "#ffffff", "primary-fixed-dim": "#adc7f7", "outline": "#74777f",
        "surface-container-low": "#eff4ff", "on-surface": "#0b1c30", "on-secondary": "#ffffff",
        "on-tertiary-fixed-variant": "#004881", "on-tertiary-fixed": "#001c38", "surface": "#f8f9ff",
        "outline-variant": "#c4c6cf", "on-secondary-fixed": "#2b1700", "on-secondary-container": "#744600",
        "tertiary-fixed": "#d3e4ff", "on-primary-fixed": "#001b3c", "on-surface-variant": "#43474e",
        "on-primary-container": "#86a0cd", "on-secondary-fixed-variant": "#673d00", "error": "#ba1a1a",
        "background": "#f8f9ff", "on-primary": "#ffffff"
      },
      spacing: {
        "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "48px",
        "unit": "4px", "gutter": "20px", "container-max": "1280px"
      },
      fontSize: {
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1", fontWeight: "500" }],
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
        "h1": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "data-tabular": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
      }
    },
  },
  plugins: [],
};
export default config;