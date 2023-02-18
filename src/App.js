import { Link, Outlet } from "react-router-dom";
import Add from "./Elements/AddButton";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { createContext } from "react";

function createData(Name, Country, Actions) {
  return {
    Name,
    Country,
  };
}

const rows = [
  createData("Vinfast", "Viet Nam"),
  createData("Facebook", "US"),
  createData("Google", "US"),
  createData("Tesla", "US"),
  // createData("Baidu", "China"),
  // createData("Apple", "US"),
  // createData("Rolex", "Switzerland"),
  // createData("Tencent", "China"),
  // createData("Microsoft", "US"),
  // createData("BMW", "Germany"),
  // createData("IBM", "US"),
  // createData("Gojek", "Indonesia"),
  // createData("Viettel", "VietNam"),
  // createData("FPT", "VietNam"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const data = [
  {
    id: "Name",
    label: "Name of the company",
  },
  {
    id: "Country",
    label: "Country",
  },
  {
    id: "Actions",
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {data.map((headCell) => (
          <TableCell
            style={{ fontWeight: "bold" }}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const RowsContext = createContext();

export default function App() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Country");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const [Rows, setRowws] = React.useState(rows);
  const handleRows = (rows) => {
    setRowws(rows);
  };
  const abc = {
    a: handleRows,
    b: stableSort(Rows, getComparator(order, orderBy)),
  };
  console.log(Rows);
  return (
    <RowsContext.Provider value={abc}>
      <Box sx={{ width: "95%", margin: "60px auto", position: "relative" }}>
        <Add />
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={Rows.length}
              />
              <TableBody>
                {stableSort(Rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" padding="normal">
                          {row.Name}
                        </TableCell>
                        <TableCell>{row.Country}</TableCell>
                        <TableCell>
                          <span>
                            <Link
                              style={{ color: "#6cf5bb", cursor: "pointer" }}
                              to={`/Edit/${index}`}
                            >
                              <EditIcon />
                            </Link>
                          </span>
                          {"  "}
                          <span>
                            <Link
                              style={{ color: "red", cursor: "pointer" }}
                              to={`/Del/${index}`}
                            >
                              <DeleteForeverIcon />
                            </Link>
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Outlet />
      </Box>
    </RowsContext.Provider>
  );
}
