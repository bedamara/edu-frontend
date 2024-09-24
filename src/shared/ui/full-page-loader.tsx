import { Spinner } from '@/shared/ui/spinner';

export const FullPageLoader = () => {
    return (
        <div className="m-auto flex items-center justify-center">
            <Spinner className="size-16 border-8 border-e-slate-600" />
        </div>
    );
};
