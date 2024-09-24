import { Ref, useCallback } from 'react';

interface MutableRefObject<T> {
    current: T;
}

export const useComposedRefs = <T>(...refs: Ref<T>[]) => {
    const composedRefs = useCallback(
        (instance: T) => {
            refs.forEach((ref) => {
                if (!ref) {
                    return;
                }
                if (typeof ref === 'function') {
                    ref(instance);
                } else if (typeof ref === 'object' && 'current' in ref) {
                    (ref as MutableRefObject<T>).current = instance;
                }
            });
        },
        [refs],
    );

    return composedRefs;
};
