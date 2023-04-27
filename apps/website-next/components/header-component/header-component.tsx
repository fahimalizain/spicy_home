import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './header-component.module.scss';

export function HeaderComponent() {
  const [isExpanded, setIsExpanded] = useState(true);

  const [NavbarShadow, setNavbarShadow] = useState('35px');
  const [showPhoneIcon, setShowPhoneIcon] = useState(true);
  const router = useRouter();
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 80) {
        setIsExpanded(false);
        setNavbarShadow('shadow-lg shadow-black-500/50');
        setShowPhoneIcon(false);
      } else {
        setIsExpanded(true);
        setNavbarShadow('');
        setShowPhoneIcon(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    return router.pathname === href ? styles.active : '';
  };

  const [showResults, setShowResults] = useState(false);

  const onClick = () => {
    setShowResults(!showResults);
  };
  const onClose = () => {
    setShowResults(false);
  };
  const links = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/menu', label: 'MENU' },
    { href: '/reviews', label: 'REVIEWS' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <div>
      {/* Navbar */}
      <div
        className={`fixed top-0 w-full  ${NavbarShadow} z-30 ease-in duration-300 flex flex-row items-center space-x-14 bg-light-pink`}
        style={{ height: isExpanded ? '10em' : '4em' }}
      >
        <img
          src="/images/logo.svg"
          className="float-left  sm:pl-24 pl-4"
          alt="logo"
          style={{ height: '80%' }}
        ></img>

        <div className="grow "></div>
        <button className=" block sm:hidden z-50 pr-3" onClick={onClick}>
          <img src="/images/hamburger.svg" alt="add" />
        </button>

        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={` sm:block hidden text-black font-extrabold text-sm  hover:text-nav-hover-text py-3 px-4   ${isActive(
              '/'
            )}`}
          >
            {link.label}
          </a>
        ))}
        {showPhoneIcon && (
          <div className="sm:block hidden my-8 ml-4 flex items-center bg-nav-hover-text rounded cursor-pointer ">
            <div className="flex flex-row">
              <img
                src="/images/header-phone-icon.svg"
                className="w-3 ml-2"
                alt="food"
              ></img>

              <h6 className="hidden sm:block font-bold text-xs m-2 ">
                0483-2287690
              </h6>
            </div>
          </div>
        )}
        <button
          className="hidden sm:block pr-4  w-12"
          type="button"
          onClick={() =>
            setLanguage(language === 'english' ? 'arabic' : 'english')
          }
        >
          {language === 'english' ? (
            <img src="/images/english-button.svg" alt="Button Image" />
          ) : (
            <img src="/images/arabic-button.svg" alt="Button Image" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className="fixed z-40 right-0 ">
        <button
          className="absolute right-3 top-5 block  sm:hidden"
          onClick={onClose}
        >
          <img src="/images/close-icon.svg" alt="add" />
        </button>
        {showResults && (
          <>
            <div
              className="block sm:hidden  bg-sidebar-color flex flex-col h-screen	 w-52  items-center space-y-6 shadow-inner
              border-4 border-r-sidebar-color border-y-sidebar-border border-l-sidebar-border tilewind-box"
            >
              <div className="grow"></div>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block sm:hidden  text-black font-extrabold text-sm  hover:text-nav-hover-text py-3 px-4  ${isActive(
                    '/'
                  )}`}
                >
                  {link.label}
                </a>
              ))}
              <button
                className="pr-4 w-12"
                type="button"
                onClick={() =>
                  setLanguage(language === 'english' ? 'arabic' : 'english')
                }
              >
                {language === 'english' ? (
                  <img src="/images/english-button.svg" alt="Button Image" />
                ) : (
                  <img src="/images/arabic-button.svg" alt="Button Image" />
                )}
              </button>
              <div className="grow"></div>
              <div className="grow"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderComponent;
