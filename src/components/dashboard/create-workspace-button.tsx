import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/buttons';

const CreateWorkspaceButton: FunctionComponent = () => {
    return (
        <Link href="/dashboard/events/create" className="w-fit focus:outline-none">
            <Button className="min-w-max h-fit px-10">New event</Button>
        </Link>
    );
};

export default CreateWorkspaceButton;
