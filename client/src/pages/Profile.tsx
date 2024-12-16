import React, { useState } from 'react';
import { useUserContext } from '../components/context/UserContext';
import '../styles/profile.css';


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
    <div className="profile-main">
    <div className="profile-page">
      {/* Name */}
      {profile.name && <h1>{profile.name}</h1>}
      {/* Profile Picture */}
      <div className="profile-picture">
        <label htmlFor="profilePicture">
          <img
            src={profile.profilePicture || "https://media.newyorker.com/photos/5c1d0d7781ab3335f580e163/master/w_2240,c_limit/TNY-MoreBooksWeLoved2018.jpg"}
            alt="A stack of books"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Bio */}
      <div className="bio-container">
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
      <div className="clubs-container">
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
          <p className="no-clubs">No clubs joined yet.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
