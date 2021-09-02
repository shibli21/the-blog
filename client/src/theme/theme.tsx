import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const brandColorScheme = {
  50: "#ecf4f9",
  100: "#cbdce7",
  200: "#a8c5d8",
  300: "#85afca",
  400: "#6498bc",
  500: "#4c7ea2",
  600: "#3c627e",
  700: "#2c465a",
  800: "#1a2935",
  900: "#060e13",
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
const blackColorScheme = {
  50: "#f2f2f2",
  100: "#d9d9d9",
  200: "#bfbfbf",
  300: "#a6a6a6",
  400: "#8c8c8c",
  500: "#737373",
  600: "#595959",
  700: "#404040",
  800: "#262626",
  900: "#0d0d0d",
};

const primary = brandColorScheme[500];
const secondary = secondaryColorScheme[500];

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
    b: blackColorScheme,
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
