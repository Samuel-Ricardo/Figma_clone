export interface IPointerStore {
  lastPointerEvent?: PointerEvent;

  setLastEvent(event: PointerEvent): void;
}
