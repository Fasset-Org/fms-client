import { createTheme } from "@mui/material";

export const themeDark = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #202020ff",
          borderRadius: "10px"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #202020ff",
          borderRadius: "5px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#3a9bfb",
      main: "#1CCAFF",
      info: "#333",
      contrastText: "#333"
    },
    secondary: {
      main: "#0FFFB3"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#333"
    },
    background: {
      // paper: "#444444da",
      paper: "#202020ff",
      default: "#191919ff"
    }
  }
});

export const themeLight = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {}
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "none"
    //     }
    //   }
    // },

    // MuiTabs: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiTabs-indicator": {
    //         display: "none"
    //       },
    //       "& .MuiButtonBase-root": {
    //         justifyContent: "start"
    //       },
    //       width: 250
    //     }
    //   }
    // },
    // MuiAccordionSummary: {
    //   styleOverrides: {
    //     root: {
    //       color: "#FFFFFF"
    //     }
    //   }
    // }
  },
  palette: {
    mode: "light",
    primary: {
      light: "#1f2f79",
      main: "#163683",
      info: "#333",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#a6aa15",
      contrastText: "#ffffff"
    },
    background: {
      paper: "#fbfbfbff",
      default: "#f3f3f3ff"
    }
  },
  typography: {
    fontSize: 12
  }
});

export const NeoBrutalism = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {}
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  },
  palette: {
    mode: "light",
    primary: {
      light: "#3a9bfb",
      main: "#0f4c81",
      info: "#333",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#14a37f",
      contrastText: "#ffffff"
    },
    background: {
      paper: "#50FFAF",
      default: "#9C7BFF"
    }
  }
});
