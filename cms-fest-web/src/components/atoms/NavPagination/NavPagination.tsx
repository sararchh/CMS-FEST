/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactPaginate from "react-paginate";

import style from "./NavPagination.module.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  currentPage: number;
  infoPages: { total: number; pages: number };
}

// eslint-disable-next-line no-unused-vars
export const NavPagination: React.FC<Props> = ({ infoPages, currentPage }) => {
  // eslint-disable-next-line no-unused-vars
  //   const [pageNumbers, setPageNumbers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  //   const hrefBuilder = (page) => {
  //     return location?.pathname + `/?page=${page}`;
  //   };

  const handleNavigate = ({ selected }: any) => {
    // console.log("selected: ", selected);
    navigate(location?.pathname + `?page=${selected + 1}`);
  };

  return (
    <div className={`${style["container-paginate"]}`}>
      <ReactPaginate
        containerClassName={"pagination"}
        activeClassName={"active-item-nav-paginate"}
        forcePage={currentPage - 1}
        previousClassName={"prev-pag-button"}
        nextClassName={"next-pag-button"}
        previousLabel={
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        }
        nextLabel={
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
          </svg>
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={infoPages?.pages}
        // marginPagesDisplayed={2}
        onPageChange={handleNavigate}
        // hrefBuilder={hrefBuilder}
      />
    </div>
  );
};
