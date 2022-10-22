import Head from 'next/head';
import React from 'react';

import styles from '../../styles/Home.module.css';

function HeavyDutyPackagingSolution(props) {
  return (
    <>
      <Head>
        <title>AvenueCorp - Heavy Duty Packaging Solution</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='pixels/favicon.ico' />
      </Head>
      <div className={`body-sub-container ${styles.main}`}>
        Heavy Duty Packaging Solution
      </div>
    </>
  );
}

export default HeavyDutyPackagingSolution;
