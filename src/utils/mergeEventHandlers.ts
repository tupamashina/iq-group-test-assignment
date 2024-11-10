import type { SyntheticEvent } from 'react';

type Event = globalThis.Event | SyntheticEvent;
type EventHandler<E extends Event> = (event: E) => void;
type EventHandlers<E extends Event> = Partial<EventHandler<E>[]>;

export function mergeEventHandlers<E extends Event>(
  ...handlers: EventHandlers<E>
): EventHandler<E>;

export function mergeEventHandlers<E extends Event>(
  handlers: EventHandlers<E>,
  ignorePreventDefault?: boolean,
): EventHandler<E>;

export function mergeEventHandlers<E extends Event>(
  ...args: EventHandlers<E> | [EventHandlers<E>, boolean?]
): EventHandler<E> {
  let handlers: EventHandlers<E>;
  let ignorePreventDefault: boolean | undefined;

  if (!Array.isArray(args[0])) handlers = args as EventHandlers<E>;
  else [handlers, ignorePreventDefault] = args as [EventHandlers<E>, boolean?];

  return (event) => {
    for (const handler of handlers) {
      if (!ignorePreventDefault && event.defaultPrevented) break;
      handler?.(event);
    }
  };
}
