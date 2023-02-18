import { Box, Button, Checkbox, IconButton, Stack, Typography } from '@mui/material'
import { ArrowDown2, Message, Stop } from 'iconsax-react'
import Localimage from '../../Assets/man.png'
import React from 'react'
import Navigate from '../Navigate'
const Mywork = () => {
    return (
        <Box>
            <Stack direction={'row'} justifyContent='space-between'>
                <Navigate />
                <Box flex={16}>
                    <Box paddingY='2rem'>
                        <Box paddingY={'2rem'}>
                            <Button fullWidth sx={{color:'black',marginBottom:'1rem'}}>
                                <Box display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                                    <ArrowDown2 />
                                    <Typography>Past Dates</Typography>
                                </Box>
                            </Button>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'red.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'orange.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box paddingY={'2rem'}>
                            <Button fullWidth sx={{color:'black',marginBottom:'1rem'}}>
                                <Box display={'flex'} borderRadius='.5rem' flexDirection={'row'}  paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                                    <ArrowDown2 />
                                    <Typography>Today</Typography>
                                </Box>
                            </Button>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'red.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'orange.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box paddingY={'2rem'}>
                            <Button fullWidth sx={{color:'black',marginBottom:'1rem'}}>
                                <Box display={'flex'} borderRadius='.5rem' flexDirection={'row'}  paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                                    <ArrowDown2 />
                                    <Typography>This Week</Typography>
                                </Box>
                            </Button>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'red.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'orange.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box paddingY={'2rem'}>
                            <Button fullWidth sx={{color:'black',marginBottom:'1rem'}}>
                                <Box display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                                    <ArrowDown2 />
                                    <Typography>Later</Typography>
                                </Box>
                            </Button>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'red.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                            <Stack spacing={3} paddingX={'4rem'} width='70%' direction='row' justifyContent={'space-between'}>
                                <Checkbox flex={.2}></Checkbox>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >iteam name</Typography>
                                </Box>
                                <Button flex={.2}><Message/></Button>
                                <IconButton flex={.2}>
                                    <img width={'25px'} height={'25px'} src={Localimage}></img>
                                </IconButton>
                                <Box sx={{":hover":{cursor:'pointer',opacity:'.7'}}} onClick={()=>{console.log('clicked')}} flex={.5} bgcolor={'orange.main'}>
                                </Box>
                                <Box alignSelf={'center'} flex={1}>
                                    <Typography >23-01-2023</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}

export default Mywork
