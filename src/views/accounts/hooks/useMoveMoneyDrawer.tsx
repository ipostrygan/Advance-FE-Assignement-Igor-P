import MoveMoneyForm from '../components/MoveMoneyForm';
import { useDrawer } from './useDrawer';

export const useMoveMoneyDrawer = () => {
  return useDrawer(close => <MoveMoneyForm actionOnSubmit={close} />);
};
