import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

import { SidebarTab } from './SideBarTab';
import {
  Navbar,
  NavMenu,
  NavMenuItems,
  NavbarToggle,
  Navtext,
  MenuBars,
} from './style';

function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  return (
    <Fragment>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Navbar>
          <MenuBars to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </MenuBars>
          <MenuBars
            onClick={() => history.replace('/')}
            style={{ marginRight: '2rem', color: '#fff', fontSize: 20 }}
          >
            Log out
          </MenuBars>
        </Navbar>
        <NavMenu isOpen={sidebar}>
          <NavMenuItems onClick={showSidebar}>
            <NavbarToggle>
              <MenuBars to='#'>
                <AiIcons.AiOutlineClose />
              </MenuBars>
            </NavbarToggle>
            {SidebarTab.map((item, index) => {
              return (
                <Navtext key={index}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: 16 }}>{item.title}</span>
                  </Link>
                </Navtext>
              );
            })}
          </NavMenuItems>
        </NavMenu>
      </IconContext.Provider>
    </Fragment>
  );
}

export default SideBar;
