import * as S from './style';

import AccountWithdrawModal from '@components/molecules/AccountWithdrawModal';
import MenuList from '@components/organisms/MenuList';
import withNavigation from '@components/hoc/withNavigation';

import { useAccountContext } from '@contexts/AccountContext';

function AccountTemplate() {
  const { showModal, menuListsData, handleCloseModal } = useAccountContext();

  return (
    <S.Layout>
      {showModal && <AccountWithdrawModal onCloseModal={handleCloseModal} />}

      <S.MenuContainer>
        {menuListsData.map((menuListData, index) => (
          <MenuList key={index} menuListData={menuListData} />
        ))}
      </S.MenuContainer>
    </S.Layout>
  );
}

export default withNavigation('계정 설정', AccountTemplate);
