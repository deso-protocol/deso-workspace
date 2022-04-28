import { LoggedIn } from '../../../threads/Threads.state';
import Deso from 'deso-protocol';
import { GetSingleProfileResponse } from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const deso = new Deso();
export const Login = () => {
  const [userKey, setUserKey] = useState('');
  const [user, setUser] = useState<GetSingleProfileResponse | null>(null);
  const [loggedIn, setLoggedIn] = useRecoilState(LoggedIn);
  useEffect(() => {
    const userKey = deso.identity.getUserKey();
    if (userKey) {
      setUserKey(userKey);
      setLoggedIn(true);
      getProfile();
    } else {
      setLoggedIn(false);
    }
  }, []);

  const getProfile = async () => {
    const user = await deso.user.getSingleProfile({
      PublicKeyBase58Check: deso.identity.getUserKey() as string,
    });
    setUser(user);
  };

  const login = async () => {
    await deso.identity.login();
    setUserKey(deso.identity.getUserKey() ?? '');
    setLoggedIn(true);
    getProfile();
  };

  const logout = async () => {
    await deso.identity.logout(userKey);
    setUserKey('');

    setLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {!userKey && (
        <div
          className="font-semibold text-lg ml-4 hover:text-[#ffc08c] cursor-pointer"
          onClick={login}
        >
          Login
        </div>
      )}
      {userKey && (
        <div
          className="font-semibold text-lg ml-4 hover:text-[#ffc08c] cursor-pointer"
          onClick={logout}
        >
          Hello, {user?.Profile?.Username}
        </div>
      )}
    </>
  );
};
