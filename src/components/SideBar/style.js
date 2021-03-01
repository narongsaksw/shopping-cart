import styled from 'styled-components';

export const Navbar = styled.div`
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuBars = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;

  :hover {
    cursor: pointer;
  }
`;

export const NavMenu = styled.nav`
  background-color: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-100%')};
  transition: ${(props) => (props.isOpen ? '350ms' : '850ms')};
  z-index: 99;
`;

export const Navtext = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0 8px 16px;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
    :hover {
      background-color: #1a83ff;
    }
  }
`;

export const NavMenuItems = styled.ul`
  width: 100%;
`;

export const NavbarToggle = styled.li`
  background-color: #060b26;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
