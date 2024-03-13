import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const StyledButton = ({
  path,
  variant,
  color,
  sx,
  setBtnVariant,
  onClick,
  children,
}) => {
  return (
    <Button
      component={Link}
      to={path}
      variant={variant}
      color={color}
      sx={sx}
      onClick={onClick}
      onMouseLeave={() => setBtnVariant("contained")}
      onMouseEnter={() => setBtnVariant("outlined")}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
