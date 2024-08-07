import React from "react";
import Input from "../Input/Input";
import styles from "./styles.module.css";

type PropsType = {
  name: string;
  optionValue?: string[];
  value: string;
  onChange: { (e: any): void };
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onBlur?: { (e: any): void };
  classDiv?: string;
  height?: number;
  width?: number;
  checked?: any;
};

const Switch = ({
  name,
  optionValue = ["Y", "N"],
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  classDiv = "",
  height,
  width,
  checked = false,
}: PropsType) => {
  const clase = classDiv || "";
  return (
    <div className="">
      <div
        className={`${clase} ${styles["center-content"]} `}
        style={{ cursor: "pointer" }}
      >
        <label
          htmlFor={name}
          className={`${styles["logo-label"]} ${
            required ? `${styles["label-active"]} }` : null
          }`}
        >
          {label} {required ? "*" : null}
          <div
            className={`${styles["center-content"]} ${styles["container-label"]} `}
          >
            <Input
              type="checkbox"
              name={name}
              className={styles["sr-only"]}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              onChange={onChange}
              value={optionValue[0]}
              checked={checked || value === optionValue[0]}
            />

            <div
              style={{
                backgroundColor:
                  value === optionValue[0]
                    ? "var(--cPrimary)"
                    : "var(--cWhiteV1)",
                height: height ? `${height}px` : "24px",
                width: width ? `${width}px` : "44px",
              }}
              className={`${styles["bg-position"]} ${styles["rounded-full"]} ${styles["transition-background"]}`}
            >
              <div
                style={{
                  ...(value === optionValue[0]
                    ? {
                        transform: "translateX(20px)",
                        boxShadow:
                          "0 4px 6px -1px rgb(0 0 0 / 0.1),  0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        backgroundColor: "var(--cWhiteV1)",
                      }
                    : {
                        transform: "translateX(0)",
                        boxShadow:
                          "0 4px 6px -1px rgb(0 0 0 / 0.3),  0 2px 4px -2px rgb(0 0 0 / 0.3)",
                        backgroundColor: "var(--cWhiteV1)",
                      }),
                  height: height ? `${height}px` : "20px",
                  width: width ? `${width}px` : "20px",
                }}
                className={`${styles["rounded-full"]} ${
                  styles["container-effect"]
                } ${styles["transitioned-element"]}  ${
                  value === (optionValue[0] ? optionValue[0] : "Y") ? "Y" : "N"
                }`}
              ></div>
            </div>
          </div>
        </label>
      </div>
      {/* <div>
        {!props.error ? null : (
          <p
            style={
              props.error[props.name] || props.message
                ? {
                    display: "block",
                    color: props.error[props.name]
                      ? "var(--cSuccess)"
                      : "var(--cError)",
                  }
                : { display: "none" }
            }
            className="space-switch"
          >
            {props.error[props.name] || props.message || null} &nbsp;
          </p>
        )}
      </div> */}
    </div>
  );
};

export default Switch;
