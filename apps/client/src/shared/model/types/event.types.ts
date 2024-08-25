export type IEventClick<T> = React.MouseEvent<T>;

export type IEventFn<T> = (e: IEventClick<T>) => void;
