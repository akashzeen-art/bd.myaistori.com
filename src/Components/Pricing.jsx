import React from "react";
import styles from "./Pricing.module.css";
import { FaCheck, FaStar, FaCrown, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";

const Pricing = () => {
  const { language } = useLanguage();
  const { requireMobile } = useMobileGate();
  const navigate = useNavigate();
  const t = translations[language] || translations.EN;
  
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>{t.pricing.heroTitle}</h1>
          <p className={styles.subtitle}>{t.pricing.heroSubtitle}</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingGrid}>
          {[
            { ...t.pricing.plans.free, icon: <FaRocket />, popular: false, price: "₹0", period: "/month" },
            { ...t.pricing.plans.pro, icon: <FaStar />, popular: true, price: "₹299", period: "/month" },
            { ...t.pricing.plans.enterprise, icon: <FaCrown />, popular: false, price: "Custom", period: "" }
          ].map((plan, index) => (
            <div key={index} className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}>
              {plan.popular && <div className={styles.popularBadge}>{t.pricing.plans.pro.popular}</div>}
              
              <div className={styles.cardHeader}>
                <div className={styles.planIcon}>{plan.icon}</div>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.featureItem}>
                    <FaCheck className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <a href="/" className={plan.popular ? styles.primaryBtn : styles.secondaryBtn}>
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHead}>
          <h2>{t.pricing.faqTitle}</h2>
          <p>{t.pricing.faqSubtitle}</p>
        </div>
        
        <div className={styles.faqGrid}>
          {t.pricing.faqItems.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h3>{t.pricing.ctaTitle}</h3>
          <p>{t.pricing.ctaSubtitle}</p>
          <div className={styles.ctaButtons}>
            <a href="/voice" className={styles.primaryBtn} onClick={(e) => { e.preventDefault(); requireMobile(() => navigate("/voice")); }}>{t.pricing.startForFree}</a>
            <a href="/features" className={styles.secondaryBtn}>{t.pricing.learnMore}</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
