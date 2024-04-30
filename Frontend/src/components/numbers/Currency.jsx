import PropTypes from "prop-types";

const Currency = ({ amount }) => {
	const formattedAmount = amount.toLocaleString("en-IN");

	return <span>₹{formattedAmount}</span>;
};

Currency.propTypes = {
	amount: PropTypes.number.isRequired
};

export default Currency;
