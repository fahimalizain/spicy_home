import styles from './contact-component.module.scss';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface ContactComponentProps {}

interface SocialMedia {
  name: string;
  icon: string;
  link: string;
  hoverIcon: string;
}
const socialMediaLinks: SocialMedia[] = [
  {
    name: 'WhatsApp',
    icon: '/images/contact-whtsapp-icon.svg',
    hoverIcon: '/images/contact-hover-whtsap-icon.svg',
    link: 'https://wa.me/966533243439',
  },
  {
    name: 'Instagram',
    icon: '/images/contact-instagram-icon.svg',
    hoverIcon: '/images/contact-hover-instagram-icon.svg',
    link: 'https://www.instagram.com/https://www.instagram.com/',
  },
  {
    name: 'Email',
    icon: '/images/contact-mail-icon.svg',
    hoverIcon: '/images/contact-hover-mail-icon.svg',
    link: 'mailto:my_email@example.com',
  },
];

export function ContactComponent(props: ContactComponentProps) {
  const [hoveredIcon, setHoveredIcon] = useState('');
  const handleIconHover = (iconName: string) => {
    setHoveredIcon(iconName);
  };

  const handleIconLeave = () => {
    setHoveredIcon('');
  };
  return (
    <div className="flex flex-col items-center text-center ">
      <div className="font-bold sm:text-2xl py-6 sm:py-8">
        <h1>We’d love to hear from you!</h1>
      </div>
      <div className="box-border bg-reviews-color w-full flex sm:flex-row flex-col place-content-between sm:py-0 py-8 space-y-4 ">
        <div className=" order-2 sm:order-none ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d925.7665316362331!2d46.78052130904308!3d24.73659229926694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f010487239091%3A0xe138b8674380d242!2z2YXYt9i52YUg2LPYqNin2YrYs9mKINmH2YjZhSDYp9mE2YfZhtiv2YogfCBTUElDWSBIT01FIElORElBTiBSRVNUQVVSQU5UIFJJWUFESA!5e0!3m2!1sen!2sin!4v1681447749356!5m2!1sen!2sin"
            width="600"
            height="450"
            className="sm:h-96 sm:w-96 h-44 w-full border-8 border-media-button "
            loading="lazy"
          ></iframe>
        </div>

        {/* /////////// */}
        <div className="sm:grow "></div>
        <div className="flex flex-col space-y-5 space-x-5  ">
          <div className="sm:grow"></div>
          <div className="flex flex-row items-center text-center ">
            <img
              src="/images/contact-icon.svg"
              className=" w-4  "
              alt="food"
            ></img>
            <h1 className="text-sm	pl-8">+96 6112357926</h1>
          </div>
          <div className="flex flex-row items-center  text-center">
            <img
              src="/images/contact-location-icon.svg"
              className=" w-6 "
              alt="location"
            ></img>
            <h1 className="text-sm text-left pl-8 ">
              4587 Hafsah Bint Omar,<br></br> street، Riyadh 13211, Saudi Arabia
            </h1>
          </div>
          <div className="flex flex-row items-center text-center">
            <img
              src="/images/contact-time-icon.svg"
              className=" w-4 "
              alt="opening"
            ></img>
            <h1 className="text-sm pl-8">12:00 PM - 01:15 AM </h1>
          </div>
          <div className="sm:grow"></div>
        </div>
        {/* ///// */}
        <div className="sm:grow"></div>
        <div className="flex flex-col space-y-5 space-x-7 order-4 sm:order-none">
          <div className="sm:grow"></div>
          <div className="font-black sm:text-2xl  sm:py-8">
            <h1 className="text-left font-bold sm:text-2xl">
              Connect with us on:
            </h1>
          </div>
          <div className="flex flex-row space-x-16 cursor-pointer">
            {socialMediaLinks.map((socialMedia) => (
              <a
                key={socialMedia.name}
                href={socialMedia.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-media-button p-3"
                onMouseEnter={() => handleIconHover(socialMedia.name)}
                onMouseLeave={() => handleIconLeave()}
              >
                <img
                  src={
                    hoveredIcon === socialMedia.name
                      ? socialMedia.hoverIcon
                      : socialMedia.icon
                  }
                  className="sm:w-5"
                  alt={socialMedia.name}
                />
              </a>
            ))}
          </div>
          <div className="sm:grow"></div>
        </div>
        <div className="sm:grow"></div>
      </div>
    </div>
  );
}

export default ContactComponent;
