import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

const Pagination = ({
  data,
  page,
  rowsPerPage,
  handleChangePage,
  rowsPerPageOptions,
  handleChangeRowsPerPage,
}) => {
  return (
    <div style={{ color: "#FFF", marginTop: 10 }}>
      <label htmlFor="pagination">Pagination</label>
      <TablePagination
        id="pagination"
        style={{
          color: "#fff",
          border: "none",
          padding: 0,
          borderRadius: 4,
          backgroundColor: "#330033",
          boxShadow: "0 0 4px #FFF",
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Pagination;
