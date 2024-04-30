import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "./images.jpeg";
import Sentiment_all from './Sentiment_all';



const Sentiment = ({data}) => {
    const [activetab, setActivetab] = useState('positive');
    return (
      <div className="p-5 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)] mb-[30px]">
            <div className="flex justify-center mb-[30px] gap-[30px]">
                <div className='rounded bg-gray-100 p-2 border-2'>
                    <button
                        className={`px-4 py-2 rounded focus:outline-none ${activetab === 'positive' ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-800'}`}
                        onClick={() => setActivetab('positive')}
                    >
                        Positive
                    </button>
                    <button
                        className={`px-4 py-2 rounded focus:outline-none ${activetab === 'neutral' ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-800'}`}
                        onClick={() => setActivetab('neutral')}
                    >
                        Neutral
                    </button>
                    <button
                        className={`px-4 py-2 rounded focus:outline-none ${activetab === 'negative' ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-800'}`}
                        onClick={() => setActivetab('negative')}
                    >
                        Negative
                    </button>
                </div>
            </div>
            <Sentiment_all data={activetab === 'positive' ? data.positive : activetab === 'neutral' ? data.neutral : data.negative}/>
          </div>
    );
}

export default Sentiment;