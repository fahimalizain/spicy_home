import styles from './index.module.scss';

import { LandingComponent } from '../components/landing-component';
import { BestSellersComponent } from '../components/best-sellers-component';
import { AboutComponent } from '../components/about-component';
import { ServicesComponent } from '../components/services-component';
import { StatsComponent } from '../components/stats-component';
import { ReviewsComponent } from '../components/reviews-component';
import { ContactComponent } from '../components/contact-component';

export function Index() {
  return (
    <div className={styles.page}>
      <LandingComponent />
      <div>
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
