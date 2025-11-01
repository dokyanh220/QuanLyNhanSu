import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, removeEmployee, selectEmployeeDetail, selectLoading } from '../redux/slice/employeeSlice';

function Remove() {
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

  const handleConfirmDelete = () => {
    if (window.confirm(`⚠️ Bạn có chắc chắn muốn xóa nhân viên "${employee.fullName}"?\n\nThao tác này không thể hoàn tác!`)) {
      dispatch(removeEmployee(id)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          alert('✅ Xóa nhân viên thành công!');
          navigate('/employees');
        } else {
          alert('❌ Có lỗi xảy ra khi xóa nhân viên!');
        }
      });
    }
  };

  const handleCancel = () => {
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
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#fff',
      color: '#000',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#d32f2f' }}>Xác nhận xóa</h2>
      
      <div style={{ 
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
          Bạn có chắc chắn?
        </p>
        <p style={{ margin: '5px 0', fontSize: '16px' }}>
          <strong>Họ và tên:</strong> {employee.fullName}
        </p>
        <p style={{ margin: '5px 0', fontSize: '16px' }}>
          <strong>Email:</strong> {employee.email}
        </p>
        <p style={{ margin: '5px 0', fontSize: '16px' }}>
          <strong>Phòng ban:</strong> {employee.department}
        </p>
        <p style={{ margin: '5px 0', fontSize: '16px' }}>
          <strong>Vị trí:</strong> {employee.position}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCancel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Hủy
        </button>
        <button
          onClick={handleConfirmDelete}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Xác nhận xóa
        </button>
      </div>
    </div>
  );
}

export default Remove;
