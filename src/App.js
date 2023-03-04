import { Link, Outlet } from "react-router-dom";
import Add from "./Elements/AddButton";
import * as React from "react";
// import { countries } from "./Elements/SelectCountry";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { createContext } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export const RowsContext = createContext();
var index = 0;
function createData(id, Name, Country, code) {
  index += 1;
  return {
    id,
    Name,
    Country,
    code,
  };
}

const initialRows = [
  createData(index, "Vinfast", "Vietnam", "VN"),
  createData(index, "Facebook", "United States", "US"),
  createData(index, "Google", "United States", "US"),
  createData(index, "Tesla", "United States", "US"),
  createData(index, "Baidu", "China", "CN"),
  createData(index, "Apple", "United States", "US"),
  createData(index, "Rolex", "Switzerland", "CH"),
  createData(index, "Tencent", "China", "CN"),
  createData(index, "Microsoft", "United States", "US"),
  createData(index, "BMW", "Germany", "DE"),
  createData(index, "IBM", "United States", "US"),
  createData(index, "Gojek", "Indonesia", "ID"),
  createData(index, "Viettel", "Vietnam", "VN"),
  createData(index, "FPT", "Vietnam", "VN"),
];

export default function ColumnTypesGrid() {
  const [pageSize, setPageSize] = React.useState(5);
  const [DataRows, setRowwsApp] = React.useState(initialRows);
  const handleRows = (rows) => {
    setRowwsApp(rows);
  };
  const funContext = {
    funcHandleRows: handleRows,
    DataRows: DataRows,
  };
  const columns = React.useMemo(
    () => [
      {
        field: "Name",
        headerName: "Name of the company",
        type: "string",
        headerClassName: "bold-text",
        flex: 1,
      },
      {
        field: "Country",
        headerName: "Country",
        headerClassName: "bold-text",
        type: "string",
        flex: 0.5,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        headerClassName: "bold-text",
        flex: 0.5,
        getActions: (params) => [
          <GridActionsCellItem
            component={Link}
            to={`/Edit/${params.id}`}
            icon={<EditIcon sx={{ color: "#6cf5bb" }} />}
            label="Edit"
          />,
          <GridActionsCellItem
            component={Link}
            to={`/Del/${params.id}`}
            icon={<DeleteForeverIcon sx={{ color: "red" }} />}
            label="Delete"
          />,
        ],
      },
    ],
    []
  );

  return (
    <RowsContext.Provider value={funContext}>
      <Box
        sx={{
          width: "95%",
          margin: "60px auto",
          position: "relative",
          "& .bold-text > .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .bold-text > .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      >
        <Add />
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(e) => setPageSize(e)}
          rowsPerPageOptions={[5, 15, 25, 50]}
          autoHeight={true}
          disableSelectionOnClick={true}
          disableColumnMenu={true}
          columns={columns}
          rows={DataRows}
        />
        <Outlet />
      </Box>
    </RowsContext.Provider>
  );
}
