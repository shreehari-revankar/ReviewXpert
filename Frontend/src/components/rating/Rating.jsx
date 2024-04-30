import starChecked from "/svg/star-checked.svg";
import starUnchecked from "/svg/star-unchecked.svg";

const Rating = (data) => {
  const stars = [];

  for (let i = 0; i < data.rating; i++) {
    stars.push(
      <img key={i} className="w-[24px] h-[24px]" src={starChecked} alt="star" />
    );
  }
  for (let i = data.rating; i < 5; i++) {
    stars.push(
      <img
        key={i}
        className="w-[24px] h-[24px]"
        src={starUnchecked}
        alt="star"
      />
    );
  }

  return <div className="flex">{stars}</div>;
};

export default Rating;
