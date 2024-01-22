import type { FunctionComponent } from 'react';
import type { Mode } from '@/types';
import { TitledArea } from '@components/ui/layouts';
import { Button } from '@components/ui/buttons';

interface OtherSettingsProps {
    mode: Mode;
}

const OtherSettings: FunctionComponent<OtherSettingsProps> = ({ mode }) => {
    return (
        <TitledArea title="Others">
            <div className="flex flex-col justify-between gap-5 pt-5 child:font-semibold">
                <p className="relative">
                    Language
                    <Button
                        disabled={mode === 'view'}
                        className={`absolute top-1/2 left-full -translate-y-1/2 min-w-max px-5 ${mode === 'view' ? 'text-black bg-white cursor-default' : ''}`}
                    >
                        English (default)
                    </Button>
                </p>
                <p className="cursor-pointer hover:underline">Policies</p>
                <p className="cursor-pointer hover:underline">Terms & Conditions</p>
            </div>
        </TitledArea>
    );
};

export default OtherSettings;
