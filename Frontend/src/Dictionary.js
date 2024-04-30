import React, { useState } from 'react';
import Department from './Department';
import StudentList from './StudentList';

const Dictionary = ({departments,addDepartment,addStudent}) => {
    

    return (
        <div>
            <h1 className='text-xl mt-2'>Enter Keyword </h1>
            <Department addDepartment={addDepartment}/>
            {Object.keys(departments).map((dept) => (
                <StudentList key={dept} department={dept} addStudent={addStudent} />
            ))}
            {Object.entries(departments).map(([dept, students]) => (
        <div key={dept}>
          <h3>{dept}</h3>
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>
            ))}
        </div>
    );
};

export default Dictionary;
