import { type ReadonlyURLSearchParams } from 'next/navigation';
import {
  type AnyStateMachine,
  type AreAllImplementationsAssumedToBeProvided,
} from 'xstate';

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

// workaround for this bug https://github.com/statelyai/xstate/issues/3725
export function confirmAllImplementationsAreProvided<
  TMachine extends AnyStateMachine
>(
  m: AreAllImplementationsAssumedToBeProvided<
    TMachine['__TResolvedTypesMeta']
  > extends true
    ? TMachine
    : never
): TMachine {
  return m;
}
