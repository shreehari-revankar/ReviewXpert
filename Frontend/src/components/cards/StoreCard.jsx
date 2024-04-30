import Rating from "../rating/Rating";

const StoreCard = (props) => {
  let add = props.prop1;
  let address = add['add1' || 'add2' || 'add3']+', '+add['area']+', '+add['landmark']+', '+add['location']+', '+add['city']+' '+add['pincode'];

  // rating logic
  let rating = props.prop2;
  let ratings = 0;
  rating.forEach(e => {
    ratings = e.rating
  });
  
  return (
    <div>
      <div>{address}</div>
      <div className="my-[10px]">
        <Rating rating={ratings} />
      </div>
    </div>
  );
};

export default StoreCard;
