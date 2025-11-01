import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, selectEmployeeDetail, selectLoading } from '../redux/slice/employeeSlice';
import './Employee.css';

function EmployeeDetail({ employeeId, onClose }) {
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployeeDetail);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (employeeId) {
      dispatch(getEmployee(employeeId));
    }
  }, [dispatch, employeeId]);

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Chi tiết nhân viên</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="detail-content">
          <div className="detail-row">
            <span className="detail-label">ID:</span>
            <span className="detail-value">{employee.id}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Họ và tên:</span>
            <span className="detail-value">{employee.fullName}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{employee.email}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phòng ban:</span>
            <span className="detail-value">{employee.department}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Chức vụ:</span>
            <span className="detail-value">{employee.position}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Ngày vào làm:</span>
            <span className="detail-value">
              {new Date(employee.startDate).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        <div className="detail-actions">
          <button className="btn btn-close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
