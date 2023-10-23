import React from 'react'
import Typography from '../styles/Typography'

interface KeywordProps {
    children: React.ReactNode;
    keywordId?: number
}

export default function Keyword({ children }: KeywordProps) {
    return (
        <div className='keyword mx-1 my-1'>
            <Typography className='mx-2 pt-1' variant='text'>{children}</Typography>
        </div>
    )
}
