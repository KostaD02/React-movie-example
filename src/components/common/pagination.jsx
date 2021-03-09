import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
const Pagination = (props) => {
    const { itemsCount,pageSize,currentPage,onPageChange} = props;
    const pagesCount = Math.ceil(itemsCount/pageSize);
    if(pagesCount === 1) return null;
    const pages = _.range(1,pagesCount + 1);
    const firstPage = 1;
    const LastPage = pagesCount;
    return <nav>
        <ul className="pagination">
            <li className="btn btn-link m-2"><a onClick={()=> onPageChange(firstPage)}>First Page</a></li>
            {pages.map(page=>( <li key={page} className={page=== currentPage ? 'page-item active' : 'page-item'}>
                <a className="page-link m-2" onClick={()=> onPageChange(page)}>{page}</a>
            </li>))}
            <li className="btn btn-link m-2"><a onClick={()=> onPageChange(LastPage)}>Last Page</a></li>
        </ul>
    </nav>;
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;