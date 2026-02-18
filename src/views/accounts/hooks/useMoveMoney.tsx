import MoveMoneyForm from '../components/MoveMoneyForm';
import { useDrawer } from './useDrawer';

export const useMoveMoney = () => {
  return useDrawer(close => <MoveMoneyForm actionOnSubmit={close} />);
};
