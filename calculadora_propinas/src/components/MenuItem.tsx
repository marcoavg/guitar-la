import type { MenuItemType } from '../types/index';

type MenuItemProps = {
  item: MenuItemType;
  addItem: (item: MenuItemType) => void;
}

export default function MenuItem({item, addItem}: MenuItemProps) {
    return (
      <button className='border-2 
            text-white border-teal-700 
            rounded-lg w-full gap-4 p-4 mb-4 flex 
            justify-between items-center 
            hover:bg-teal-700 hover:border-teal-500
            hover:scale-105 transition-all 
            hover:cursor-pointer'
            onClick={() => addItem(item)}
        >
        <p>{item.name}</p>
        <p className='font-black'>${item.price}</p>
      </button>
    )
}
