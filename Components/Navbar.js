import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import HomeContext from '../Contexts/HomeContext';
import NavigationContext from '../Contexts/NavigationContext';

import navbarStyles from '../styles/Navbar.module.css';

function Navbar(props) {
  const homeContext = useContext(HomeContext);
  const navContext = useContext(NavigationContext);

  const [hamClicked, setHamClicked] = useState(false);

  useEffect(() => {
    homeContext.setHamClicked(hamClicked);
  }, [hamClicked]);

  useEffect(() => {
    setHamClicked(homeContext.state.hamClicked);
  }, [homeContext.state.hamClicked]);

  function getPlatformBasedLogo() {
    return !homeContext.isMobile
      ? '/pixels/logo/blue-bg.png'
      : '/pixels/logo/white-bg.jpeg';
  }
  return (
    <header className={navbarStyles.container}>
      <div className={navbarStyles.logo}>
        <Image
          src={getPlatformBasedLogo()}
          alt='Avenue Corporation Logo'
          layout='responsive'
          width={100}
          height={100}
        />
      </div>
      <nav className={navbarStyles.menu}>
        <ul className={navbarStyles.list}>
          {navContext.menuList.map((menuItem) => (
            <li
              key={menuItem.id}
              className={`${navbarStyles.listItem} ${
                menuItem.id == navContext.selectedMenuItem
                  ? navbarStyles.activeMenuItem
                  : ''
              }`}
              onClick={() => navContext.setSelectedMenuItem(menuItem.id)}
            >
              {menuItem.subMenu.length > 0 ? (
                <SubMenu {...menuItem} />
              ) : (
                <Link href={menuItem.path}>
                  <a>{menuItem.description}</a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`hamburger-container ${navbarStyles.hamburgerContainer} ${
          hamClicked ? navbarStyles.change : ''
        }`}
        onClick={() => setHamClicked(!hamClicked)}
      >
        <div
          className={`${navbarStyles.hamburgerLine} ${
            hamClicked ? navbarStyles.change1 : ''
          } `}
        ></div>
        <div
          className={`${navbarStyles.hamburgerLine} ${
            hamClicked ? navbarStyles.change2 : ''
          } `}
        ></div>
        <div
          className={`${navbarStyles.hamburgerLine} ${
            hamClicked ? navbarStyles.change3 : ''
          } `}
        ></div>
      </div>
    </header>
  );
}
export default Navbar;

function SubMenu({ id, description, name, path, subMenu }) {
  return (
    <div className={navbarStyles.subMenuTitle}>
      <a>
        {description}
        <span className={navbarStyles.arrow}>
          <span className={navbarStyles.arrowLine1}></span>
          <span className={navbarStyles.arrowLine2}></span>
        </span>
      </a>
      <ul className={navbarStyles.subMenu}>
        {subMenu.map((item) => (
          <li key={item.id}>
            <Link href={path+item.path}>
              <a>{item.description}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
