import ReactDOM from 'react-dom';
import React, {useMemo} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import MoveMoneyForm from '../components/MoveMoneyForm';

export const useMoveMoney = () => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

  const MoveMoneyDrawer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    console.log("here")
    return ReactDOM.createPortal(
      <DrawerWrapper
        open={isOpen}
        removePaddingBottom
        onClose={closeDrawer}
        actions={[
          {
            icon: 'fluent--dismiss-24-regular',
            onClick: closeDrawer,
          },
        ]}
        drawerWidth='md'
      >
        <MoveMoneyForm onClose={closeDrawer}/>
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    MoveMoneyDrawer,
  };
};
