import "./productList.css";
import React, { useEffect } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Actions/admin";
import { deleteProduct } from './../../Redux/Actions/admin';

export default function ProductList() {
  const [data, setData] = useState([]);

  const products = useSelector((state) => state.admin.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  };

  const columns = [
    { field: "id", headerName: "id", width: 40 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={`${params.row.thumbnail_url}`}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "description",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.description}</div>;
      },
    },
    {
      field: "title",
      headerName: "title",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.title}</div>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.price}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row.id}>
              <button  className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
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
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={products?.length}
        checkboxSelection={false}
      />
    </div>
  );
}
