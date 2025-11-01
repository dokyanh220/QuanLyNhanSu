import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, selectEmployeeDetail, selectLoading } from '../redux/slice/employeeSlice';
import EmployeeForm from '../components/EmployeeForm';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployeeDetail);
  const loading = useSelector(selectLoading);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (id) {
      setLoadingData(true);
      dispatch(getEmployee(id)).then(() => {
        setLoadingData(false);
      });
    }
  }, [id, dispatch]);

  const handleClose = () => {
    navigate('/employees');
  };

  if (loadingData || loading) {
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

  if (!employee) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '18px',
        color: '#666'
      }}>
        <p>Không tìm thấy nhân viên!</p>
        <button 
          onClick={() => navigate('/employees')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <EmployeeForm employee={employee} onClose={handleClose} />
    </div>
  );
}

export default Edit;
