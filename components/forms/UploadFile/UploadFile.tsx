import { useState } from "react";
import {
  IconDocs,
  IconImage,
  IconPDF,
} from "../../../../components/layout/icons/IconsBiblioteca";
import Button from "../Button/Button";
import styles from "./UploadFile.module.css";
import ControlLabel, { PropsTypeInputBase } from "../ControlLabel";

interface PropsType extends PropsTypeInputBase {
  ext: string[];  
  setError: Function;
  img?: boolean;
  fileDescript?: boolean;
  defaultValue?: any;
  imgWidth?: string | number;
  imgHeight?: string | number;
}

export const UploadFile = ({
  className = "",
  onChange = (e: any) => {},
  fileDescript = true,
  imgWidth,
  imgHeight,
  ...props
}: PropsType) => {
  const [selectedFiles, setSelectedFiles]: any = useState({});
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const onError = (err: any) => {
    console.log("reader error", err);
  };

  const onChangeFile = (e: any) => {
    props.setError((prevErrors: any) => ({ ...prevErrors, [props.name]: "" }));
    try {
      let file: any = null;
      if (e.dataTransfer) file = e.dataTransfer.files[0];
      else file = e.target.files[0];
      setSelectedFiles(file);

      if (
        !props.ext.includes(
          file.name
            .toLowerCase()
            .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
        )
      ) {
        props.setError({
          [props.name]: "Solo se permiten archivos " + props.ext.join(", "),
        });
        setSelectedFiles({});
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const partes = file.name.split(".");
        let base64String = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        base64String = encodeURIComponent(base64String);
        onChange({
          target: {
            name: props.name,
            value: { ext: partes[partes.length - 1], file: base64String },
          },
        });
      };
      reader.onerror = onError;
      reader.readAsDataURL(file);
    } catch (error) {
      setSelectedFiles({});
      onChange({
        target: {
          name: props.name,
          value: { ext: "", file: "" },
        },
      });
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeFile(e);
  };

  return (
    <ControlLabel {...props} className={`${styles.uploadFile} ${className}`}>
      <section
        onClick={() => {
          const fileUpload = document.getElementById(props.name);
          if (fileUpload) {
            fileUpload.click();
          }
        }}
        style={{
          borderColor: props.error
            ? "var(--cError)"
            : props.value?.file || isDraggingFile
            ? "var(--cPrimary)"
            : "var(--cWhiteV1)",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={() => setIsDraggingFile(true)}
        onDragLeave={() => setIsDraggingFile(false)}
      >
        <input
          type="file"
          name={props.name}
          id={props.name}
          onChange={onChangeFile}
          value=""
          required={props.required}
          disabled={props.disabled}
        />
        {props.defaultValue && !selectedFiles?.name ? (<div>
          <div style={{width:imgWidth,height:imgHeight}}>{props.defaultValue}</div> <Button variant="terciary">Editar {!props.img?'elemento':'foto'}</Button></div>):!selectedFiles?.name || selectedFiles?.name === "" ? (
          <>
            {props.img ? (
              <IconImage size={40} color={"var(--cWhiteV1)"} />
            ) : (
              <IconDocs size={40} color={"var(--cWhiteV1)"} />
            )}
            <span style={{ color: "var(--cAccent)" }}>{props.placeholder}</span>
            <span style={{ color: "var(--cWhiteV1)" }}>
              {props.ext.join(", ")}
            </span>
          </>
        ) : (
          <div>
            {selectedFiles?.type.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img style={{width:imgWidth,height:imgHeight}} src={URL.createObjectURL(selectedFiles)} alt="Preview" />
            ) : selectedFiles.type === "application/pdf" ? (
              <IconPDF size={80} color={"var(--cWhiteV1)"} />
            ) : (
              <IconDocs size={80} color={"var(--cWhiteV1)"} />
            )}
           {fileDescript && <p>
              Archivo seleccionado: <span>{selectedFiles.name}</span>
            </p>}
            <Button variant="terciary">Editar {!props.img?'elemento':'foto'}</Button>
          </div>
        )}
      </section>
    </ControlLabel>
  );
};
