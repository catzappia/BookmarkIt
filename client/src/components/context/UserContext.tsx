import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Club {
  id: string;
  name: string;
  link: string;
}

interface Profile {
  name: string;
  bio: string;
  profilePicture: string | null;
  clubs: Club[];
}

interface UserContextType {
  profile: Profile;
  updateProfile: (updatedProfile: Partial<Profile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(() => {
    const storedProfile = localStorage.getItem('userProfile');
    return storedProfile
      ? JSON.parse(storedProfile)
      : {
        name: localStorage.getItem('userName') || 'Book Lover', // Replace with dynamic data
        bio: 'Short bio goes here!',
        profilePicture: null,
        clubs: [],
      };
  });

  React.useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updatedProfile: Partial<Profile>) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedProfile,
    }));
  };


  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserContext;