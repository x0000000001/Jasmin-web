import { Textarea } from "@mui/joy";

export default function InterpreterTextField({
  name,
  default_code,
  disabled,
  placeHolder,
  minRows = 4,
  maxRows = 4,
}) {
  return (
    <Textarea
      name={name}
      color="neutral"
      disabled={disabled}
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeHolder}
      size="md"
      variant="soft"
      defaultValue={default_code}
    />
  );
}
