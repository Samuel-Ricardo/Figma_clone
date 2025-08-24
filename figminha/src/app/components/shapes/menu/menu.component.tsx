import {
  ActiveElement,
  IElement,
} from '@/@types/store/canvas/element/active.type';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';
import { ShapesMenuIcon } from './icon/icon.component';
import { ShapesMenuItemOptions } from './options/options.component';

export interface IShapeMenuProps {
  item: IElement<Array<ActiveElement>>;
}

export const ShapesMenu = ({ item }: IShapeMenuProps) => {
  console.log({ item });
  return (
    <>
      <DropdownMenu>
        <ShapesMenuIcon item={item} />

        <DropdownMenuContent className="shapes-menu--content">
          {item.value.map(element => (
            <ShapesMenuItemOptions item={element} key={element?.value} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
