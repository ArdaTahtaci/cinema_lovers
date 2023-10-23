import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

interface PercentageCircleProps {
  children: React.ReactNode
  value: number
}

export default function PercentageCircle(props: PercentageCircleProps) {
  return (

    <CircularProgressbarWithChildren
      background
      value={props.value}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 0.25,

        // Colors
        pathColor: props.value > 70 ? "#008000" : "#FFD700",
        textColor: '#fff',
        trailColor: '#666666',
        backgroundColor: '#222222',
      })}
    >{props.children}</CircularProgressbarWithChildren>

  )
}
