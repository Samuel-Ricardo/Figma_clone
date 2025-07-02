import { ShapesMenu } from '@/app/components/shapes/menu/menu.component';
import './item.style.scss';

import {
  ActiveElement,
  IElement,
} from '@/@types/store/canvas/element/active.type';
import { useActiveElementStore } from '@/store/canvas/element/active.store';
import Image from 'next/image';
import { useCallback } from 'react';

export interface INavbarToolBarItemProps {
  item: IElement<any>;
}

export const NavbarToolBarItem = ({ item }: INavbarToolBarItemProps) => {
  const handleActiveElement = (value: string) => console.log({ value });
  const { isActive, element } = useActiveElementStore();

  const onClick = useCallback((item: IElement) => {
    if (!Array.isArray(item.value)) handleActiveElement(item.value);
  }, []);

  return (
    <li
      key={item.name}
      onClick={() => onClick(item)}
      className={`${isActive(item.value, element) ? 'bg-primary-green' : 'hover:bg-primary-grey-200'}`}
    >
      {Array.isArray(item.value) ? (
        <ShapesMenu item={item} />
      ) : item?.value === 'comments' ? (
        <NewThread />
      ) : (
        <Button>
          <Image
            src={item.icon}
            alt={item.name}
            fill
            className={isActive(item.value) ? 'invert' : ''}
          />
        </Button>
      )}
    </li>
  );
};
