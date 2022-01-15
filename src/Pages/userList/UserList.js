import "./userList.css";
import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/Actions/admin";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { deleteUser } from './../../Redux/Actions/admin';
export default function UserList() {
  // const [data, setData] = useState([]);

  console.log("hp");
  const dispatch = useDispatch();

  const users = useSelector((state) => state.admin.users);
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "id", width: 10 },
    {
      field: "user",
      headerName: "user",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "email", width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          {params.row.email}
        </div>
      );
    }, },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            {
              params.row.id===1? <div></div> :  <DeleteOutline
              className="userListDelete"
              onClick={() => dispatch(deleteUser(params.row.id))}
            />
            }
           
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGridPro
      autoHeight={true}
      disableChildrenSorting={true}
      disableChildrenFiltering={true}
      disableColumnResize
      disableColumnReorder
      autoPageSize={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={users?.length}
        checkboxSelection={false}
      />
    </div>
  );
}
