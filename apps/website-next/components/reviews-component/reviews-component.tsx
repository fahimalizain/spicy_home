import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { useBreakpoint } from '../../hooks/useBreakpoint';

/* eslint-disable-next-line */
export interface ReviewsComponentProps {}

const reviewsData = [
  {
    text: 'We have had multiple takeaways from this restaurant, from chicken biryani to noodles to manchurian.. Taste has always been great with good portions. I would surely order again.',
    name: 'NATI 55',
    reviewDate: '3 days ago',
  },
  {
    text: 'We have had multiple takeaways from this restaurant, from chicken biryani to noodles to manchurian.. Taste has always been great with good portions. I would surely order again.',
    name: 'Arunava',
    reviewDate: '4 days ago',
  },
  {
    text: 'We have had multiple takeaways from this restaurant, from chicken biryani to noodles to manchurian.. Taste has always been great with good portions. I would surely order again.',
    name: 'NATI 55',
    reviewDate: '1 week ago',
  },
  {
    text: 'We have had multiple takeaways from this restaurant, from chicken biryani to noodles to manchurian.. Taste has always been great with good portions. I would surely order again.',
    name: 'Arunava',
    reviewDate: '3 week ago',
  },
  {
    text: 'We have had multiple takeaways from this restaurant, from chicken biryani to noodles to manchurian.. Taste has always been great with good portions. I would surely order again.',
    name: 'Arunava',
    reviewDate: '1 month ago',
  },
];

export function ReviewsComponent(props: ReviewsComponentProps) {
  const { isSm } = useBreakpoint('sm');
  const { isLg } = useBreakpoint('lg');

  const getSlidesPerView = () => {
    if (isLg) {
      return 3;
    }
    if (isSm) {
      return 1.5;
    }
    return 1.8;
  };

  return (
    <div className="">
      <div className="flex flex-col items-center text-center">
        <div className="font-bold sm:text-2xl py-6 sm:py-8">
          <h1>What customers say about us...</h1>
        </div>
        <div className="text-xs  px-4 mb-8">
          <p>
            We’ve always strived to deliver the best of dishes and services to
            our customers and <br></br>they have welcomed us with their hearts
            :)
          </p>
        </div>
      </div>
      <div className="py-16 sm:mx-16 ml-4 ">
        <Swiper
          spaceBetween={10}
          slidesPerView={getSlidesPerView()}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {reviewsData.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col sm:mx-16  bg-reviews-color rounded-lg sm:h-80  h-80  p-4 md:w-full sm:w-full space-y-2.5">
                <img
                  src="/images/review-star.svg"
                  className=" sm:w-40 w-32 pt-8 pl-4  "
                  alt="food"
                ></img>
                <div className="grow"></div>

                <p className="text-xs ml-2 pb-4">{review.text}</p>
                <div className="sm:grow"></div>
                <div className=" flex sm:flex-row flex-col sm:py-8 sm:px-8 pl-3   ">
                  <h2 className="text-xs font-black text-nav-hover-text ">
                    {' '}
                    {review.name}
                  </h2>
                  <div className="sm:grow"></div>
                  <h3 className="text-xs ">{review.reviewDate}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewsComponent;
