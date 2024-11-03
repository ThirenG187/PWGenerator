export module global {
  export interface Event {
    target: EventTarget | { value: string };
  }
}
