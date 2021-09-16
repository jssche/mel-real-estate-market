import styled from "styled-components";
import theme from "../../Theme/theme";

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    border-top-style: solid;
    border-top-width: thin;
    border-top-color: ${theme.color.text.primary};
    width: 100%;
    padding: 1em;
`;

const InfoPanel = ({ panelInfo }) => {
    return (
        <StyledPanel>{panelInfo ? panelInfo.suburbCode : "test"}</StyledPanel>
    );
};

export default InfoPanel;
