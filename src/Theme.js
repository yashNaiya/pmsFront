import { createTheme } from "@mui/material";

const theme = createTheme({
    typography:{
        fontFamily:'Lucida Sans',
    },
    palette:{
        primary:{
            main:'#314d78',
            light:'#58739c'
        },
        red:{
            main:'#FD8A8A'
        },
        green:{
            main:'#B6E2A1'
        },
        orange:{
            main:"#FEBE8C"
        },
        grey:{
            main:'#D9D9D9'
        }
    },
    
})

export default theme;