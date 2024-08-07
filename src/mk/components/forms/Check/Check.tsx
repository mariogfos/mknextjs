import {
  IconCheckOff,
  IconCheckSquare,
} from "../../../../components/layout/icons/IconsBiblioteca";
import { PropsTypeInputBase } from "../ControlLabel";
import styles from "./styles.module.css";

interface PropsType extends PropsTypeInputBase {
  checked?: boolean;
  optionValue?: string[];
  message?: string;
}

const Check = ({
  optionValue = ["Y", "N"],
  className = "",
  ...props
}: PropsType) => {
  console.log("checked(", props.value, ")", optionValue, props.value);

  return (
    <div className={styles.check + " " + className}>
      <label htmlFor={props.name}>
        {props.label} {props.required ? "*" : null}
        <input
          type="checkbox"
          name={props.name}
          id={props.name}
          required={props.required}
          disabled={props.disabled}
          readOnly={props.readOnly}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          checked={props.checked}
        />
        <span>
          {props.checked ? (
            <IconCheckSquare color="#00e38c" />
          ) : (
            <IconCheckOff />
          )}
        </span>
        {!props.error ? null : (
          <p className="error">{props.error[props.name]} &nbsp;</p>
        )}
      </label>
    </div>
  );
};

export default Check;
