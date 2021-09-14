import theme from "../../Navigation/Theme/theme";
import styled from "styled-components";
import { useState } from "react";

const StyledPanel = styled.div`
    background: ${theme.color.background.secondary};
    position: fixed;
    top: 6em;
    right: 2em;
    width: 15vw;
    height: 40vh;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
`;

const ControlPanel = () => {
    return (
        <StyledPanel>
            <p>Map shows the real estate market in Melbourne</p>
        </StyledPanel>
    );
};

export default ControlPanel;
