/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['var(--font-body)', 'Source Code Pro', 'monospace'],
      mono: ['Source Code Pro', 'monospace'],
      heading: ['var(--font-heading)', 'Halogen', 'Roboto Mono', 'monospace'],
      'source-code': ['Source Code Pro', 'monospace'],
      halogen: ['Halogen', 'Roboto Mono', 'monospace'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        mira: {
          black: '#000000',
          beige: {
            DEFAULT: '#F2DBBF',
            light: '#FFFBF2',
          },
          green: {
            DEFAULT: '#7DD98C',
            light: '#A9E6B3',
            lighter: '#D6F3DC',
            lightest: '#EBF9EF',
          },
          purple: {
            DEFAULT: '#B0A1FF',
            light: '#C7BDFF',
            lighter: '#DED8FF',
            lightest: '#EEEBFF',
          },
          orange: {
            DEFAULT: '#FF5714',
            light: '#FF8557',
            lighter: '#FFB39A',
            lightest: '#FFE1D6',
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        "pulse-custom": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "pulse": "pulse-custom 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
