import styles from "@/styles/Button.module.css";
import { MouseEventHandler } from "react";

interface ButtonProps {
  btnText: string;
  type: "primary" | "secondary";
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ btnText, type, handleClick }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`${styles.btn} ${styles[`btn-${type}`]}`}
    >
      {btnText}
    </button>
  );
}
