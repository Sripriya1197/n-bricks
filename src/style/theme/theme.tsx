import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#F25E25',
        },
        secondary : {
            main: '#888291'
        },
        action : {
            hover: "#F25E25",
            focus: "#F25E25"
        }
    },
    typography : {
        fontFamily: "Noto Sans"
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
            
            }
        }
    }
});