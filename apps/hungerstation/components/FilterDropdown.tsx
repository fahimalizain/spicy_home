import React from 'react';
import { Listbox } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { OrderStatus } from '../swr/types';

interface FilterDropdownProps {
  selectedStatuses: string[];
  handleCheckboxChange: (status: OrderStatus) => void;
}

const allStatuses: OrderStatus[] = ['DELIVERED', 'CANCELLED', 'IN_PROGRESS'];

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedStatuses,
  handleCheckboxChange,
}) => {
  return (
    <Listbox as="div">
      {({ open }) => (
        <>
          <div className=" relative">
            <div className="border-2 border-slate-300 rounded-full px-3 py-1">
              <Listbox.Button
                as="button"
                className="block text-sm text-black flex align-center items-center"
              >
                <h1 className="align-middle text-lg">Order Status </h1>
                <FaChevronDown
                  className="pt-[5px] px-[6px]"
                  size={20}
                  style={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </Listbox.Button>
            </div>
            <Listbox.Options
              className={`absolute z-10 mt-2 w-42 py-1 bg-white border border-gray-300 rounded-lg`}
            >
              {allStatuses.map((status, statusIdx) => (
                <li
                  key={statusIdx}
                  className="uppercase xl:text-xs cursor-pointer select-none relative  hover:bg-blue-100 "
                >
                  <div className="flex items-center gap-5 px-10 py-5">
                    <input
                      type="checkbox"
                      className="bg-blue-200"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => handleCheckboxChange(status)}
                    />
                    {status}
                  </div>
                </li>
              ))}
            </Listbox.Options>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default FilterDropdown;
