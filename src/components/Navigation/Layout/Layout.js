import styled from 'styled-components';
import NavHeader from '../NavHeader/NavHeader';

const StyledLayout = styled.div`
  width: 100%;
  min-height: 100vh;
`;


const Layout = ({ children }) => {
	return (
		<>
			<StyledLayout>
				<NavHeader />
				<div>{children}</div>
			</StyledLayout>
		</>
	);
};

export default Layout;