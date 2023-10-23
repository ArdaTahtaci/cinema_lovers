import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Typography from '../styles/Typography'
import Spinner from 'react-bootstrap/Spinner';

interface ButtonProps {
    isLoaded: boolean
    updatePage: () => void
}

export default function LoadMoreButton(props: ButtonProps) {

    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        props.updatePage()
        setLoading(true)
    }

    useEffect(() => {
        if (props.isLoaded) setLoading(false)
    }, [props.isLoaded])

    return (
        <div className='my-4'>

            <Button onClick={handleClick} className='btn-lg' variant='info'>
                <Typography variant='subtitle2'>
                    {!loading ? (
                        "Load More"
                    ) : (
                        <div className='d-flex'>
                            <Spinner animation='border' variant='white' />
                            <div className='my-auto ms-2'>
                                Loading...
                            </div>

                        </div>

                    )}
                </Typography>
            </Button>

        </div>
    )
}
