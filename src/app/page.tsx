import type { NextPage } from 'next';
import Link from 'next/link';

const AppPage: NextPage = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Link href="/dashboard" className="underline">
                Go to Dashboard
            </Link>
        </div>
    )
};

export default AppPage;
