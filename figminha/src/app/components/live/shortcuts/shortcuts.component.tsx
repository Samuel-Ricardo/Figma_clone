'use client';

import { MODULES } from '@/@modules/app.factory';
import { useCanvasActions } from '@/hook/canvas/actions/actions.hook';
import { useCursorState } from '@/store/cursor/cursor.store';
import {
  ContextMenuContent,
  ContextMenuItem,
} from '@radix-ui/react-context-menu';
import { useCallback } from 'react';

export const Shortcuts = () => {
  const { SHORTCUT } = MODULES.INFRA.CONFIG.CONST();
  const { redo, undo } = useCanvasActions();
  const { setChatState, setReactionSelectorState } = useCursorState();

  const handleContextMenuClick = useCallback(
    (key: string) => {
      switch (key) {
        case 'Chat':
          setChatState({ message: '', previousMessage: null });
          break;

        case 'Reaction':
          setReactionSelectorState();
          break;

        case 'Undo':
          undo();
          break;

        case 'Redo':
          redo();
          break;

        default:
          break;
      }
    },
    [setChatState, setReactionSelectorState, undo, redo],
  );

  return (
    <ContextMenuContent className="right-menu-content">
      {SHORTCUT.map(shortcut => (
        <ContextMenuItem
          key={shortcut.key}
          className="right-menu-item"
          onClick={() => handleContextMenuClick(shortcut.name)}
        >
          <p>{shortcut.name}</p>
          <p className="text-xs text-primary-grey-300">{shortcut.shortcut}</p>
        </ContextMenuItem>
      ))}
    </ContextMenuContent>
  );
};
