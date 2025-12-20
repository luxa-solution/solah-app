const palette = {
  // Primitive palette
  white: "#FFFFFF",
  black: "#000000",

  // Semantic palette
  success: {
    light: "#84ebb4",
    bold: "#1fc16b",
  },

  warning: {
    light: "#ffdb43",
    bold: "#dfb400",
  },

  error: {
    light: "#fb3748",
    bold: "#d00416",
  },

  muted: {
    light: "#d2d2d2",
    bold: "#606060",
  },

  // Gray Scale
  neutral: {
    100: "#ffffff",
    200: "#e8e8e8",
    300: "#d2d2d2",
    400: "#bbbbbb",
    500: "#a4a4a4",
    600: "#8e8e8e",
    700: "#777777",
    800: "#606060",
    900: "#4a4a4a",
    1000: "#333333",
  },

  // Theme palette
  primary: {
    100: "#e6d3c7",
    200: "#d9bdab",
    300: "#cda78e",
    400: "#c09172",
    500: "#b37b56",
    600: "#9b6845",
    700: "#7f5539",
    800: "#64432d",
    900: "#483020",
    1000: "#2d1e14",
  },

  secondary: {
    100: "#f6f5e7",
    200: "#eeebd0",
    300: "#e3deb1",
    400: "#d8d192",
    500: "#ccc473",
    600: "#c1b654",
    700: "#ada23f",
    800: "#8e8533",
    900: "#6f6828",
    1000: "#504b1d",
  },
} as const;

export const background = {
  default: {
    primary: palette.neutral[100],
    secondary: palette.neutral[300],
    tertiary: palette.neutral[800],
    inverted: palette.neutral[1000],
  },
  brand: {
    primary: palette.primary[500],
    secondary: palette.primary[700],
    tertiary: palette.primary[900],
    inverted: palette.primary[100],
  },
} as const;

export const border = {
  default: {
    primary: palette.neutral[800],
    secondary: palette.neutral[500],
    tertiary: palette.neutral[200],
  },
  brand: {
    primary: palette.primary[400],
    secondary: palette.primary[600],
    inverted: palette.primary[900],
  },
} as const;

export const context = {
  default: {
    primary: palette.neutral[1000],
    secondary: palette.neutral[700],
    tertiary: palette.neutral[400],
    inverted: palette.neutral[100],
  },
  brand: {
    primary: palette.primary[900],
    secondary: palette.primary[500],
    inverted: palette.primary[100],
  },
} as const;

export const colors = {
  background,
  context,
  border,
  palette,
} as const;
