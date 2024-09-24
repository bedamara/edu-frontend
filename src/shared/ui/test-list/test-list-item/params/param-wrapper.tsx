import { ComponentPropsWithoutRef, FC } from 'react';

export const ParamWrapper: FC<
    ComponentPropsWithoutRef<'div'> & { subTitle?: string }
> = (props) => {
    return (
        <div className={props.className}>
            <div
                className={
                    'flex h-full flex-col items-start justify-center gap-1 md:items-center'
                }>
                <span className="block text-xs text-gray-400 md:hidden">
                    {props.subTitle ? props.subTitle : null}
                </span>
                {props.children}
            </div>
        </div>
    );
};
