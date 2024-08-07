 import React from "react";
 import { UploadFile } from "../UploadFile/UploadFile";
 import styles from "./InputImage.module.css";
 import { Avatar } from "../../ui/Avatar/Avatar";

 type PropsType = {
   ext: string[];
   value: any;
   name: string;
   onChange: any;
   error?: any;
   setError?: any;
   img: boolean;
   placeholder?: string;
   required?: boolean;
   defaultValue?: any;
   imgWidth?: string | number;
    imgHeight?: string | number;
 };

 const InputImage = ({
   ext,
   value,
   name,
   onChange,
   error,
   setError,
   img,
   defaultValue,
   imgWidth,
   imgHeight,
   placeholder = "Cargar un archivo, arrastralo y sueltalo aqui",
   required = false,
 }: PropsType) => {
   return (
     <UploadFile
       name={name}
       ext={ext}
       value={value}
       onChange={onChange}
       error={error}
       setError={setError}
       required={required}
       img={img}
       fileDescript={false}
       defaultValue={defaultValue}
       placeholder={placeholder}
       className={styles.inputImage}
       imgHeight={imgHeight}
       imgWidth={imgWidth}
     />
   );
 };

 export default InputImage;

// import { IconCamera, IconDocs, IconPDF } from '@/components/layout/icons/IconsBiblioteca'
// import { getUrlImages } from '@/mk/utils/string'
// import React, { useState } from 'react'

// const InputImage = ({ setFormState,formState, preview, src, onChange,name,ext,setError }: any) => {
//   const [imageError, setImageError] = useState(false);
//   const [selectedFiles, setSelectedFiles]: any = useState({});
//   const onError = (err: any) => {
//     console.log("reader error", err);
//   };
//   const onChangeFile = (e: any) => {
//     setError((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
//     try {
//       let file: any = null;
//       if (e.dataTransfer) file = e.dataTransfer.files[0];
//       else file = e.target.files[0];
//       setSelectedFiles(file);

//       if (
//         !ext.includes(
//           file.name
//             .toLowerCase()
//             .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
//         )
//       ) {
//         setError({
//           [name]: "Solo se permiten archivos " + ext.join(", "),
//         });
//         setSelectedFiles({});
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         const partes = file.name.split(".");
//         let base64String = e.target.result
//           .replace("data:", "")
//           .replace(/^.+,/, "");
//         base64String = encodeURIComponent(base64String);
//         onChange({
//           target: {
//             name: name,
//             value: { ext: partes[partes.length - 1], file: base64String },
//           },
//         });
//       };
//       reader.onerror = onError;
//       reader.readAsDataURL(file);
//     } catch (error) {
//       setSelectedFiles({});
//       onChange({
//         target: {
//           name: name,
//           value: { ext: "", file: "" },
//         },
//       });
//     }
//   };
//   return (
//     <div>
//       {(!imageError || preview) && (
//         <img
//           alt="Imagen"
//           src={
//             src
//           }
//           onError={() => setImageError(true)}
//         />
//       )}
//          {selectedFiles?.type?.startsWith("image/") ? (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img src={URL.createObjectURL(selectedFiles)} alt="Preview" />
//             ) : selectedFiles.type === "application/pdf" ? (
//               <IconPDF size={80} color={"var(--cWhiteV1)"} />
//             ) : (
//               <IconDocs size={80} color={"var(--cWhiteV1)"} />
//             )}
//       <label htmlFor="imagePerfil">
//         <IconCamera />
//       </label>
//       <input
//         type="file"
//         id="imagePerfil"
//         className="hidden"
//         onChange={onChangeFile}
//       />
//     </div>
//   )
// }

// export default InputImage
