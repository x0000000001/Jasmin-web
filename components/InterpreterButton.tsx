import Button from "@mui/joy/Button";

type Props = { name: string; onClick: () => void };

export default function InterpreterButton({ name, onClick }: Props) {
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
