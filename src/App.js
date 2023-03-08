import DialogForm from "./Elements/Dialog_Form";
import { Link, Outlet } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { createContext } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export const rowsContext = createContext();

var index = 0;
function createData(id, name, country, code) {
  index += 1;
  return {
    id,
    name,
    country,
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
  const [dataRows, setRowwsApp] = React.useState(initialRows);

  const handleRows = (rows) => {
    setRowwsApp(rows);
  };

  const funContext = {
    funcHandleRows: handleRows,
    dataRows: dataRows,
  };

  const columns = React.useMemo(
    () => [
      {
        field: "name",
        headerName: "Name of the company",
        type: "string",
        headerClassName: "border_none",
        flex: 1,
      },
      {
        field: "country",
        headerName: "Country",
        headerClassName: "border_none",
        type: "string",
        flex: 0.5,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        headerClassName: "border_none",
        flex: 0.5,
        getActions: (params) => [
          <GridActionsCellItem
            component={Link}
            to={`/serviceProviderEdit/${params.id}`}
            icon={<EditIcon sx={{ color: "#6cf5bb" }} />}
            label="Edit"
          />,
          <GridActionsCellItem
            component={Link}
            to={`/serviceProviderDel/${params.id}`}
            icon={<DeleteForeverIcon sx={{ color: "red" }} />}
            label="Delete"
          />,
        ],
      },
    ],
    []
  );

  return (
    <rowsContext.Provider value={funContext}>
      <Box
        sx={{
          width: "95%",
          margin: "30px auto",
          "& .border_none > .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            margin: "10px auto",
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/serviceProviderAdd">
            <Button sx={{ background: "#004683" }} variant="contained">
              + Add New
            </Button>
          </Link>
        </Box>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(e) => setPageSize(e)}
          rowsPerPageOptions={[5, 15, 25, 50]}
          autoHeight={true}
          disableSelectionOnClick={true}
          disableColumnMenu={true}
          columns={columns}
          rows={dataRows}
        />
        <Outlet />
      </Box>
    </rowsContext.Provider>
  );
}
