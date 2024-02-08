import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';

import AddQuestion from '@components/write/AddQuestion';
import ArticleMenuModal from '@components/write/ArticleMenuModal';
import ArticleDeleteModal from '@components/write/ArticleDeleteModal';
import { TermsToChinese } from '@utils/seasoning/TermsToChinese';
import { TermsToKorean } from '@utils/seasoning/TermsToKorean';

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  position: relative;
  width: 100%;
  height: 6.0625rem;
  flex-shrink: 0;

  display: flex;
  justify-content: space-between;

  svg {
    margin: 1.44rem 1.31rem;
    cursor: pointer;
  }
`;

const Title = styled.div`
  position: relative;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.25rem;

  .article__title__chinese {
    color: #000;
    text-align: center;
    font-family: 'Noto Serif KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .article__title__korean {
    color: #000;
    text-align: center;

    font-family: 'Noto Serif KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 1;

  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 1.5rem;
  padding: 1rem 1.31rem 1rem 1.31rem;

  overflow-y: auto;

  .dots__container {
    display: flex;
    column-gap: 0.5rem;
  }
`;

const Dots = styled.div`
  display: flex;

  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#AFAFAF' : '#E9E9E9')};
`;

const ImagesContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1.5rem;
  align-items: center;
  min-height: 17rem;
  width: 100%;

  padding: 0.3rem;
`;

const Images = styled.img`
  width: 100%;
  height: 16.3125rem;
  object-fit: cover;
  border-radius: 0.5rem;

  cursor: pointer;
`;

const Text = styled.span`
  width: 100%;

  color: #333;
  font-family: 'Apple SD Gothic Neo';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProfileBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1rem;
  padding: 1.63rem 1.31rem;

  .profile__column {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .profile__personal__data__nickname {
    color: #000;
    text-align: right;
    font-family: 'Apple SD Gothic Neo';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .profile__personal__data__account {
    color: #c3c3c3;
    text-align: right;
    font-family: 'Apple SD Gothic Neo';
    font-size: 0.6875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  img {
    position: relative;

    width: 2.625rem;
    height: 2.625rem;
    background: #d9d9d9;
    border-radius: 50%;
  }
`;

const Bottom = styled.div`
  position: relative;
  width: 100%;
  height: 5.25rem;
  flex-shrink: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  /* column-gap: 1.5rem; */
  padding: 0 1rem 2rem 1.31rem;

  background-color: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  span {
    color: #777;
    font-family: 'Apple SD Gothic Neo';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const EmojiButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.15rem 0.3rem 0.15rem 0.2rem;
  column-gap: 0.32rem;

  cursor: pointer;
  border-radius: 0.3125rem;
  background-color: #f0f0f0;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  span {
    color: #333;
    text-align: center;
    font-family: 'Apple SD Gothic Neo';
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const PopupLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

/* 삭제 팝업창 */
/* const DeleteModalOverlay = styled.div`
  position: absolute;
  top: 15rem;
  width: 17.6875rem;
  height: 12.5rem;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
`;

const DeleteModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  color: #000;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  img {
    width: 6rem;
    height: 5rem;
  }
`;

const DeleteButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    cursor: pointer;
  }
