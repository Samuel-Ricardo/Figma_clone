import './icon.style.scss';

import {
  ActiveElement,
  IElement,
} from '@/@types/store/canvas/element/active.type';
import { Button } from '@/app/components/ui/button/button.component';
import { useActiveElementStore } from '@/store/canvas/element/active.store';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useMemo } from 'react';

interface IShapeMenuIconProps {
  item: IElement<Array<ActiveElement>>;
}

export const ShapesMenuIcon = ({ item }: IShapeMenuIconProps) => {
  const { element: activeElement } = useActiveElementStore();

  const isDropDownElement = useMemo(
    () => item?.value.some(element => element?.value === activeElement?.value),
    [item, activeElement?.value],
  );

  console.log({ item });

  return (
    <DropdownMenuTrigger asChild className="no-ring">
      <Button
        className="btn--shapes-menu--active-element"
        onClick={e => console.log({ e })} //handleActiveElement(item)}
      >
        {(activeElement?.icon || item?.icon) && (
          <Image
            src={isDropDownElement ? activeElement!.icon : item!.icon}
            alt={item?.name || ''}
            fill
            className={isDropDownElement ? 'invert' : ''}
          />
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};
