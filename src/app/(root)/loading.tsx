import type { FunctionComponent } from 'react';
import { Loader } from '@components/ui';

const RootLoading: FunctionComponent = () => {
    return (
        <div className="flex items-center justify-center w-full h-[85vh]">
            <Loader/>
        </div>
    )
};

export default RootLoading;
