import styles from "@/styles/Button.module.css";
import { MouseEventHandler } from "react";

interface ButtonProps {
  btnText: string;
  variant: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  btnText,
  variant,
  type,
  handleClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${styles.btn} ${styles[`btn-${variant}`]}`}
    >
      {btnText}
    </button>
  );
}
