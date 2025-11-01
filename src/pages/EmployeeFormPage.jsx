import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, selectEmployeeDetail } from '../redux/slice/employeeSlice';
import EmployeeForm from '../components/EmployeeForm';

function EmployeeFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployeeDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      dispatch(getEmployee(id)).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [mode, id, dispatch]);

  const handleClose = () => {
    navigate('/employees');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '18px',
        color: '#666'
      }}>
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <EmployeeForm 
      employee={mode === 'edit' ? employee : null} 
      onClose={handleClose} 
    />
  );
}

export default EmployeeFormPage;
