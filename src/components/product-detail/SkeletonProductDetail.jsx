import { Box, Skeleton } from '@mui/material'
import React from 'react'

const SkeletonProductDetail = () => {
    return (
        <>
            <Box className='d-flex gap-2 mt-5'>
                <Box className='mx-2 ms-5'>
                    <Skeleton variant="rectangular" width={480} height={480} />
                </Box>
                <Box className='ms-4'>
                    <Skeleton variant="rectangular" width={400} height={40} />
                    <Skeleton className='py-3 my-3' variant="rectangular" width={600} height={70} />
                    <Skeleton className='mt-3' variant="rectangular" width={610} height={90} />
                        <Box>
                            <Skeleton className='mt-3' variant="rectangular" width={300} height={30} />
                        </Box>
                        <Box className='d-flex justify-content-between mt-5'>
                            <Box className='mt-2'>
                            <Skeleton className='mt-3' variant="rectangular" width={60} height={30} />
                            </Box>
                            <Box className='mt-2'>
                            <Skeleton className='mt-3 rounded-5' variant="rectangular" width={85} height={30} />
                            </Box>
                        </Box>
                </Box>
            </Box>
        </>
    )
}

export default SkeletonProductDetail