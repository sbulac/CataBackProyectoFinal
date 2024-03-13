import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context";

const StyledInput = ({ name, type, id, sx, endAdornment, validation }) => {
  const { register, errors } = useContext(AppContext);
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel error={!!errors[id]} htmlFor={id}>
        {name}
      </InputLabel>
      <OutlinedInput
        sx={sx}
        fullWidth
        id={id}
        type={type}
        label={name}
        endAdornment={endAdornment}
        error={!!errors[id]}
        {...register(id, validation)}
      />
      <FormHelperText sx={{ color: "#f44336" }}>
        {errors[id]?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default StyledInput;
