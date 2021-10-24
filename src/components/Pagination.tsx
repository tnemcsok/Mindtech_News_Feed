import React from "react";

type PaginationPros = { page: number; totalPages: number; setPage: any };

export const Pagination = ({ page, totalPages, setPage }: PaginationPros) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li>
          <button
            className={"page-link mx-3"}
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page == 1}
          >
            Previous
          </button>
        </li>
        <li className="border text-primary p-2">{page + " / " + totalPages}</li>
        <li>
          <button
            className={"page-link mx-3"}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page == totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
