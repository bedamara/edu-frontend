import { ComponentPropsWithoutRef, FC } from 'react';

export const CompleteTime: FC<
    ComponentPropsWithoutRef<'div'> & {
        data?: number | string | null;
    }
> = (props) => {
    const { data } = props;

    return <span className="md:text-center">{data ? data : '-'}</span>;
};
