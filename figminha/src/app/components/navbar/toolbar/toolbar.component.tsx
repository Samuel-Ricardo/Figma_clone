//'use client';

import './toolbar.style.scss';

import { MODULES } from '@/@modules/app.factory';
import { NavbarToolBarItem } from './item/item.component';

export const NavbarToolbar = () => {
  //const {} = useActiveElementHandler();
  //const {} = useImageUploadHandler();

  const NAV_ELEMENTS = MODULES.INFRA.CONFIG.CONST().NAV.ELEMENT.ALL;

  return (
    <ul id="toolbar--container">
      {NAV_ELEMENTS.map(item => (
        <NavbarToolBarItem key={item.name} item={item} />
      ))}
    </ul>
  );
};
