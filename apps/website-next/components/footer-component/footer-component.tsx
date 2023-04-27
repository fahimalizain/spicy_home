import styles from './footer-component.module.scss';

/* eslint-disable-next-line */
export interface FooterComponentProps {}

export function FooterComponent(props: FooterComponentProps) {
  const menuItems = [
    { name: 'Menu', link: '/menu' },
    { name: 'Services', link: '/services' },
    { name: 'About us', link: '/about' },
    { name: 'Reviews', link: '/reviews' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <div className="box-border bg-footer-color flex sm:flex-row flex-col py-32 items-center justify-evenly ">
      <div className="flex flex-row space-x-6 sm:space-x-28 pb-6 px-4">
        <img src="/images/logo.svg" className="" alt="" />
        <div>
          <p className="text-sm sm:text-base">
            Spicy Home is an Indian multi-cuisine restaurant
            <br />
            located in Riyadh, Saudi Arabia. We serve authentic
            <br />
            dishes in a great ambience at reasonable prices.We
            <br />
            have been trusted and loved by customers for over 19
            <br />
            years. We look forward to serving you!
          </p>
        </div>
      </div>
      <div className="flex flex-row sm:space-x-24 space-x-14 ">
        <div className="flex sm:flex-row flex-col space-y-5 sm:space-x-5 sm:space-y-0">
          {[
            {
              src: '/images/footer-mailI-icon.svg',
              alt: 'mail',
              link: 'mailto:info@spicyhome.com',
            },
            {
              src: '/images/footer-instagram-icon.svg',
              alt: 'instagram',
              link: 'https://www.instagram.com/spicyhome/',
            },
            {
              src: '/images/footer-whatsapp-icon.svg',
              alt: 'whatsapp',
              link: 'https://wa.me/966123456789',
            },
            {
              src: '/images/footer-google-icon.svg',
              alt: 'google',
              link: 'https://www.google.com/maps/place/Spicy+Home/',
            },
          ].map((image, index) => (
            <a
              key={index}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.src} className="pl-8 sm:w-14" alt={image.alt} />
            </a>
          ))}
        </div>
        <div className="text-sm sm:text-sm">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link}>
              <h1>{item.name}</h1>
            </a>
          ))}
        </div>
        <div className="text-sm sm:text-sm">
          <a href="/privacy-policy">
            <h1>Privacy Policy</h1>
          </a>
          <a href="/terms-conditions">
            <h1>Terms &amp; Conditions</h1>
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
