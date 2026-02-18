// src/hooks/useDrawer.tsx
import ReactDOM from 'react-dom';
import {useMemo, ReactNode} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';

type UseDrawerRender = (close: () => void) => ReactNode;

export const useDrawer = (renderContent: UseDrawerRender) => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

  const Drawer = useMemo(() => {
    if (typeof window === 'undefined') return null;

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
        {renderContent(closeDrawer)}
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, renderContent]);

  return {isOpen, openDrawer, closeDrawer, Drawer};
};
