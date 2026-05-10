import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        travel: {
          50: { value: "#f0f9ff" },
          100: { value: "#e0f2fe" },
          200: { value: "#bae6fd" },
          300: { value: "#7dd3fc" },
          400: { value: "#38bdf8" },
          500: { value: "#0ea5e9" },
          600: { value: "#0284c7" },
          700: { value: "#0369a1" },
          800: { value: "#075985" },
          900: { value: "#0c4a6e" },
          950: { value: "#082f49" },
        },
      },

      fonts: {
        heading: {
          value: `'Inter', sans-serif`,
        },
        body: {
          value: `'Inter', sans-serif`,
        },
      },

      radii: {
        xl: { value: "0.875rem" },
        "2xl": { value: "1.25rem" },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          canvas: {
            value: {
              _light: "{colors.gray.50}",
              _dark: "{colors.gray.900}",
            },
          },
          surface: {
            value: {
              _light: "white",
              _dark: "{colors.gray.800}",
            },
          },
        },

        border: {
          subtle: {
            value: {
              _light: "{colors.gray.200}",
              _dark: "{colors.gray.700}",
            },
          },
        },

        travel: {
          solid: {
            value: "{colors.travel.500}",
          },

          contrast: {
            value: "white",
          },

          fg: {
            value: {
              _light: "{colors.travel.700}",
              _dark: "{colors.travel.300}",
            },
          },

          muted: {
            value: {
              _light: "{colors.travel.100}",
              _dark: "{colors.travel.900}",
            },
          },

          subtle: {
            value: {
              _light: "{colors.travel.50}",
              _dark: "{colors.travel.950}",
            },
          },

          emphasized: {
            value: {
              _light: "{colors.travel.200}",
              _dark: "{colors.travel.800}",
            },
          },

          focusRing: {
            value: "{colors.travel.500}",
          },
        },
      },
    },

    recipes: {
      button: {
        base: {
          borderRadius: "xl",
          fontWeight: "semibold",
          transition: "all 0.2s",
        },

        variants: {
          solid: {
            bg: "travel.solid",
            color: "travel.contrast",

            _hover: {
              opacity: 0.9,
            },
          },

          subtle: {
            bg: "travel.subtle",
            color: "travel.fg",

            _hover: {
              bg: "travel.emphasized",
            },
          },
        },

        defaultVariants: {
          variant: "solid",
        },
      },

      card: {
        base: {
          bg: "bg.surface",
          borderRadius: "2xl",
          borderWidth: "1px",
          borderColor: "border.subtle",
          boxShadow: "sm",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);