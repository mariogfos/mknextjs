import { useEffect, useState } from "react";
import Input from "../Input/Input";
import {
  IconSearch,
  IconX,
} from "../../../../components/layout/icons/IconsBiblioteca";
import Button from "../Button/Button";
import styles from "./dataSearch.module.css";
import { PropsTypeInputBase } from "../ControlLabel";

interface PropsType extends PropsTypeInputBase {
  setSearch: Function;
  textButton?: string;
}

const DataSearch = ({
  setSearch,
  name,
  value,
  label = "",
  textButton = "Buscar",
  className = "",
}: PropsType) => {
  const [searchBy, setSearchBy] = useState("");
  const [oldSearch, setOldSearch] = useState("");

  const onSearch = (v: any = false) => {
    let s = searchBy.trim();
    if (v !== false) {
      s = v.trim();
      setSearchBy(s);
    }

    if (s === oldSearch) return;

    setSearch(s);
    setOldSearch(s);
  };

  const onChange = (e: any) => {
    setSearchBy(e.target.value);
  };

  const clearSearch = () => {
    setSearchBy("");
    setSearch("");
  };

  useEffect(() => {
    setSearchBy(value);
    setOldSearch(value);
  }, [value]);

  // iconLeft={
  //   !searchBy ? (
  //     <IconSearch />
  //   ) : (
  //     <IconX onClick={clearSearch} className="error" />
  //   )
  // }

  // iconLeft={
  //   !value ? (
  //     <IconSearch />
  //   ) : (
  //     <IconX onClick={() => onSearch("")} className="error" />
  //   )
  // }

  console.log("value:", searchBy);

  return (
    <Input
      name={name}
      className={styles.dataSearch + " " + className}
      required={false}
      label={label}
      value={searchBy}
      onChange={onChange}
      iconLeft={!searchBy ? <IconSearch /> : <IconX onClick={clearSearch} />}
      iconRight={
        searchBy && (
          <Button
            style={{ marginTop: -8, padding: 10 }}
            variant="primary"
            onClick={() => onSearch()}
          >
            {textButton}
          </Button>
        )
      }
    />
  );
};

export default DataSearch;
