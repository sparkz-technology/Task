import Button from "@mui/material/Button";

function ButtonComponent({ label, handleClick }) {
  return (
    <Button variant="contained" onClick={handleClick} type="submit">
      {label}
    </Button>
  );
}

export default ButtonComponent;
