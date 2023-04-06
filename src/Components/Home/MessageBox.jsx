import { Box } from '@mui/material'
import { styled, Typography } from '@mui/material'
import React from 'react'

const MessageBox = (props) => {
    const SERVER_HOST = process.env.REACT_APP_API_ENDPOINT + '/images/'

    const MessageTop = styled("div")(({ theme }) => ({
        display:"flex",
        flexDirection:"row",
        alignItems:"initial"
    }))
    const MessageBottom = styled("div")(({ theme }) => ({
        fontSize:"8px",
        marginTop:"10px"
    }))
    if(!(props.rootUser._id===props.sender._id)){
    return (
        <Box marginTop={"20px"} width={"100%"} display={"flex"} flexDirection={"column"}>
            <MessageTop>
                <img width={"32px"} height={"32px"} borderRadius={"50%"} objectFit={"cover"} src={SERVER_HOST + props.sender.image} alt='' />
                <Typography maxWidth={"300px"} display={"flex"} flexWrap={"wrap"} p={"10px"} borderRadius={"20px"} sx={{ marginX: "10px", backgroundColor: "primary.main", color: "#fff" }}>{props.text}</Typography>
            </MessageTop>
            
        </Box>
    )
    }
    else{
        return (
            <Box marginTop={"20px"} width={"100%"} display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
                <MessageTop>
                    <Typography maxWidth={"300px"} display={"flex"} flexWrap={"wrap"} p={"10px"} borderRadius={"20px"} sx={{marginX:"10px", backgroundColor:"#D3D3D3"}}>{props.text}</Typography>
                    <img src={SERVER_HOST + props.sender.image} width={"32px"} height={"32px"} borderRadius={"50%"} objectFit={"cover"} alt=''/>
                </MessageTop>
                
            </Box>
        )
    }
}

export default MessageBox
