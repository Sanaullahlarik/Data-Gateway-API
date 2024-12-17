import React from 'react'

import { Box } from '@mui/material';
import Img404 from '../../assets/Img404.jpg'

const PageNotFound = () => {
  return (
    <>
       <Box className="d-flex justify-content-center align-items-center bg-body-secondary" sx={{height: '100vh'}}>
        <Box sx={{width:"40%"}}>
          <img className='w-100' src={Img404} alt="" />
        </Box>
      </Box> 
    </>
  )
}

export default PageNotFound;