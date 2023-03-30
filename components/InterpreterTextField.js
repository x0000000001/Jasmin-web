import { Textarea } from "@mui/joy";
import Button from "@mui/joy/Button";

export default function InterpreterTextField({
  id,
  default_code,
  disabled,
  placeHolder,
  minRows = 4,
}) {
  return (
    <Textarea
      id={id}
      color="neutral"
      disabled={disabled}
      minRows={minRows}
      placeholder={placeHolder}
      size="md"
      variant="outlined"
      defaultValue={default_code}
    />
  );
}
