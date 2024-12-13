import React, { useState } from 'react';
import { useUserContext } from '../components/context/UserContext';

const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useUserContext();

  const [bioInput, setBioInput] = useState(profile.bio);
  const [isEditingBio, setIsEditingBio] = useState(false);


  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          updateProfile({ profilePicture: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioSave = () => {
    updateProfile({ bio: bioInput });
    setIsEditingBio(false);
  };

  return (
    <div>
      {/* Name */}
      <h1>{profile.name}</h1>
      {/* Profile Picture */}
      <div>
        <label htmlFor="profilePicture">
          <img
            src={profile.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Bio */}
      <div>
        {isEditingBio ? (
          <>
            <textarea
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              rows={3}
              style={{ width: '100%' }}
            />
            <button onClick={handleBioSave}>Save</button>
            <button onClick={() => setIsEditingBio(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>{profile.bio}</p>
            <button onClick={() => setIsEditingBio(true)}>Edit Bio</button>
          </>
        )}
      </div>

      {/* Clubs */}
      <div>
        <h3>Clubs</h3>
        {profile.clubs.length > 0 ? (
          <ul>
            {profile.clubs.map((club) => (
              <li key={club.id}>
                <a href={club.link}>{club.name}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No clubs joined yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
