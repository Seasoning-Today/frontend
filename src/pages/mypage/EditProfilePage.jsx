import React, { useState } from 'react';
import styled from 'styled-components';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  row-gap: 1.18rem;
`;

const HeaderBox = styled.div`
  width: 100%;
  padding: 2.94rem 0;

  display: flex;
  justify-content: center;

  span {
    color: #000;

    font-family: AppleSDGothicNeoEB00;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ProfileBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  .profile-center {
    position: relative;
    width: 5.625rem;
    height: 5.625rem;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;

    background-color: #d9d9d9;
  }

  .profile-icon {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  margin-top: 5.63rem;

  display: flex;
  flex-direction: column;
  row-gap: 2.94rem;
`;

const InputBox = styled.div`
  position: relative;
  width: calc(100% - 4rem);
  margin: 0 2rem;

  display: flex;
  flex-direction: column;

  border-bottom: 0.0625rem solid #8e8c86;

  h2 {
    color: #333;
    font-family: AppleSDGothicNeoSB00;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 134%;
  }

  section {
    position: relative;
    background-color: red;
  }

  input {
    width: 100%;
    height: 2.75rem;

    color: #333;
    font-family: AppleSDGothicNeoSB00;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 134%;

    border: none;
    outline: none;
    background-color: white;
  }

  .check-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-bottom: 0.75rem;
  }
`;

const ConfirmButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3.75rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #004a22;

  &:hover {
    cursor: pointer;
  }

  span {
    color: #fff;
    text-align: center;
    font-family: AppleSDGothicNeoSB00;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 134%;
  }
`;

function EditProfilePage() {
  const { response } = useLoaderData();
  const [userData, setUserData] = useState(response.data);
  const currentId = userData.accountId;
  const navigate = useNavigate();

  const onChangeId = (event) => {
    setUserData({ ...userData, accountId: event.target.value });
  };

  const onChangeName = (event) => {
    setUserData({ ...userData, nickname: event.target.value });
  };

  const onClickSubmit = (event) => {
    navigate(`/mypage`);
  };

  return (
    <Layout>
      <HeaderBox>
        <span>프로필 설정</span>
      </HeaderBox>

      <ProfileBox>
        <div className="profile-center">
          {userData.profileImageUrl !== false ? (
            <img src={userData.profileImageUrl} />
          ) : (
            <img />
          )}
          <div className="profile-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="10" fill="white" />
              <path
                d="M14.6154 5.38462H13.0162L12.2298 4.20538C12.1877 4.14224 12.1306 4.09046 12.0637 4.05464C11.9968 4.01881 11.9221 4.00005 11.8462 4H8.15385C8.07794 4.00005 8.00321 4.01881 7.93629 4.05464C7.86937 4.09046 7.81232 4.14224 7.77019 4.20538L6.98327 5.38462H5.38462C5.01739 5.38462 4.66521 5.53049 4.40554 5.79016C4.14588 6.04983 4 6.40201 4 6.76923V13.2308C4 13.598 4.14588 13.9502 4.40554 14.2098C4.66521 14.4695 5.01739 14.6154 5.38462 14.6154H14.6154C14.9826 14.6154 15.3348 14.4695 15.5945 14.2098C15.8541 13.9502 16 13.598 16 13.2308V6.76923C16 6.40201 15.8541 6.04983 15.5945 5.79016C15.3348 5.53049 14.9826 5.38462 14.6154 5.38462ZM15.0769 13.2308C15.0769 13.3532 15.0283 13.4706 14.9417 13.5571C14.8552 13.6437 14.7378 13.6923 14.6154 13.6923H5.38462C5.26221 13.6923 5.14481 13.6437 5.05826 13.5571C4.9717 13.4706 4.92308 13.3532 4.92308 13.2308V6.76923C4.92308 6.64682 4.9717 6.52943 5.05826 6.44287C5.14481 6.35632 5.26221 6.30769 5.38462 6.30769H7.23077C7.30677 6.30774 7.38161 6.28902 7.44864 6.25319C7.51567 6.21736 7.57282 6.16553 7.615 6.10231L8.40077 4.92308H11.5987L12.385 6.10231C12.4272 6.16553 12.4843 6.21736 12.5514 6.25319C12.6184 6.28902 12.6932 6.30774 12.7692 6.30769H14.6154C14.7378 6.30769 14.8552 6.35632 14.9417 6.44287C15.0283 6.52943 15.0769 6.64682 15.0769 6.76923V13.2308ZM10 7.23077C9.49794 7.23077 9.00715 7.37965 8.58971 7.65858C8.17226 7.93751 7.8469 8.33396 7.65477 8.7978C7.46264 9.26165 7.41237 9.77205 7.51031 10.2645C7.60826 10.7569 7.85003 11.2092 8.20504 11.5642C8.56005 11.9192 9.01236 12.161 9.50477 12.2589C9.99718 12.3569 10.5076 12.3066 10.9714 12.1145C11.4353 11.9223 11.8317 11.597 12.1107 11.1795C12.3896 10.7621 12.5385 10.2713 12.5385 9.76923C12.5377 9.09622 12.27 8.451 11.7941 7.97511C11.3182 7.49922 10.673 7.23153 10 7.23077ZM10 11.3846C9.68051 11.3846 9.36819 11.2899 9.10254 11.1124C8.83689 10.9349 8.62984 10.6826 8.50758 10.3874C8.38531 10.0922 8.35332 9.76744 8.41565 9.45409C8.47798 9.14073 8.63183 8.8529 8.85775 8.62698C9.08367 8.40107 9.3715 8.24722 9.68485 8.18489C9.99821 8.12256 10.323 8.15455 10.6182 8.27681C10.9134 8.39908 11.1656 8.60612 11.3431 8.87177C11.5206 9.13742 11.6154 9.44974 11.6154 9.76923C11.6154 10.1977 11.4452 10.6085 11.1422 10.9115C10.8393 11.2144 10.4284 11.3846 10 11.3846Z"
                fill="#333333"
              />
            </svg>
          </div>
        </div>
      </ProfileBox>

      <InfoBox>
        <InputBox>
          <h2>아이디</h2>
          <section>
            <input onChange={onChangeId} value={userData.accountId} />
            <div className="check-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.00015 16.1698L5.53015 12.6998C5.34317 12.5129 5.08957 12.4078 4.82515 12.4078C4.56072 12.4078 4.30712 12.5129 4.12015 12.6998C3.93317 12.8868 3.82813 13.1404 3.82812 13.4048C3.82813 13.5358 3.85391 13.6654 3.90402 13.7864C3.95412 13.9073 4.02756 14.0173 4.12015 14.1098L8.30015 18.2898C8.69015 18.6798 9.32015 18.6798 9.71015 18.2898L20.2901 7.70983C20.4771 7.52286 20.5822 7.26926 20.5822 7.00483C20.5822 6.74041 20.4771 6.48681 20.2901 6.29983C20.1032 6.11286 19.8496 6.00781 19.5851 6.00781C19.3207 6.00781 19.0671 6.11286 18.8801 6.29983L9.00015 16.1698Z"
                  fill="#8E8C86"
                  fill-opacity="0.5"
                />
              </svg>
            </div>
          </section>
        </InputBox>

        <InputBox>
          <h2>이름</h2>
          <section>
            <input onChange={onChangeName} value={userData.nickname} />
          </section>
        </InputBox>
      </InfoBox>

      <ConfirmButton onClick={onClickSubmit}>
        <span>확인</span>
      </ConfirmButton>
    </Layout>
  );
}

export default EditProfilePage;
