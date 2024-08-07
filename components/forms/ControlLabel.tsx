import { ChangeEventHandler, CSSProperties, useMemo } from "react";
import stylesTextArea from "./TextArea/styles.module.css";
import stylesInput from "./Input/input.module.css";

export interface PropsTypeInputBase {
  label?: string;
  name: string;
  placeholder?: string;

  value: any;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  error?: any;
  style?: CSSProperties;
  onBlur?: (() => void) | ((e: any) => void);
  onFocus?: () => void;
  onChange?: ChangeEventHandler;
  iconLeft?: any;
  iconRight?: any;
  checked?: boolean;
}

interface PropsType extends PropsTypeInputBase {
  children?: any;
}

const ControlLabel = (props: PropsType) => {
  const label: any = useMemo(() => {
    if (props.required && props.label) return props.label + " *";
    return props.label;
  }, [props.label, props.required]);

  return (
    <div
      className={
        props.className +
        " " +
        (props.error?.[props.name] && stylesInput.error) +
        " " +
        (props.error?.[props.name] && stylesTextArea.error)
      }
      style={props.style}
    >
      {props.iconLeft && <span>{props.iconLeft}</span>}
      <div>
        {props.children}
        <label htmlFor={props.name}>{label}</label>
      </div>
      {props.iconRight && <span>{props.iconRight}</span>}
      {!props.error ? null : props.name === "file" ? (
        <p
          style={{
            color: "var(--cError)",
            fontSize: "var(--sS)",
            paddingLeft: "var(--spL)",
          }}
        >
          {props.error[props.name] || null}
        </p>
      ) : (
        <p className={stylesInput.error}>{props.error[props.name] || null}</p>
      )}
    </div>
  );
};

export default ControlLabel;
