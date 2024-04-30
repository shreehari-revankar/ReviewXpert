import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "./images.jpeg";
import Concept_all from './Concept_all';



const Concept = ({data}) => {
    const [activetab, setActivetab] = useState(data.concept_info[0]);
    return (
      <div className="p-5 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)] mb-[30px]">
            <div className="flex justify-center mb-[30px] gap-[30px]">
                <div className='rounded bg-gray-100 p-2 border-2'>
                {data.concept_info.map((concept, index) => (
                              <button
                              className={`px-4 py-2 rounded focus:outline-none ${activetab === concept ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-800'}`}
                              onClick={() => setActivetab(concept)}
                          >
                              {concept}
                          </button>  
                            ))}
                    
                </div>
            </div>
            <Concept_all data={data.concept_data[activetab]}/>
          </div>
    );
}

export default Concept;