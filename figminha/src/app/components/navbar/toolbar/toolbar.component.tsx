'use client';

import './toolbar.style.scss';

import { MODULES } from '@/@modules/app.factory';
import { IElement } from '@/@types/store/canvas/element/active.type';
import { useActiveElement } from '@/store/canvas/element/active.store';
import { useCallback } from 'react';

export const NavbarToolbar = () => {
  //const {} = useActiveElementHandler();
  //const {} = useImageUploadHandler();
  const handleActiveElement = (value: string) => console.log({ value });
  const { isActive, element } = useActiveElement();

  const onClick = useCallback((item: IElement) => {
    if (!Array.isArray(item.value)) handleActiveElement(item.value);
  }, []);

  const NAV_ELEMENTS = MODULES.INFRA.CONFIG.CONST().NAV.ELEMENT.ALL;

  return (
    <ul>
      {NAV_ELEMENTS.map(item => (
        <li
          key={item.name}
          onClick={() => onClick(item)}
          className={`${isActive(item.value, element) ? 'bg-primary-green' : 'hover:bg-primary-grey-200'}`}
        ></li>
      ))}
    </ul>
  );
};
