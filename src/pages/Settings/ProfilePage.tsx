import React from 'react';
import SettingsLayout from '../../layout/settings_layout';
import EditProfile from '../../components/UserEditProfile/EditProfile';

const ProfilePage: React.FC = () => {
    return (
        <div>
            <SettingsLayout>
                <EditProfile />
            </SettingsLayout>
        </div>
    );
}

export default ProfilePage;