`; */

const ArticlePage = () => {
  const { articleId, response } = useLoaderData();
  const articleData = response.data;
  const contents = JSON.parse(articleData.contents);
  // console.log(JSON.stringify(articleData, null, '\t'));
  // console.log(JSON.stringify(contents, null, '\t'));

  const [emojiCount, setEmojiCount] = useState(articleData.likesCount);
  const [isClickedEmoji, setIsClickedEmoji] = useState(articleData.userLikes);

  const imagescrollRef = useRef();
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  /* 사진 좌우 스크롤과 Dots 색 조정 */
  const handleDotClick = (index) => {
    if (index === 0) {
      imagescrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (index === 1) {
      const scrollRight =
        imagescrollRef.current.scrollWidth - imagescrollRef.current.clientWidth;
      imagescrollRef.current.scrollTo({
        left: scrollRight,
        behavior: 'smooth',
      });
    }
  };

  const handleImageScroll = () => {
    const activeIndex =
      imagescrollRef.current.scrollLeft === 0
        ? 0
        : imagescrollRef.current.scrollLeft +
            imagescrollRef.current.clientWidth ===
          imagescrollRef.current.scrollWidth
        ? 1
        : -1;

    setActiveDotIndex(activeIndex);
  };

  /* 이모지 */
  const handleEmojiClick = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      if (!isClickedEmoji) {
        const likeResponse = await axios.post(
          `/api/article/${articleId}/like`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setEmojiCount(emojiCount + 1);
        setIsClickedEmoji(true);
      } else {
        const unlikeResponse = await axios.delete(
          `/api/article/${articleId}/like`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setEmojiCount(emojiCount - 1);
        setIsClickedEmoji(false);
      }
    } catch (error) {
      console.error('Error while handling emoji click:', error);
    }
  };

  const handleMenu = () => {
    setShowMenuModal(true);
  };

  return (
    <Layout>
      <PopupLayout>
        {showMenuModal && (
          <ArticleMenuModal
            setShowMenuModal={setShowMenuModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
        {showDeleteModal && (
          <ArticleDeleteModal
            articleId={articleId}
            setShowMenuModal={setShowMenuModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </PopupLayout>

      <Top>
        <Link to={`/home`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.17308 18.6634L2.5 11.9904L9.17308 5.31732L10.2173 6.36152L5.35377 11.2404H21.5096V12.7404H5.3634L10.2423 17.6192L9.17308 18.6634Z"
              fill="#333333"
            />
          </svg>
        </Link>
        <Title>
          <span className="article__title__chinese">
            {TermsToChinese[articleData.term]}
          </span>
          <span className="article__title__korean">
            {TermsToKorean[articleData.term]}
          </span>
        </Title>
        <svg
          onClick={handleMenu}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 19.2692C11.5875 19.2692 11.2344 19.1223 10.9406 18.8286C10.6469 18.5348 10.5 18.1817 10.5 17.7692C10.5 17.3567 10.6469 17.0036 10.9406 16.7099C11.2344 16.4161 11.5875 16.2693 12 16.2693C12.4125 16.2693 12.7656 16.4161 13.0593 16.7099C13.3531 17.0036 13.5 17.3567 13.5 17.7692C13.5 18.1817 13.3531 18.5348 13.0593 18.8286C12.7656 19.1223 12.4125 19.2692 12 19.2692ZM12 13.5C11.5875 13.5 11.2344 13.3531 10.9406 13.0594C10.6469 12.7656 10.5 12.4125 10.5 12C10.5 11.5875 10.6469 11.2344 10.9406 10.9407C11.2344 10.6469 11.5875 10.5 12 10.5C12.4125 10.5 12.7656 10.6469 13.0593 10.9407C13.3531 11.2344 13.5 11.5875 13.5 12C13.5 12.4125 13.3531 12.7656 13.0593 13.0594C12.7656 13.3531 12.4125 13.5 12 13.5ZM12 7.73076C11.5875 7.73076 11.2344 7.58389 10.9406 7.29014C10.6469 6.9964 10.5 6.64329 10.5 6.23079C10.5 5.8183 10.6469 5.46519 10.9406 5.17144C11.2344 4.8777 11.5875 4.73083 12 4.73083C12.4125 4.73083 12.7656 4.8777 13.0593 5.17144C13.3531 5.46519 13.5 5.8183 13.5 6.23079C13.5 6.64329 13.3531 6.9964 13.0593 7.29014C12.7656 7.58389 12.4125 7.73076 12 7.73076Z"
            fill="black"
          />
        </svg>
      </Top>

      <ContentContainer>
        <div className="dots__container">
          {articleData.images.map((_, idx) => (
            <Dots
              key={idx}
              onClick={() => handleDotClick(idx)}
              active={idx === activeDotIndex}
            />
          ))}
        </div>
        <ImagesContainer ref={imagescrollRef} onScroll={handleImageScroll}>
          {articleData.images.map((image, idx) => (
            <Images key={idx} src={image.url} />
          ))}
        </ImagesContainer>
        {contents.map((item, idx) => {
          switch (item.type) {
            case 'single':
            case 'answer':
              return <Text key={idx}>{item.text}</Text>;
            case 'question':
              return <AddQuestion key={idx} q_value={item.text} />;
            default:
              return undefined;
          }
        })}
      </ContentContainer>

      <ProfileBox>
        <div className="profile__column">
          <span className="profile__personal__data__nickname">
            {`nickname`}
          </span>
          <span className="profile__personal__data__account">{`@${`accountId`}`}</span>
        </div>
        {/* {profileImage ? <img src={profileImage} /> : <img />} */}
        <img />
      </ProfileBox>

      <Bottom>
        <EmojiButton onClick={handleEmojiClick}>
          {isClickedEmoji ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 20L20.5 11V7L17 5.5L12 7L7 5.5L3.5 7V11L12 20Z"
                fill="#004A22"
              />
              <path
                d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"
                stroke="#004A22"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 20.3269L10.8962 19.3346C9.23847 17.8308 7.86763 16.5384 6.78365 15.4577C5.69968 14.3769 4.84072 13.4151 4.20675 12.5721C3.57277 11.7291 3.12982 10.9602 2.8779 10.2654C2.62597 9.57051 2.5 8.86538 2.5 8.15C2.5 6.73078 2.97852 5.54265 3.93558 4.5856C4.89263 3.62855 6.08076 3.15002 7.49998 3.15002C8.37306 3.15002 9.19806 3.3542 9.97498 3.76255C10.7519 4.17088 11.4269 4.75646 12 5.51927C12.5731 4.75646 13.2481 4.17088 14.025 3.76255C14.8019 3.3542 15.6269 3.15002 16.5 3.15002C17.9192 3.15002 19.1073 3.62855 20.0644 4.5856C21.0214 5.54265 21.5 6.73078 21.5 8.15C21.5 8.86538 21.374 9.57051 21.1221 10.2654C20.8701 10.9602 20.4272 11.7291 19.7932 12.5721C19.1592 13.4151 18.3019 14.3769 17.2211 15.4577C16.1403 16.5384 14.7679 17.8308 13.1038 19.3346L12 20.3269ZM12 18.3C13.6 16.8603 14.9166 15.6263 15.95 14.5981C16.9833 13.5699 17.8 12.6766 18.4 11.9183C19 11.1599 19.4166 10.4865 19.65 9.89807C19.8833 9.30961 20 8.72692 20 8.15C20 7.15 19.6666 6.31667 19 5.65C18.3333 4.98333 17.5 4.65 16.5 4.65C15.7102 4.65 14.9804 4.87404 14.3106 5.32213C13.6407 5.77019 13.1102 6.39359 12.7192 7.19233H11.2808C10.8833 6.38719 10.3513 5.76218 9.6846 5.3173C9.01793 4.87243 8.28973 4.65 7.49998 4.65C6.50639 4.65 5.67466 4.98333 5.00478 5.65C4.33491 6.31667 3.99998 7.15 3.99998 8.15C3.99998 8.72692 4.11664 9.30961 4.34998 9.89807C4.58331 10.4865 4.99998 11.1599 5.59998 11.9183C6.19998 12.6766 7.01664 13.5683 8.04998 14.5933C9.08331 15.6183 10.4 16.8539 12 18.3Z"
                fill="black"
              />
            </svg>
          )}
          <span>{emojiCount}</span>
        </EmojiButton>
        <span>{articleData.published ? '' : '비공개'}</span>
      </Bottom>

      {/* {showDeleteModal && (
        <DeleteModalOverlay>
          <DeleteModalContent>
            <img src={injulgi} />
            인절기에게 먹힌 기록장은
            <br />
            복구할 수 없어요
            <DeleteButton>
              <span onClick={RealDelete} style={{ color: 'red' }}>
                삭제
              </span>
              <span onClick={CancelDelete}>취소</span>
            </DeleteButton>
          </DeleteModalContent>
        </DeleteModalOverlay>
      )} */}
    </Layout>
  );
};

export default ArticlePage;