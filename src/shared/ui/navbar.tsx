import { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
};

export const Navbar: FC<Props> = (props) => {
    const { leftComponent, rightComponent } = props;
    return (
        <div className=" fixed left-0 top-0 z-20 flex min-h-16 w-full justify-center  bg-slate-700 px-4 py-2 text-white">
            <div className="flex w-full max-w-5xl items-center justify-between px-4">
                {leftComponent && <>{leftComponent}</>}
                {rightComponent && <>{rightComponent}</>}
            </div>
        </div>
    );
};
