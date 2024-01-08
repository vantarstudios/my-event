import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

const DashboardHelpPage: NextPage = () => {
    redirect('/contact-us');
};

export default DashboardHelpPage;
