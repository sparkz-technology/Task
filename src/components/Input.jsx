import TextField from "@mui/material/TextField";

function InputComponent({ value, handleOnchage, name }) {
  return (
    <TextField
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      value={value}
      name={name}
      onChange={handleOnchage}
    />
  );
}

export default InputComponent;
