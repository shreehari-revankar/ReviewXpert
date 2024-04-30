import { Transition } from "react-transition-group";
import Rating from "../rating/Rating";

const Feedback = (data) => {

  // timestamp convert date format 
  const timestamp = data.prop.timestamp;
  const parsedDate = new Date(timestamp);

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const mon = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month)); // January
  const year = parsedDate.getFullYear();

  const formattedDate = `${day} ${mon},${year}`;


  return (
    <Transition in={true} timeout={500}>
      {(state) => (
        <div
          className={`${
            state === "entering" ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500 ease-in-out gap-3 my-3`}
        >
          <Rating rating={data.prop.rating} />
          <div className="text-lg">{`"${data.prop.comment}"`}</div>
          <div className="text-gray-500">
            - By {data.prop.consumer__name} on {formattedDate}.
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Feedback;
