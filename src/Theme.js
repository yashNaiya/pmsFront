import { createTheme } from "@mui/material";
const theme = createTheme({
    typography: {
        fontFamily: 'Inter',
    },
    palette: {
        primary: {
            main: '#223554',
            light: '#58739c',
            shadow: `rgba(49, 77, 120, .2)`
        },
        red: {
            main: '#FD8A8A'
        },
        green: {
            main: '#B6E2A1'
        },
        greyDark:{
            main:'#75757529'
        },
        orange: {
            main: "#FEBE8C"
        },
        grey: {
            main: '#D9D9D9',
            dark: '#5a5757',
            light: '#'
        }
    },

})

export default theme;