import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function Spinner() {
  const { isLoading } = useSelector((state: RootState) => state.spinner);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
