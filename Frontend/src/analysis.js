import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import logo from "./images.jpeg";
import TotalResult from "./Component/Total";
import Concept from "./Component/Concept";
import Sentiment from "./Component/Sentiment";
import Spinner from "./Component/DummySpinner";
import RingLoader from "react-spinners/RingLoader";


const Analysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a POST request to the backend server
        const receivedData = await location.state.data;
        console.log(receivedData);
        const response = await axios.post('/Sessiondata', {
          access_token: localStorage.getItem('access_token'),
          hashtag: receivedData.hashtag,
          time: receivedData.time,
        });

        // Assuming response.data contains the necessary fields (total, sentiment, concept)
        //console.log(response.data);

        if (response.status === 200) {
          const parsedData = await JSON.parse(response.data)
          setData(parsedData);
          console.log(parsedData);
          setLoading(false);
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Some error encountered. Please check connectivity.');
      }
    };

    fetchData();
  }, []);  // Run once when the component mounts

  return (
    <div className="">
  {loading ? (
    <div>
      <Spinner />
    </div>
  ) : data !== undefined  && Object.keys(data).length > 0 ? (
    <div>
      <div className="md:m-[30px] m-[12px]">
        <TotalResult data={data.total} cond={true} />
      </div>
     <div className="md:m-[30px] m-[12px]">
        <Sentiment data={data.sentiment} />
      </div>
      {data.concept && data.concept.concept_info.length > 0 &&(  // Check if data.concept is truthy before rendering
    <div className="md:m-[30px] m-[12px]">
      <Concept data={data.concept} />
    </div>
  )}
    </div>
  ) : (
    <div>no data</div>
  )}
</div>
 );
    {/*<div className="">
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : data !== undefined && data !== null?(
        <div>
          <div className="md:m-[30px] m-[12px]">
            <TotalResult data={data.total} cond={true} />
          </div>
          <div className="md:m-[30px] m-[12px]">
            <Sentiment data={data.sentiment} />
          </div>
          <div className="md:m-[30px] m-[12px]">
            <Concept data={data.concept} />
          </div>
        </div>
      ):(<div>no data</div>)}
    </div>
  );*
  {/*const location = useLocation();
  const receivedData = location.state.data;
  console.log(receivedData.hashtag)

return <div></div>;*/}
};

export default Analysis;
