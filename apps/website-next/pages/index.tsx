import styles from './index.module.scss';

import { LandingComponent } from '../components/landing-component';
import { BestSellersComponent } from '../components/best-sellers-component';
import { AboutComponent } from '../components/about-component';
import { ServicesComponent } from '../components/services-component';
import { StatsComponent } from '../components/stats-component';
import { ReviewsComponent } from '../components/reviews-component';
import { ContactComponent } from '../components/contact-component';
import { useState, useEffect } from 'react';

export function Index() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      <div className="relative">
        <LandingComponent />
        {hasScrolled && (
          <div className="fixed bottom-5 sm:right-5 flex flex-col z-10  w-20">
            <button
              className=""
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src="/images/scrollTotop.svg" alt="scroll to top" />
            </button>
            <button
              className=""
              onClick={() => window.open('tel:966112357926')}
            >
              <img src="/images/callButton.svg" alt="call us" />
            </button>
            <button className="">
              <a
                href="https://wa.me/966533243439"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/whatsapButton.svg"
                  alt="message us on WhatsApp"
                />
              </a>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-stretch md:px-20 lg:px-40 z-0">
        <BestSellersComponent />
        <AboutComponent />
        <ServicesComponent />
      </div>
      <StatsComponent />
      <ReviewsComponent />
      <ContactComponent />
    </div>
  );
}

export default Index;
