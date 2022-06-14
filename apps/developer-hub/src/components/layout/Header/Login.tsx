/* eslint-disable no-restricted-globals */
import Deso from 'deso-protocol';
import { GetSingleProfileResponse } from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { LoggedIn } from '../../../threads/Threads.state';

const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
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
    try {
      const user = await deso.user.getSingleProfile({
        PublicKeyBase58Check: deso.identity.getUserKey() as string,
      });
      setUser(user);
    } catch (e) {
      //
    }
  };

  const login = async () => {
    await deso.identity.login();
    setUserKey(deso.identity.getUserKey() ?? '');
    setLoggedIn(true);
    getProfile();
    location.reload();
  };

  const logout = async () => {
    await deso.identity.logout(userKey);
    setUserKey('');

    setLoggedIn(false);
    setUser(null);
    location.reload();
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
