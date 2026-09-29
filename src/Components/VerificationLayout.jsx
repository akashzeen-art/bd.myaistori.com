import React from "react";
import styles from "./Verification.module.css";
import logo from "../assets/Images/logo.png";

const VerificationLayout = ({ children }) => (
  <main className={styles.wrap}>
    <div className={styles.card}>
      <img src={logo} alt="MyAiStori" className={styles.logo} />
      {children}
    </div>
  </main>
);

export default VerificationLayout;
