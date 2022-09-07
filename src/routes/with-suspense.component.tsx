/* eslint-disable react/jsx-props-no-spreading */
import { ComponentType, Suspense, SuspenseProps } from 'react';

export default function withSuspense<T extends object>(
  Component: ComponentType<T>,
  fallback: SuspenseProps['fallback'] = null
): (props: T) => JSX.Element {
  return function ComponentWithSuspense(props: T) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}
