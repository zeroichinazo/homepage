import React from "react";
import styles from "./styles.module.css";
import Seo from "../../components/Seo";

const Contact: React.FC = () => {
  return (
    <div className={styles.page}>
      <Seo title="お問い合わせ" />
      <div className={styles.titleRow}>
        <img src="/assets/logo/logo_contact.svg" alt="contact" />
        <div>
          <div className={styles.ja}>お問い合わせ</div>
          <div className={styles.en}>Contact</div>
        </div>
      </div>
      <div className={styles.contactBox}>
        <p className={styles.text}>お問い合わせ・制作のご依頼は</p>
        <a href="mailto:zeroichinazo@gmail.com" className={styles.mail}>
          zeroichinazo@gmail.com
        </a>
        <p className={styles.text}>までお願いいたします。</p>
      </div>
    </div>
  );
};

export default Contact;
