import styled from 'styled-components';

const Cross = styled.div`
    cursor: pointer;
    opacity: 0.3;
    z-index:200;
    color: black;
    font-size: 2em;
    
    &:hover{
        opacity: 1;
    }

    

`;

const SidebarCross  = ({ toggleSideBar }) => {
	return (
		<Cross onClick={toggleSideBar}>&#10006;</Cross>
	);
};

export default SidebarCross;