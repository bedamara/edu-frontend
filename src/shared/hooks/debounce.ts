import debounce from 'debounce';
import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = (callback: () => void, wait = 1000) => {
    const ref = useRef<() => void>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, wait);
    }, [wait]);

    return debouncedCallback;
};
