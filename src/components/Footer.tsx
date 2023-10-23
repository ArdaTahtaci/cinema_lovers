import React from 'react'
import Typography from '../styles/Typography'
import { useMyContext } from '../context/DarkModeContext'

export default function Footer() {

    const { mode } = useMyContext()

    return (
        <footer style={{ backgroundColor: mode ? "#333" : "#000" }}>
            <Typography className='mx-auto pt-3' variant='subtitle2' color='white'>© 2023 Cinema Lovers</Typography>
        </footer>
    )
}
