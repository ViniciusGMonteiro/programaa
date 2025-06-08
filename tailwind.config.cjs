/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom colors
        "programin-blue": "#3170D7",
        "programin-light-blue": "#e7ecf8",
        "ice-white": "#f5f5f5", // Nova cor personalizada

        text: {
          primary: "#1a1a1a",
          secondary: "#4d4d4d",
          light: "#ffffff",
        },

        // HSL-based system (ex: shadcn-ui tokens)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          ...{
            50: "#e6f1ff",
            100: "#cce3ff",
            200: "#99c7ff",
            300: "#66abff",
            400: "#338fff",
            500: "#0073ff",
            600: "#005cd9",
            700: "#0044b3",
            800: "#002d8c",
            900: "#001766",
          },
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          ...{
            50: "#e6ffe6",
            100: "#ccffcc",
            200: "#99ff99",
            300: "#66ff66",
            400: "#33ff33",
            500: "#00cc00",
            600: "#00a600",
            700: "#007f00",
            800: "#005900",
            900: "#003300",
          },
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          ...{
            50: "#fffde6",
            100: "#fffbcc",
            200: "#fff799",
            300: "#fff366",
            400: "#ffef33",
            500: "#ffeb00",
            600: "#d9c700",
            700: "#b3a300",
            800: "#8c7f00",
            900: "#665c00",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        ...{
          lg: "0.5rem",
          md: "0.375rem",
          sm: "0.25rem",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
