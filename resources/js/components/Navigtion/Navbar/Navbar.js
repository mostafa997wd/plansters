import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../../Logo/Logo';
import Wrapper from '../../../hoc/Wrapper';

const navbar = ( props )=>(
  <React.Fragment>
  
<nav className={styles.Navbar}>
<ul>
  <li><Logo /></li>
  
</ul> 
</nav>
</React.Fragment>
);


export default navbar