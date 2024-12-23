import React, {useState, useCallback} from "react";
import { Link } from "react-router-dom";
import Select from './Select';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const prList = [
    { value: '123', label: '123' },
    { value: '234', label: '234' },
    { value: '345', label: '345' },
  ];
  const repoList = [
    { value: 'aosfe', label: 'AOS Front End' },
    { value: 'ermfe', label: 'ERM Front End' },
    { value: 'kpibe', label: 'KPI Back End' },
    { value: 'qsmbe', label: 'QSM Back End' },
  ];

const Home = () => {
    const navigate = useNavigate();
    const gitImage = require('../assets/gcm-hero.png'); 
    const [dateRange, setDateRange] = useState({
      startDate:  '',
      endDate:  ''
   })
    const [form, setForm] = useState({
        prid: null,
        repo: null,
      });
    
      const onValidate = (value, name) => {
        setError((prev) => ({
          ...prev,
          [name]: { ...prev[name], errorMsg: value },
        }));
      };
    
      const [error, setError] = useState({
        prid: {
          isReq: true,
          errorMsg: '',
          onValidateFunc: onValidate,
        },
        repo: {
          isReq: true,
          errorMsg: '',
          onValidateFunc: onValidate,
        },
      });
    
      const onHandleChange = useCallback((value, name) => {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }, []);

      const handleChange = ({ startDate, endDate }) => {
        startDate = startDate || dateRange.startDate
        endDate = endDate || dateRange.endDate
    
        if (startDate > endDate ) {
          endDate = startDate;
        }
        setDateRange({ startDate: startDate, endDate: endDate });
    
        
      }
    
      const handleChangeStart = (startDate) => {handleChange({ startDate })}
    
      const handleChangeEnd = (endDate) => {handleChange({ endDate })}
    
      const validateForm = () => {
        let isInvalid = false;
        Object.keys(error).forEach((x) => {
          const errObj = error[x];
          if (errObj.errorMsg) {
            isInvalid = true;
          } else if (errObj.isReq && !form[x]) {
            isInvalid = true;
            onValidate(true, x);
          }
        });
        return !isInvalid;
      };
    
      const handleSubmit = () => {
        const isValid = validateForm();
        if (!isValid) {
          console.error('Invalid Form!');
          return false;
        }
        navigate("/table");
        console.log('Data:', form);
      };

      const resetForm = () => {
        let formData = {
          prid: null,
          repo: null
        }
        setForm(formData)
      }
    
    return (
        <>
        <div className="app">
          <div className="row app-row">
      <div className="col-6 img-area">
        <img src={gitImage} className="w-100"/>
       
      </div>
      <div className="form form-area col-6">
      <h2 className="text-center">
          Find your PR details
        </h2>
        <Select
          name="prid"
          title="PR ID"
          value={form.prid}
          options={prList}
          onChangeFunc={onHandleChange}
          {...error.prid}
        />
        <Select
          name="repo"
          title="Repo"
          value={form.repo}
          options={repoList}
          onChangeFunc={onHandleChange}
          {...error.repo}
        />
      <div className="formm mb-2">
        <label>PR created at</label> 
      </div>  
      <div className="form d-flex align-items-center" style={{gap:'20px'}}>
        <label> From </label>
      <DatePicker
          className='form-control form-control-solid'
          placeholderText="mm/dd/yyyy"
          selected={dateRange.startDate}
          selectsStart
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={handleChangeStart} />
           <label> To </label>
        <DatePicker
          className='form-control form-control-solid'
          placeholderText="mm/dd/yyyy"
          selected={dateRange.endDate}
          selectsEnd
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={handleChangeEnd} />
      </div>
        
        <div className="d-flex justify-content-end text-right" style={{gap:'10px', marginTop: '20px'}}>
        <button className="btn btn-primary btn-sm mt-2" onClick={resetForm}>
             Cancel
         </button>
        <button className="btn btn-primary btn-sm mt-2" onClick={handleSubmit}>
             Submit
         </button>
        </div>
      </div></div>
    </div>
            
        </>
    )
}

export default Home;