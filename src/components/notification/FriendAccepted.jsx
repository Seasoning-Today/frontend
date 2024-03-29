import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  column-gap: 1rem;

  background-color: white;
`;

const ProfileImage = styled.img`
  width: 2.9375rem;
  height: 2.9375rem;
  border-radius: 50%;

  flex-shrink: 0;

  background-color: green;
`;

const Content = styled.div`
  flex-grow: 1;

  .row {
    display: flex;
  }

  .notification__name {
    margin-right: 0.25rem;

    color: #333;
    font-family: 'Apple SD Gothic Neo';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .notification__content {
    color: #333;
    font-family: 'Apple SD Gothic Neo';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .notification__time {
    color: #bfbfbf;
    font-family: 'Apple SD Gothic Neo';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const FriendAccepted = ({ profileName, profileImageUrl, createdAt }) => {
  return (
    <Layout>
      {profileImageUrl ? (
        <ProfileImage src={profileImageUrl} />
      ) : (
        <ProfileImage />
      )}

      <Content>
        <div className=".row">
          <span className="notification__name">{profileName}</span>
          <span className="notification__content">님과 친구가 되셨습니다.</span>
        </div>
        <span className="notification__time">{createdAt}</span>
      </Content>
    </Layout>
  );
};

export default FriendAccepted;
