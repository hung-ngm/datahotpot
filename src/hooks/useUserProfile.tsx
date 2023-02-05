import { useState, useEffect } from 'react';
import { TUser } from '../../types/user';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const useUserProfile = () => {
    const { data: session } = useSession();
    const userId = session?.user.uid;
    const [userProfile, setUserProfile] = useState<TUser>();

    const loadUserProfile = async () => {
        const user = await axios.get(`/api/profile/${userId}`);
        setUserProfile(user.data);
    }

    useEffect(() => {
        if (userProfile) {
            return;
        }
        loadUserProfile();
    }, [userProfile])

    return userProfile;
}

export default useUserProfile;