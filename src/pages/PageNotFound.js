import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function PageNotFound() {
    return (
        <Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>
            <Typography variant="h5">
                Page intouvable !
            </Typography>

        </Stack>
    )
}
