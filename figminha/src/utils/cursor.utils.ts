export const getCursorPosition = (event: React.PointerEvent) => {
  return {
    x: event.clientX - event.currentTarget.getBoundingClientRect().x,
    y: event.clientY - event.currentTarget.getBoundingClientRect().y,
  };
};
