import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#202124" },
    primary: {
      main: "#784af4",
    },
    secondary: {
      main: "#784af4",
    },
    text: {
      primary: "#bdc1c6",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textTransform: "none",
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        margin: "normal",
        fullWidth: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "lightgrey",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#202124",
          borderRadius: "16px",
        }
      }
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: "none",
        },
      },
    },
  },
})

export default responsiveFontSizes(theme)
