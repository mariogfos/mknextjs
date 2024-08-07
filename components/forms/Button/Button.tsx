import { useAuth } from "@/mk/contexts/AuthProvider";
import styles from "./styles.module.css";
import { CSSProperties } from "react";

type PropsType = {
  variant?: "primary" | "secondary" | "terciary" | "accent" | "small";
  children: any;
  onClick?: (e?: any) => void;
  className?: string;
  small?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

const Button = ({
  variant = "primary",
  children,
  onClick,
  className = "",
  disabled = false,
  small = false,
  style,
}: PropsType) => {
  const { waiting } = useAuth();
  return (
    <button
      style={style}
      className={
        styles.button +
        " " +
        styles[variant] +
        " " +
        (small ? styles["small"] : "") +
        " " +
        className
      }
      onClick={onClick}
      disabled={disabled || waiting > 0}
    >
      {children}
    </button>
  );
};

export default Button;
