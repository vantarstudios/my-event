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
            <div className="flex flex-col gap-5 pt-5 child:w-fit child:font-semibold">
                <p className="flex justify-between items-center gap-20 mb-10">
                    Language
                    <Button
                        disabled={mode === 'view'}
                        className={`px-5 ${mode === 'view' ? 'text-black bg-white cursor-default' : ''}`}
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
