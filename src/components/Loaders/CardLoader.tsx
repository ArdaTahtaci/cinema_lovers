import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'

export default function CardLoader() {



    return (
        <ContentLoader
            speed={2}
            viewBox={"0 0 150 270"}
            foregroundColor='#bbb'
            backgroundColor='#ddd'
            width={150}
            height={290}
        >
            <rect x="0" y="0" rx="20" ry="20" width="144" height="216" />
            <rect x="5" y="226" rx="2" ry="2" width="80" height="20" />
            <rect x="05" y="251" rx="2" ry="2" width="100" height="20" />

        </ContentLoader>
    )
}
