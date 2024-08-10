import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colors = {
  brand: {
    100: "#d4e1ee",
    200: "#aac3de",
    300: "#7fa5cd",
    400: "#5587bd",
    500: "#2a69ac",
    600: "#22548a",
    700: "#193f67",
    800: "#112a45",
    900: "#081522",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

export const theme = extendTheme({ colors, config });
