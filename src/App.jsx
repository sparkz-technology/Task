import "./App.css";
import ButtonComponent from "./components/Button";
import TableComponent from "./components/Table";
import UserForm from "./components/UserForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./redux/Slices/UserListSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function App() {
  const columns = [
    {
      id: 1,
      title: "Name",
      key: "name",
    },
    {
      id: 2,
      title: "Email",
      key: "email",
    },
    {
      id: 4,
      title: "Actions",
      key: "actions",
      cellRender: (row, column, rowIndex) => {
        return (
          <div className="flex gap-3">
            <ButtonComponent label="Edit" handleClick={() => handleEdit(row)} />
            <ButtonComponent
              label="Delete"
              handleClick={() => handleDelete(row)}
            />
          </div>
        );
      },
    },
  ];
  const rows = useSelector((state) => state.userList.userList);
  const dispatch = useDispatch();
  const handleEdit = (user) => {
    setSelectedUser({ isUpdate: true, ...user });
    handleOpen();
  };
  const handleDelete = (user) => {
    console.log(user);
    dispatch(deleteUser(user));
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = () => {
    setSelectedUser(null);
    handleOpen();
  };
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">User Details</h1>
        <ButtonComponent label="Create User" handleClick={handleCreate} />
      </div>

      <TableComponent columns={columns} rows={rows} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <UserForm userDetails={selectedUser} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
