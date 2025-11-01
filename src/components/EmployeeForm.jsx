import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, editEmployee, selectLoading } from '../redux/slice/employeeSlice';
import './Employee.css';

// Danh sách phòng ban tĩnh
const DEPARTMENTS = [
  'Engineering',
  'Quality Assurance',
  'Product',
  'Finance',
  'Operations',
  'Human Resources',
  'Design',
  'Sales',
  'Marketing'
];

// Danh sách chức vụ tĩnh
const POSITIONS = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Software Engineer',
  'QA Engineer',
  'Senior QA Engineer',
  'Product Manager',
  'Senior Product Manager',
  'Data Analyst',
  'Senior Data Analyst',
  'DevOps Engineer',
  'Senior DevOps Engineer',
  'HR Specialist',
  'HR Manager',
  'UI/UX Designer',
  'Senior UI/UX Designer',
  'Accountant',
  'Senior Accountant',
  'Sales Executive',
  'Sales Manager',
  'Marketing Manager',
  'Senior Marketing Manager'
];

function EmployeeForm({ employee, onClose }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    position: '',
    startDate: ''
  });

  useEffect(() => {
    console.log('Employee data:', employee);
    if (employee) {
      // Đảm bảo department có trong danh sách DEPARTMENTS
      const validDepartment = DEPARTMENTS.includes(employee.department) 
        ? employee.department 
        : '';
      
      // Đảm bảo position có trong danh sách POSITIONS
      const validPosition = POSITIONS.includes(employee.position) 
        ? employee.position 
        : '';
      
      console.log('Setting department:', validDepartment, 'Original:', employee.department);
      console.log('Setting position:', validPosition, 'Original:', employee.position);
      
      setFormData({
        fullName: employee.fullName || '',
        email: employee.email || '',
        department: validDepartment,
        position: validPosition,
        startDate: employee.startDate || ''
      });
    } else {
      // Reset form khi thêm mới
      setFormData({
        fullName: '',
        email: '',
        department: '',
        position: '',
        startDate: ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, 'Value:', value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (employee) {
      // Edit mode
      dispatch(editEmployee({ ...formData, id: employee.id })).then(() => {
        onClose();
      });
    } else {
      // Add mode
      dispatch(addEmployee(formData)).then(() => {
        onClose();
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{employee ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Họ và tên *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Phòng ban *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="department-select"
              >
                <option value="">-- Chọn phòng ban --</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="position">Chức vụ *</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="position-select"
              >
                <option value="">-- Chọn chức vụ --</option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Ngày vào làm *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : employee ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
