import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';

function AddNew() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/employees');
  };

  return (
    <div style={{ padding: '20px' }}>
      <EmployeeForm employee={null} onClose={handleClose} />
    </div>
  );
}

export default AddNew;
