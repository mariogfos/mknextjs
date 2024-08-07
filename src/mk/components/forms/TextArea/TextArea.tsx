import ControlLabel, { PropsTypeInputBase } from "../ControlLabel";
import styles from "./styles.module.css";

interface PropsType extends PropsTypeInputBase {
  lines?: number;
}

const TextArea = ({ ...props }: PropsType) => {
  const {
    name,
    placeholder = "",
    onChange = (e) => {},
    value,
    disabled = false,
    required = false,
    className = "",
    style = {},
    onBlur = () => {},
    onFocus = () => {},
  } = props;
  return (
    <ControlLabel {...props} className={styles.textarea + " " + className}>
      <textarea
        onChange={onChange}
        id={props.name}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        style={style}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        rows={props.lines}
      />
    </ControlLabel>
  );
};

export default TextArea;
