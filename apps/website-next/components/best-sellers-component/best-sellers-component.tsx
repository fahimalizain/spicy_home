import { useState } from 'react';
import styles from './best-sellers-component.module.scss';

/* eslint-disable-next-line */
export interface BestSellersComponentProps {}

interface ItemProps {
  imgSrc: string;
  itemName: string;
  itemDescription: string;
  itemPrice: string;
}

function Item({ imgSrc, itemName, itemDescription, itemPrice }: ItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="box-border bg-light-pink rounded-t-lg my-4 overflow-hidden">
      <div className="item-img relative">
        <img
          src={imgSrc}
          className="w-100"
          style={{
            objectFit: 'cover',
          }}
          alt={itemName}
        ></img>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-0 bottom-0 left-0 right-0 h-full w-full transition duration-500 ease-in-out bg-white"
        >
          <div className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="font-black	text-emerald-400">{itemPrice}</h1>
          </div>
        </div>
      </div>
      <h1 className="sm:text-lg font-semibold text-xs my-1 ml-2">{itemName}</h1>
      <p className="text-xs px-2 pb-4">{itemDescription}</p>
    </div>
  );
}

export function BestSellersComponent(props: BestSellersComponentProps) {
  const items = [
    {
      imgSrc: '/images/food.jpg',
      itemPrice: '25.00SAR',
      itemName: 'Premium fish curry',
      itemDescription:
        'Lorem ipsum dolor sit, amet consectetur ipsum id debitis tempora.',
    },
    {
      imgSrc: '/images/food.jpg',
      itemPrice: '50.00SAR',
      itemName: 'Deluxe chicken tikka ',
      itemDescription:
        'Lorem ipsum dolor sit, amet consectetur ipsum id debitis tempora.',
    },
    {
      imgSrc: '/images/food.jpg',
      itemPrice: '15.00SAR',
      itemName: 'Gourmet lamb vindaloo',
      itemDescription:
        'Lorem ipsum dolor sit, amet consectetur ipsum id debitis tempora.',
    },
    {
      imgSrc: '/images/food.jpg',
      itemPrice: '22.00SAR',
      itemName: 'Exotic vegetable korma',
      itemDescription:
        'Lorem ipsum dolor sit, amet consectetur ipsum id debitis tempora.',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h1 className="font-bold text-2xl my-4 mb-16 pb-16">
          Our Best Sellers
        </h1>
      </div>
      <div className="bg-backround-full px-8 sm:px-12 lg:px-28 relative rounded-3xl sm:rounded-t-3xl sm:rounded-b-none">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 items-stretch relative bottom-20">
          {items.map((item, index) => (
            <div key={index}>
              <Item
                imgSrc={item.imgSrc}
                itemPrice={item.itemPrice}
                itemName={item.itemName}
                itemDescription={item.itemDescription}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellersComponent;
