
import React, { ReactNode } from "react"
// @emotion/react provide the ability of css in js
import styled from '@emotion/styled'

export interface KanBanBoardProps {
    children?: ReactNode
}


// https://emotion.sh/docs/typescript
const Main = styled('main')`
    flex: 10;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem 1rem;
`;
export default function KanBanBoard(kanBanBoardProps: KanBanBoardProps) {
    return (
        <Main>{kanBanBoardProps.children}</Main>
    )
}
