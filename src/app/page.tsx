import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

const AppPage: NextPage = () => {
    redirect('/auth/signup');
};

export default AppPage;
