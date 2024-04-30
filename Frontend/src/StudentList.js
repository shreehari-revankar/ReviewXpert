import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const StudentList = ({ department, addStudent }) => {
    const [studentName, setStudentName] = useState('');

    const handleChange = (e) => {
        setStudentName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (studentName.trim() !== '') {
            addStudent(department, studentName.trim());
            setStudentName('');
        }
    };

    return (
        <div>
            <h2>{department}</h2>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Enter key concept" variant="outlined"  value={studentName} onChange={handleChange}  />
                <Button className='ml-2 h-[55px]' variant="contained" size="large" color="success"  type="submit">Add Keyword</Button>
                {/* <TextField id="outlined-basic"  value={studentName} label="Enter keyword" variant="outlined"  onChange={handleChange}
          />

                <Button className='ml-2 h-[55px]' variant="contained" size="large" color="success"  type="submit">Add keyword</Button> */}
            </form>
        </div>
    );
};

export default StudentList;
