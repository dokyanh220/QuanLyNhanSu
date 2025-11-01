import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, editEmployee, selectLoading } from '../redux/slice/employeeSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Employee.css';

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

  // Initial values cho Formik
  const initialValues = {
    fullName: employee?.fullName || '',
    email: employee?.email || '',
    department: DEPARTMENTS.includes(employee?.department) ? employee.department : '',
    position: POSITIONS.includes(employee?.position) ? employee.position : '',
    startDate: employee?.startDate || ''
  };

  // Validate function cho Formik
  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = 'Họ và tên là bắt buộc';
    } else if (values.fullName.length < 3) {
      errors.fullName = 'Họ và tên phải có ít nhất 3 ký tự';
    }

    if (!values.email) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (!values.department) {
      errors.department = 'Vui lòng chọn phòng ban';
    }

    if (!values.position) {
      errors.position = 'Vui lòng chọn chức vụ';
    }

    if (!values.startDate) {
      errors.startDate = 'Ngày vào làm là bắt buộc';
    }

    return errors;
  };

  // Handle submit với Formik
  const handleFormSubmit = (values, { setSubmitting }) => {
    if (employee) {
      // Edit mode - Xác nhận sửa
      if (window.confirm(`Bạn có chắc chắn muốn cập nhật thông tin nhân viên "${values.fullName}"?`)) {
        dispatch(editEmployee({ ...values, id: employee.id })).then((result) => {
          setSubmitting(false);
          if (result.meta.requestStatus === 'fulfilled') {
            alert('Cập nhật thành công!');
            onClose();
          } else {
            alert('Có lỗi!');
          }
        });
      } else {
        setSubmitting(false);
      }
    } else {
      // Add mode - Xác nhận thêm
      if (window.confirm(`Bạn có chắc chắn muốn thêm nhân viên "${values.fullName}"?`)) {
        dispatch(addEmployee(values)).then((result) => {
          setSubmitting(false);
          if (result.meta.requestStatus === 'fulfilled') {
            alert('Thêm nhân viên thành công!');
            onClose();
          } else {
            alert('Có lỗi!');
          }
        });
      } else {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2 style={{ marginBottom: '30px', color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
          {employee ? 'Chỉnh sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
        </h2>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting, dirty }) => (
            <>
              <Form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Họ và tên *</label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Nhập họ và tên"
                      className={errors.fullName && touched.fullName ? 'error-field' : ''}
                    />
                    <ErrorMessage name="fullName" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      className={errors.email && touched.email ? 'error-field' : ''}
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="department">Phòng ban *</label>
                    <Field
                      as="select"
                      id="department"
                      name="department"
                      className={`department-select ${errors.department && touched.department ? 'error-field' : ''}`}
                    >
                      <option value="">-- Chọn phòng ban --</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="department" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="position">Chức vụ *</label>
                    <Field
                      as="select"
                      id="position"
                      name="position"
                      className={`position-select ${errors.position && touched.position ? 'error-field' : ''}`}
                    >
                      <option value="">-- Chọn chức vụ --</option>
                      {POSITIONS.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="position" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Ngày vào làm *</label>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      className={errors.startDate && touched.startDate ? 'error-field' : ''}
                    />
                    <ErrorMessage name="startDate" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-cancel" 
                    onClick={() => onClose()}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-submit" 
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? 'Đang xử lý...' : employee ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EmployeeForm;
