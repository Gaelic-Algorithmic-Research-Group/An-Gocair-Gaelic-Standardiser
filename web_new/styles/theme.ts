// The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.
// see https://mui.com/material-ui/customization/theming/
// see https://mui.com/material-ui/customization/palette/

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
