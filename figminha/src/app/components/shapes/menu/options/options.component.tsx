import { ActiveElement } from '@/@types/store/canvas/element/active.type';
import { Button } from '@/app/components/ui/button/button.component';
import { useActiveElementStore } from '@/store/canvas/element/active.store';
import Image from 'next/image';
import { useMemo } from 'react';

export interface IShapesMenuOptionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key: any;
  item: ActiveElement;
}

export const ShapesMenuItemOptions = ({
  item,
  key,
}: IShapesMenuOptionsProps) => {
  const { element: activeElement } = useActiveElementStore();
  const isActualElementActive = useMemo(
    () => activeElement?.value === item?.value,
    [activeElement?.value, item?.value],
  );

  console.log({ item });

  return (
    <Button
      key={key}
      onClick={() => {
        //      handleActiveElement(element => console.log({ element }));
      }}
      className={`shape-menu--option ${isActualElementActive ? 'bg-primary-green' : 'hover:bg-primary-grey-200'}`}
    >
      <div>
        <Image
          src={item?.icon || ''}
          alt={item?.name || ''}
          width={20}
          height={20}
          className={isActualElementActive ? 'invert' : ''}
        />
        <p
          className={
            isActualElementActive ? 'text-primary-black' : 'text-white'
          }
        >
          {item?.name}
        </p>
      </div>
    </Button>
  );
};
