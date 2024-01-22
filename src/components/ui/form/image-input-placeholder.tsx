import type { FunctionComponent } from 'react';
import { Picture } from '@components/ui/icons';

interface ImageInputPlaceholderProps {
    message?: string;
    subMessage?: string;
}

const ImageInputPlaceholder: FunctionComponent<ImageInputPlaceholderProps> = ({ message, subMessage }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full h-full p-5 bg-transparent">
            <Picture className="w-1/2 aspect-square text-white"/>
            <div className="flex flex-col justify-center items-center gap-2.5 w-full text-white child:w-2/3 child:text-center">
                <p className="min-w-max font-medium">{message}</p>
                <p className="text-sm">{subMessage}</p>
            </div>
        </div>
    );
};

export default ImageInputPlaceholder;
