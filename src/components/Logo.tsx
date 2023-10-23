import React from 'react'
import Typography from '../styles/Typography'



export default function Logo() {
    return (
        <div style={{ position: "relative", width: "200px" }}>
            <img src={"/home/tobb/Desktop/Full-Stack/cinema_lovers/src/asset/cinema_lovers.jpeg"} height="80px" width="200px" />
            <div style={{
                position: "absolute"
            }}>
                {/* <Typography variant='caption2' color='blue'>Cinema</Typography> */}
            </div>
        </div>
    )
}
