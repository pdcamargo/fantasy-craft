const path = require("path");

module.exports = {
  // `content` is replaced instead of extended, so this line has to be added in
  // the `content` of each app' tailwind.config.js
  content: [
    path.join(
      path.dirname(require.resolve("@craft/ui")),
      "**/*.{js,ts,jsx,tsx}",
    ),
  ],
  theme: {
    data: {
      active: 'state~="active"',
      inactive: 'state~="inactive"',
      on: 'state~="on"',
      off: 'state~="off"',
    },
    extend: {
      boxShadow: {
        smooth: "0px 3px 4px 0px rgba(0, 0, 0, 0.03)",
        "smooth-md": "0px 4px 6px 0px rgba(0, 0, 0, 0.05)",
        "smooth-lg": "0px 5px 8px 0px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
