import React from "react";
import { nav_items } from "../../data/navbar";
import NavbarItem from "../navbarItem";
import styles from './styles.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav_list}>
        {nav_items.map((item, i) => <NavbarItem {...item} key = {i} />)}
      </ul>
    </nav>
  );
};

export default Navbar;
