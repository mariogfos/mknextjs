import { CSSProperties } from "react";
import styles from "./styles.module.css";

interface PropsType {
  children: any;
  className?: string;
  style?: CSSProperties;
}

export const Card = ({
  children,
  className = undefined,
  style = undefined,
}: PropsType) => {
  return (
    <div style={style} className={styles.card + "  " + className}>
      {children}
    </div>
  );
};
