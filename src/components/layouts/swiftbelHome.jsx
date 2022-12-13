import React from 'react'
import styled from 'styled-components';

const swiftbelHome = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <SwiftbelHome>SwiftBel Home</SwiftbelHome>
        </div>
    )
}

export default swiftbelHome;

const SwiftbelHome = styled.h1`
    background: linear-gradient(128.86deg, #D81159 11.42%, #EB873F 72%, #FFCF23 107.53%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`