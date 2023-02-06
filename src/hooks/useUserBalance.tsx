import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useSession } from 'next-auth/react';

const useUserBalance = () => {
    const { data: session } = useSession();
    const userAddress = session?.user.name;
    const rpcEndpoint = "https://api.hyperspace.node.glif.io/rpc/v1";
    const [userBalance, setUserBalance] = useState<number>();
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

    const loadUserBalance = async () => {
        if (userAddress) {
            const balance = await web3.eth.getBalance(userAddress);
            console.log('balance', Number(balance));
            setUserBalance(Number(balance));
        }
    }

    useEffect(() => {
        if (userBalance) {
            return;
        }
        loadUserBalance();
    }, [userBalance])

    return userBalance;
}

export default useUserBalance;