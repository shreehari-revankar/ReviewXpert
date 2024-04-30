import ArrowLeft from "/svg/ArrowLeft.svg";
import ArrowRight from "/svg/ArrowRight.svg";
import PropTypes from "prop-types";
import "./pagination.css";

function Pagination({ currentPage, pageCount, onPageChange }) {
  const pages = Array.from({ length: pageCount }).map((_, index) => index);

  Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

  return (
    <ul className="circular-pagination md:gap-[10px] gap-1">
      <li
        onClick={() => {
          if (currentPage > 0) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <div className="pagination-arrow">
          <img src={ArrowLeft} alt="Previous" />
        </div>
      </li>
      {pages.map((page) => (
        <li key={page} onClick={() => onPageChange(page)}>
          <div
            className={`pagination-circle ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page + 1}
          </div>
        </li>
      ))}
      <li
        onClick={() => {
          if (currentPage < pageCount - 1) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <div className="pagination-arrow">
          <img src={ArrowRight} alt="Next" />
        </div>
      </li>
    </ul>
  );
}

export default Pagination;
