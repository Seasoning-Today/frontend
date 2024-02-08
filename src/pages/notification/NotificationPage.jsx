import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLoaderData, useNavigate } from 'react-router-dom';

import FriendRequest from '@components/notification/FriendRequest';
import FriendReaction from '@components/notification/FriendReaction';
import FriendAccepted from '@components/notification/FriendAccepted';
import SeasonalNotify from '@components/notification/SeasonalNotify';

const Top = styled.div`
  position: relative;
  width: 100%;
  height: 3.3125rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;

  h1 {
    margin: 0;
    padding: 0;

    color: #000;
    text-align: center;

    font-family: 'Apple SD Gothic Neo';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .friends-list__backbutton {
    position: absolute;
    left: 1.12rem;
  }
`;

const NotificationContainer = styled.div`
  width: 100%;
  height: calc(100% - 3.3125rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.75rem 1.31rem;
  row-gap: 1.38rem;
  overflow-y: scroll;

  .line {
    width: 100%;
    height: 0.0625rem;

    background-color: #e3e3e3;
  }
`;

const NotificationPage = () => {
  const { response } = useLoaderData();
  const [notifications, setNotifications] = useState(response.data);
  const navigate = useNavigate();
  console.log(notifications);

  const formatNotificationTime = (timestamp) => {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifference = currentTime - notificationTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return '방금 전';
    }
  };

  return (
    <>
      <Top>
        <h1>알림</h1>

        <div className="friends-list__backbutton">
          <Link to={`/home`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.17308 18.6635L2.5 11.9904L9.17308 5.31738L10.2173 6.36158L5.35377 11.2405H21.5096V12.7404H5.3634L10.2423 17.6193L9.17308 18.6635Z"
                fill="#333333"
              />
            </svg>
          </Link>
        </div>
      </Top>

      <NotificationContainer>
        {notifications.map((notification) => {
          switch (notification.type) {
            case 'ARTICLE_OPEN':
              return (
                <SeasonalNotify
                  key={notification.id}
                  seasonName={notification.message}
                  time={formatNotificationTime()}
                />
              );
            case 'FRIENDSHIP_REQUEST':
              return (
                <FriendRequest
                  key={notification.id}
                  profileName={JSON.parse(notification.message).nickname}
                  profileImageUrl={
                    JSON.parse(notification.message).profileImageUrl
                  }
                  friendId={JSON.parse(notification.message).id}
                  navigate={navigate}
                  time={formatNotificationTime()}
                />
              );
            case 'ARTICLE_FEEDBACK':
              return (
                <FriendReaction
                  key={notification.id}
                  profileName={JSON.parse(notification.message).nickname}
                  profileImageUrl={
                    JSON.parse(notification.message).profileImageUrl
                  }
                  time={formatNotificationTime()}
                />
              );
            case 'FRIENDSHIP_ACCEPTED':
              return (
                <FriendAccepted
                  key={notification.id}
                  profileName={JSON.parse(notification.message).nickname}
                  profileImageUrl={
                    JSON.parse(notification.message).profileImageUrl
                  }
                  time={formatNotificationTime()}
                />
              );
            default:
              return undefined;
          }
        })}

        {notifications.length > 0 ? <div className="line" /> : undefined}
      </NotificationContainer>
    </>
  );
};

export default NotificationPage;
