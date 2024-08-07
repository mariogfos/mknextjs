import styles from "./styles.module.css";
type PropsType = {
  title: any;
  value: any;
  colorKey?: string;
  colorValue?: string;
};
const KeyValue = ({ title, value, colorKey, colorValue }: PropsType) => {
  return (
    <div className={styles.keyValue}>
      <div style={colorKey ? { color: colorKey } : {}}>{title}</div>
      <div style={colorValue ? { color: colorValue } : {}}>{value}</div>
    </div>
  );
};

export default KeyValue;
