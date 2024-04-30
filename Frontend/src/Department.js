import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Department = ({ addDepartment }) => {
    const [deptName, setDeptName] = useState('');

    const handleChange = (e) => {
        setDeptName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (deptName.trim() !== '') {
            addDepartment(deptName.trim());
            setDeptName('');
        }
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                {/* <input type="text" value={deptName} onChange={handleChange} placeholder="Enter keyword here" /> */}
                <TextField id="outlined-basic" label="Enter key concept" variant="outlined"  onChange={handleChange}
          value={deptName}/>

                <Button className='ml-2 h-[55px]' variant="contained" size="large" color="success"  type="submit">Add keyword</Button>
            </form>
        </div>
    );
};

export default Department;
