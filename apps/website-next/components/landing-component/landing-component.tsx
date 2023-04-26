import React, { useState, useEffect } from 'react';
import styles from './landing-component.module.scss';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface LandingComponentProps {}

export function LandingComponent(props: LandingComponentProps) {
  const [animationIndex, setAnimationIndex] = useState(0);
  const animationTexts = ['class', 'passion', 'love', 'beauty'];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => (prevIndex + 1) % animationTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={
        styles['container-height'] +
        ' max-width 1024px min-h-full   grid grid-cols-1 md:grid-cols-2  '
      }
    >
      <div className="flex flex-col items-start pt-16 ">
        <div className="flex-none grow "></div>
        <div className="flex-none grow  block sm:hidden "></div>

        <h1 className="  text-4xl pl-4 sm:pt-0 mt-32 font-black text-black  sm:text-6xl sm:pl-8">
          Bringing{' '}
          <span className={classNames('text-animation-text', styles[''])}>
            {animationTexts[animationIndex]}
          </span>{' '}
          <br></br>
          to cuisine.
        </h1>

        <div>
          <h1 className=" sm:text-xl sm:pl-8 sm:pt-8 font-medium text-base pl-4 pt-8">
            With hundreds of flavors under one roof,<br></br> you can&apos;t eat
            here
            <span className="text-animation-text"> just once</span>.
          </h1>
        </div>
        <div className="box-border border-sidebar-border my-6 ml-4 w-48 border-2 flex items-center  hover:bg-sidebar-border rounded sm:ml-8 sm:mt-8 cursor-pointer">
          <div>
            <h6 className="font-bold text-xs sm:py-0 py-3 pl-4 sm:m-3 ">
              EXPLORE OUR MENU
            </h6>
          </div>
          {/* //////// */}
          <div className="">➨</div>

          {/* ///// */}
        </div>
        <div className="flex-none grow "></div>
        <div className="flex-none grow "></div>
      </div>
      <div
        className={classNames(
          'flex flex-col justify-center items-center',
          styles['food-img-container']
        )}
      >
        <div className="relative p-10">
          <img
            src="/images/landing-main-image.svg"
            className={classNames(
              'rounded-full relative w-72 z-10 ',
              styles['img.rounded']
            )}
            alt="food"
          ></img>
          <img
            src="/images/landing-main-image-decorator.svg"
            className={classNames('absolute', styles['img.rounded'])}
            style={{
              top: '2em',
              left: 0,
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default LandingComponent;
