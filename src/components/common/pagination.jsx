import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  const firstPage = 1;
  const LastPage = pagesCount;
  return (
    <nav>
      <ul className="pagination">
        <li className="btn btn-link ">
          <button
            className="btn btn-outline-primary "
            onClick={() => onPageChange(firstPage)}
          >
            First Page
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button
              className="page-link m-2"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="btn btn-link ">
          <button
            className="btn btn-outline-primary "
            onClick={() => onPageChange(LastPage)}
          >
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
