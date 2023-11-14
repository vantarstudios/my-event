import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

const AppPage: NextPage = () => {
    redirect('/dashboard');
};

export default AppPage;
