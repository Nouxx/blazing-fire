type GenericInputEvent<T> = Event & { currentTarget: EventTarget & T };

export type GenericInputElement = GenericInputEvent<HTMLInputElement>;
