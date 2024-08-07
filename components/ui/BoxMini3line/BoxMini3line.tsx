import { CSSProperties } from "react";
import styles from "./styles.module.css";

type PropsType = {
  value: string;
  tit?: string;
  sub?: string;
  variant?: string;
  style?: CSSProperties;
};

const BoxMini3line = ({
  value,
  tit = "",
  sub = "",
  variant = "",
  style = {},
}: PropsType) => {
  return (
    <div className={styles.boxMini3Line + " " + variant}>
      {tit && <header>{tit}</header>}
      {sub && <sub>{sub}</sub>}
      <div style={style}>{value}</div>
    </div>
  );
};

export default BoxMini3line;
