import {
  IconArrowDown,
  IconCheckOff,
  IconCheckSquare,
} from "@/components/layout/icons/IconsBiblioteca";
import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import styles from "./styles.module.css";
import { PropsTypeInputBase } from "../ControlLabel";
import { createPortal } from "react-dom";

interface PropsType extends PropsTypeInputBase {
  multiSelect?: boolean;
  filter?: boolean;
  options: any[];
  optionLabel?: string;
  optionValue?: string;
}

const Select = ({
  value,
  name,
  error = null,
  className = "",
  multiSelect = false,
  filter = false,
  options = [],
  optionLabel = "name",
  optionValue = "id",
  readOnly = false,
  disabled = false,
  required = false,
  placeholder = "",
  label = "",
  onBlur = () => {},
  onChange = (e: any) => {},
}: PropsType) => {
  const [selectValue, setSelectValue] = useState(
    value || (multiSelect ? [] : "")
  );
  const [openOptions, setOpenOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedNames, setSelectedNames]: any = useState([]);
  const [_options, setOptions]: any = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition]: any = useState(null);
  const [top, setTop] = useState(10);
  console.log(top);

  const findParentWithClass = (element: any, className: string) => {
    while (element && element !== document) {
      if (element.classList.contains(className)) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  };

  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
    const filteredOptions = options.filter((option: any) =>
      option[optionLabel].toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  useEffect(() => {
    if (options) setOptions(options);
    if (multiSelect) {
      if (
        Array.isArray(options) &&
        options.length > 0 &&
        Array.isArray(selectValue)
      ) {
        const selectedValues = options.filter((option: any) =>
          selectValue.includes(option.id)
        );
        let selectedDisplay = "";
        if (selectedValues.length > 2) {
          selectedDisplay = selectedValues.length + " elementos seleccionados";
        } else {
          const selectedNames = selectedValues.map(
            (option: any) => option.name || option.label
          );
          selectedDisplay = selectedNames.join(", ");
        }
        setSelectedNames(selectedDisplay);
      }
    }
  }, [selectValue, options]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };
    const parentWithClass = findParentWithClass(
      selectRef.current,
      "contScrollable"
    );
    if (parentWithClass) {
      console.log("Scrollable encontrado");
      parentWithClass.addEventListener("scroll", calcPosition);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (parentWithClass) {
        parentWithClass.removeEventListener("scroll", calcPosition);
      }
    };
  }, []);

  const calcPosition = () => {
    let fec: any = new Date();
    let f: any =
      fec.getHours() +
      "" +
      fec.getMinutes() +
      "" +
      fec.getSeconds() +
      fec.getMilliseconds();
    fec = f * 1;

    setTop(fec);

    const select: any = selectRef.current;
    const child: any = select.querySelector("section");

    let parent: any = select.getBoundingClientRect();
    let childPosition: any = child?.getBoundingClientRect();

    let up = 34;
    if (childPosition) {
      if (parent.top + 34 + childPosition.height > window.innerHeight) {
        up = childPosition.height * -1;
      }
    }
    setPosition({
      top: parent.top + up,
      left: parent.left,
      width: parent.width,
    });
    return;
  };

  useEffect(() => {
    if (openOptions) {
      handleSelectPosition();
      calcPosition();
    }
  }, [openOptions]);

  useEffect(() => {
    if (!multiSelect) {
      if (selectValue !== value) {
        let valueText = options?.filter(
          (o: any) => o[optionValue] === value
        )[0];
        if (valueText) {
          valueText = valueText[optionLabel];
        }
        setSelectValue(valueText);
      }
    }
  }, [value, selectValue]);

  if (!options) return null;
  let valueText: any = "";
  if (readOnly) {
    if (options.filter) {
      valueText = options.filter((o: any) => o[optionValue] === value)[0];
      if (valueText) {
        valueText = valueText[optionLabel];
      }
    } else {
      valueText = options[value]?.label || "";
    }
  }

  const handleSelectClickElement = (element: any) => {
    setSelectValue(element);
    setOpenOptions(false);
    onChange({ target: { name: name, value: element } });
  };

  const handleSelectMultiClickElement = (element: any) => {
    const selectedValues = Array.isArray(selectValue) ? [...selectValue] : [];
    const index = selectedValues.indexOf(element);
    if (index !== -1) {
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(element);
    }
    setSelectValue(selectedValues);
    onChange({ target: { name: name, value: selectedValues } });
  };

  const handleSelectClickIcon = (e: any) => {
    e.stopPropagation();
    setOpenOptions(!openOptions);
  };

  const handleSelectPosition = () => {
    // const select = selectRef.current;
    // if (select) {
    //   const top = select.getBoundingClientRect().top;
    //   const bottom = window.innerHeight - select.getBoundingClientRect().bottom;
    //   return top > bottom ? "bottom-full" : "top-full";
    // }
    // return "";
  };

  const Section = () => {
    return (
      <section
        className={styles.selectOptions}
        style={{
          // position: "fixed",
          top: (position?.top || 0) + "px",
          left: (position?.left || 0) + "px",
          width: (position?.width || 0) + "px",
          // top: "0px",
          // left: "5px",
          // width: +"0px",
        }}
      >
        {/* <div>{JSON.stringify(position)}</div> */}
        <div className={filter ? "" : "hidden"}>
          <Input
            type="text"
            value={search}
            onChange={onChangeSearch}
            name="search"
            placeholder={"Buscar..."}
          />
        </div>
        <ul>
          {_options.map
            ? _options.map((option: any, key: any) => (
                <li
                  className={
                    Array.isArray(selectValue)
                      ? selectValue.includes(option[optionValue])
                        ? styles["selected"]
                        : ""
                      : selectValue === option[optionValue]
                      ? styles["selected"]
                      : ""
                  }
                  key={"li" + name + (option[optionValue] || key)}
                  onClick={
                    !multiSelect
                      ? (e) => {
                          handleSelectClickElement(option[optionValue] || key);
                          e.stopPropagation();
                        }
                      : (e) => {
                          handleSelectMultiClickElement(
                            option[optionValue] || key
                          );
                          e.stopPropagation();
                        }
                  }
                >
                  {option[optionLabel] || option.label}
                  {multiSelect ? (
                    Array.isArray(selectValue) &&
                    selectValue.includes(option[optionValue]) ? (
                      <IconCheckSquare size={18} />
                    ) : (
                      <IconCheckOff size={18} />
                    )
                  ) : null}
                </li>
              ))
            : Object.keys(_options).map((key) => (
                <li
                  key={"li" + name + key}
                  onClick={() =>
                    handleSelectClickElement(
                      _options[key][optionValue] || _options[key].label
                    )
                  }
                >
                  {_options[key][optionValue] || _options[key].label}
                </li>
              ))}
        </ul>
      </section>
    );
  };
  return (
    <div
      ref={selectRef}
      className={styles.select + " " + className}
      style={{ zIndex: top }}
      onClick={disabled ? () => {} : handleSelectClickIcon}
    >
      <Input
        type={"text"}
        value={
          multiSelect
            ? selectedNames
            : options.find
            ? options.find((i: any) => {
                return i[optionValue] == value;
              })
              ? options.find((i: any) => {
                  return i[optionValue] == value;
                })[optionLabel]
              : ""
            : options[value]?.label
        }
        onChange={onChange}
        readOnly={true}
        label={label}
        name={name}
        iconRight={<IconArrowDown className={openOptions ? "rotate" : ""} />}
        placeholder={placeholder}
        required={required}
        onBlur={onBlur}
        disabled={disabled}
        error={error}
      />
      {openOptions &&
        createPortal(
          <Section />,
          document.getElementById("portal-root") as any
        )}
    </div>
  );
};

export default Select;
