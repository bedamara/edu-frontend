import { ComponentPropsWithoutRef, FC } from 'react';

export const CompletePercentage: FC<
    ComponentPropsWithoutRef<'div'> & {
        data?: number | string | null;
    }
> = (props) => {
    const { data } = props;

    return <span>{data ? `${data} %` : '-'}</span>;
};
