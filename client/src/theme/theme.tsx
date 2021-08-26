import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const brandColorScheme = {
  50: "#eaf3fe",
  100: "#ccd9e7",
  200: "#adbfd2",
  300: "#8da6be",
  400: "#6e8cab",
  500: "#557392",
  600: "#415972",
  700: "#2d4052",
  800: "#192633",
  900: "#010e16",
};

const secondaryColorScheme = {
  50: "#f9ebff",
  100: "#e1c9ec",
  200: "#cba5da",
  300: "#b483c9",
  400: "#9f60b9",
  500: "#85469f",
  600: "#68377d",
  700: "#4b265a",
  800: "#2d1638",
  900: "#130518",
};

const primary = brandColorScheme[400];
const secondary = secondaryColorScheme[400];

// Text
const textPrimary = "#222222";
const textSecondary = "#4D4D4D";

// Background
const backgroundPrimary = "#FBFBFB";
const backgroundSecondary = "#EBEBEB";

// Dark mode
const textPrimaryDarkMode = backgroundPrimary;
const textSecondaryDarkMode = backgroundSecondary;

const backgroundPrimaryDarkMode = "#09141b";
const backgroundSecondaryDarkMode = textSecondary;

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
      },
      variants: {
        outline: () => ({
          _hover: { textDecoration: "none" },
        }),
      },
    },
  },
  styles: {
    global: props => ({
      body: {
        fontWeight: 500,
        color: mode(textPrimary, textPrimaryDarkMode)(props),
        bg: mode(backgroundPrimary, backgroundPrimaryDarkMode)(props),
        lineHeight: "1.2",
      },
      input: {
        boxShadow: "none",
        "&:focus": {
          border: "black",
          boxShadow: "none",
        },
      },
    }),
  },

  colors: {
    brand: brandColorScheme,
    brandSecondary: secondaryColorScheme,
    primary,
    secondary,
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      primaryDark: textPrimaryDarkMode,
      secondaryDark: textSecondaryDarkMode,
    },
    background: {
      primary: backgroundPrimary,
      secondary: backgroundSecondary,
      primaryDark: backgroundPrimaryDarkMode,
      secondaryDark: backgroundSecondaryDarkMode,
    },
  },
  fonts: {
    heading: "Nexa Bold",
    body: "Poppins",
  },
  breakpoints,
});

export default theme;
