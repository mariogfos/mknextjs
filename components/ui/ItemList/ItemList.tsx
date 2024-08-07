import { CSSProperties } from "react";
import styles from "./styles.module.css";

interface PropsType {
  key?: number;
  title: any;
  subtitle?: any;
  left?: any;
  right?: any;
  foot?: any;
  style?: CSSProperties;
  variant?: string;
  active?: boolean;
  icon?: any;
}
const ItemList = ({
  title,
  subtitle,
  left,
  right,
  foot,
  key = 0,
  style = {},
  variant = "",
  active = false,
  icon,
}: PropsType) => {
  return (
    <div
      className={
        styles.itemList +
        " " +
        styles[variant] +
        " " +
        (active && styles.active)
      }
      style={style}
      key={key}
    >
      <div>
        {icon && <span className={styles.icon}>{icon}</span>}
        {left && <span>{left}</span>}
        <div>
          <div>{title}</div>
          <span>{subtitle}</span>
        </div>
        {right && <span>{right}</span>}
      </div>
      {foot && <footer>{foot}</footer>}
    </div>
  );
};

export default ItemList;
