export const useComposerClick = () => {
  const isClickInsideComposer = (event: MouseEvent) =>
    event
      .composedPath()
      .some((el: EventTarget) =>
        (el as HTMLElement)?.classList?.contains('lb-composer-editor-actions'),
      );

  return {
    isClickInsideComposer,
  };
};
