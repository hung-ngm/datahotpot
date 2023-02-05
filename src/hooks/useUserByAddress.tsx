import { useState, useEffect } from 'react';
import { TUser } from '../../types/user';
import axios from 'axios';

const useUserByAddress = (address: string) => {
    const [userProfile, setUserProfile] = useState<TUser>();

    const loadUserProfile = async () => {
        const user = await axios.get(`/api/user/${address}`);
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

export default useUserByAddress;