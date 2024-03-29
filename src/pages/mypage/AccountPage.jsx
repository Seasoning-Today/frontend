import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

import NavigationHeader from '@components/common/NavigationHeader';
import WithdrawModal from '@components/account/WithdrawModal';

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.25rem;

  section {
    width: 100%;

    display: flex;
    padding: 0 1rem;
  }
`;

const MenuBox = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 1rem;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ActionMenu = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem 1rem 1.5rem;

  font-family: 'Apple SD Gothic Neo';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #333;

  background-color: #fff;
  text-decoration: none;

  cursor: pointer;

  &:not(:first-child) {
    border-top: 0.03125rem solid #f0f0f0;
  }

  span {
    font-family: 'Apple SD Gothic Neo';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .important__menu {
    color: #cc0025;
  }
`;

const AccountPage = () => {
  const { userSearchable } = useLoaderData();
  const [searchEnabled, setSearchEnabled] = useState(userSearchable);
  const [showModal, setShowModal] = useState(false);

  const toggleSearchEnabled = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const toggleSearchEnabledResponse = await axios.put(
        `/api/user?searchable=${searchEnabled ? `false` : `true`}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setSearchEnabled((searchEnabled) => !searchEnabled);
    } catch (error) {
      console.error('Error handling friend request:', error);
    }
  };

  return (
    <Layout>
      {showModal && (
        <WithdrawModal
          onCloseModal={() => {
            setShowModal(false);
          }}
        />
      )}

      <NavigationHeader title="계정 설정" optionType="icon" />

      <section>
        <MenuBox>
          <ActionMenu>
            <span>아이디 검색 허용</span>
            <div onClick={toggleSearchEnabled}>
              {searchEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="20"
                  viewBox="0 0 36 20"
                  fill="none"
                >
                  <g filter="url(#filter0_i_1496_6479)">
                    <rect width="36" height="20" rx="10" fill="#2C8253" />
                  </g>
                  <circle cx="26" cy="10" r="8" fill="white" />
                  <defs>
                    <filter
                      id="filter0_i_1496_6479"
                      x="0"
                      y="0"
                      width="36"
                      height="22"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_1496_6479"
                      />
                    </filter>
                  </defs>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="20"
                  viewBox="0 0 36 20"
                  fill="none"
                >
                  <g filter="url(#filter0_i_1311_4124)">
                    <rect width="36" height="20" rx="10" fill="#D9D9D9" />
                  </g>
                  <circle cx="10" cy="10" r="8" fill="white" />
                  <defs>
                    <filter
                      id="filter0_i_1311_4124"
                      x="0"
                      y="0"
                      width="36"
                      height="22"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_1311_4124"
                      />
                    </filter>
                  </defs>
                </svg>
              )}
            </div>
          </ActionMenu>
        </MenuBox>
      </section>

      <section>
        <MenuBox>
          <ActionMenu onClick={() => setShowModal(true)}>
            <span className="important__menu">회원 탈퇴</span>
          </ActionMenu>
        </MenuBox>
      </section>
    </Layout>
  );
};

export default AccountPage;
