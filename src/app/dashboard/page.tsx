import type { NextPage } from 'next';
import { ViewTitle, CreateWorkspaceButton } from '@components/dashboard';

const DashboardPage: NextPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <ViewTitle>Hi, Gideon!</ViewTitle>
                <CreateWorkspaceButton />
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    );
};

export default DashboardPage;
