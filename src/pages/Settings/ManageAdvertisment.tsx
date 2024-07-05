import React from 'react';
import ManageAdvertisementTable from '../../components/ManageAdvertisment/ManageAdvertismentTable';
import SettingsLayout from '../../layout/settings_layout';


const ManageAdvertisementPage: React.FC = () => {

    return (
        <>
            <SettingsLayout>
                <div className="px-1 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                    <ManageAdvertisementTable />
                </div>
            </SettingsLayout>
        </>
    );
}


export default ManageAdvertisementPage;