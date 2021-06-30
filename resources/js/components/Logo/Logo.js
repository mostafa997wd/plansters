import React from 'react';

import leafLogo from '../../assets/leaf.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo} style={{height: props.height}}>
        <img src={leafLogo} alt="leaf" />
    </div>
);

export default logo;