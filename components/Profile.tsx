import React, { ReactElement, useEffect, useState } from 'react';
import {
  CurrentUsersProfileResponse,
  UsersFollowedArtistsResponse
} from 'interface';
import { getCurrentUser, getFollowedArtist } from 'spotify';

export default function Profile(): ReactElement {
  const [CurrentUser, setCurrentUser] = useState(
    {} as CurrentUsersProfileResponse
  );
  const [Following, setFollowing] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (): void => {
    getCurrentUser().then((currentUser: CurrentUsersProfileResponse) => {
      setCurrentUser(currentUser);
    });

    getFollowedArtist().then(
      (followedArtists: UsersFollowedArtistsResponse) => {
        setFollowing(followedArtists.artists.total || 0);
      }
    );
  };

  return (
    <>
      <div> Profile </div>
      <div> name: {CurrentUser.display_name}</div>
      <div> email: {CurrentUser.email}</div>
      <div> url: {CurrentUser.external_urls?.spotify}</div>
      <div> followers: {CurrentUser.followers?.total}</div>
      <div> following: {Following}</div>
    </>
  );
}
