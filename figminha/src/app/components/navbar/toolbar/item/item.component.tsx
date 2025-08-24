'use client';

import { ShapesMenu } from '@/app/components/shapes/menu/menu.component';
import './item.style.scss';

import { IElement } from '@/@types/store/canvas/element/active.type';
import { useActiveElementStore } from '@/store/canvas/element/active.store';
import Image from 'next/image';
import { useCallback } from 'react';
import { Button } from '@/app/components/ui/button/button.component';
import { NewThread } from '@/app/components/thread/thread.component';

export interface INavbarToolBarItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <NewThread>
          <Button className="relative w-5 h-5 object-contain">
            <Image
              src={item.icon}
              alt={item.name}
              fill
              className={isActive(item.value) ? 'invert' : ''}
            />
          </Button>
        </NewThread>
      ) : (
        <Button>
          <Image
            src={item.icon}
            alt={item.name}
            width={24}
            height={24}
            className={isActive(item.value) ? 'invert' : ''}
          />
        </Button>
      )}
    </li>
  );
};
