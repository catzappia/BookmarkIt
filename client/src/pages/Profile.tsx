import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { EDIT_USER_BIO } from "../utils/mutations";
import { Group } from "../models/Group";
import "../styles/profile.css";

const ProfilePage: React.FC = () => {
  const router = useNavigate();

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [editUserBio] = useMutation(EDIT_USER_BIO);
  const [bio, setBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);

  if (loading) return <p>Loading...</p>;

  const userData = data?.me;
  console.log("UserData From Profile", userData);

  const handleRefresh = async () => {
    await refetch();
  };

  // const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.result) {
  //         updateProfile({ profilePicture: reader.result as string });
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleEditBio = async () => {
    try {
      await editUserBio({
        variables: { newBio: bio },
      });
      console.log("Bio Updated: ", bio);
      setIsEditingBio(false);
      handleRefresh();
    } catch (err) {
      console.error(err);
    }
    setIsEditingBio(false);
  };

  const handleEditInputChange = (event: any) => {
    const { value } = event.target;
    setBio(value);
  };

  const viewGroupPage = (group: any) => {
    router(`/clubs/${group.name}`);
  };

  return (
    <div className="profile-main">
      <div className="profile-page">
        {/* Name */}
        <h1>{userData.username}</h1>
        {/* Profile Picture */}
        <div className="profile-picture">
          <label htmlFor="profilePicture">
            <img
              src={
                userData.profilePicture
                  ? userData.profilePicture
                  : "https://media.newyorker.com/photos/5c1d0d7781ab3335f580e163/master/w_2240,c_limit/TNY-MoreBooksWeLoved2018.jpg"
              }
              alt="A stack of books"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          </label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/*"
            // onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Bio */}
        <div className="bio-container">
          {isEditingBio ? (
            <>
              <textarea
                value={bio}
                onChange={handleEditInputChange}
                rows={3}
                style={{ width: "100%" }}
              />
              <button onClick={handleEditBio}>Save</button>
              <button onClick={() => setIsEditingBio(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{userData.bio}</p>
              <button onClick={() => setIsEditingBio(true)}>Edit Bio</button>
            </>
          )}
        </div>

        {/* Clubs */}
        <div className="clubs-container">
          <h3>Clubs</h3>
          {userData.groups?.length > 0 ? (
            <ul>
              {userData.groups.map((group: Group) => (
                <li key={group._id}>
                  <a onClick={() => viewGroupPage(group)}>{group.name}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-clubs">No clubs joined yet.</p>
          )}
        </div>
        {/* Admin Clubs */}
        <div className="clubs-container">
          <h3>Clubs I Created</h3>
          {userData.adminGroups?.length > 0 ? (
            <ul>
              {userData.adminGroups.map((group: Group) => (
                <li key={group._id}>
                  <a onClick={() => viewGroupPage(group)}>{group.name}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-clubs">No clubs created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
