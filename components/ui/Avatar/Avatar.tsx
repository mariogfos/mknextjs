import { useEffect, useState } from "react";
import { initialsName } from "../../../utils/string";
import styles from "./styles.module.css";
type PropsType = {
  src?: string;
  name?: string;
  pin?: boolean;
  children?: any;
  w?: number | string;
  h?: number | string;
  className?: string;
  onClick?: (e: any) => void;
};

export const Avatar = ({
  src = undefined,
  name = "",
  pin = false,
  children,
  w = 48,
  h = 48,
  onClick,
  className,
}: PropsType) => {
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [src]);
  return (
    <div className={styles.avatar + " " + className} onClick={onClick}>
      <div style={{ width: w, height: h }}>
        {src && !imageError ? (
          <img src={src} alt={name} onError={() => setImageError(true)} />
        ) : (
          <div>{initialsName(name)}</div>
        )}
      </div>
      {pin && <span className="spin"></span>}
      {children}
    </div>
  );
};
