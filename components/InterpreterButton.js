import Button from "@mui/joy/Button";

export default function InterpreterButton({ name, onClick }) {
  return (
    <Button
      color="neutral"
      disabled={false}
      onClick={onClick}
      size="md"
      variant="outlined"
    >
      {name}
    </Button>
  );
}
