import Button from "@mui/joy/Button";
import styles from "./JasminInterpreter.module.css";

export default function InterpreterButton({ name, onClick }) {
  return (
    <div className={`${styles.button}`}>
      <Button
        color="neutral"
        disabled={false}
        onClick={onClick}
        size="md"
        variant="soft"
      >
        {name}
      </Button>
    </div>
  );
}
