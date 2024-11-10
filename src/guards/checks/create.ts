import {
  check,
  type CheckAction,
  type CheckIssue,
  type ErrorMessage,
} from 'valibot';

type CheckArg = [unknown?];
type CheckMessage<I> = ErrorMessage<CheckIssue<I>> | undefined;

export interface Check<I, A extends CheckArg> {
  (...args: A): CheckAction<I, undefined>;

  <const M extends CheckMessage<I>>(
    ...args: [...(A extends [] ? [undefined] : A), message: M]
  ): CheckAction<I, M>;
}

export function createCheck<I, A extends CheckArg>(
  requirement: (...args: [input: I, ...A]) => boolean,
): Check<I, A> {
  return <const M extends CheckMessage<I>>(
    ...args: A | [...(A extends [] ? [undefined] : A), message: M]
  ) =>
    check(
      (input: I) => requirement(input, ...(args as A)),
      args.length === 2 ? (args.pop() as M) : undefined,
    );
}
