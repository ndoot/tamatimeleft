import { swiss } from "@theme-ui/presets";
import { merge } from "theme-ui";

export const theme = merge(swiss, {
  // custom themes
  fonts: {
    heading:
      '"Press Start 2P", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
  },
  text: {
    heading: {
      fontFamily: "heading",
    },
  },
});
