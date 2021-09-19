import theme from "../Theme/theme";
import styled from "styled-components";

//  A UI component for styling the help button
const IconWrapper = styled.div`
    color: ${theme.color.text.primary};
    display: inline-block;
    width: 2vw;
    position: absolute;
    right: 1vw;
    z-index: 300;

    svg {
        width: 1.5em;
        height: 1.5em;
    }
`;

export default IconWrapper;
