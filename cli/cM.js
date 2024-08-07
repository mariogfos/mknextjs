const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf8");
};

// Función para leer y parsear el archivo PHP
const parsePHPFile = (filePath) => {
  const phpContent = fs.readFileSync(filePath, "utf8");
  const fillableMatch = phpContent.match(/\$fillable\s*=\s*\[(.*?)\];/s);
  if (!fillableMatch) {
    console.log(chalk.red("No $fillable variable found in the PHP model."));
    return [];
  }
  const fillableFields = fillableMatch[1]
    .split(",")
    .map((field) => field.trim().replace(/['"\s]/g, ""))
    .filter(Boolean);
  return fillableFields;
};

// Función para leer y parsear el archivo api_fields.txt
const parseApiFieldsFile = (filePath, moduleName) => {
  const apiFieldsContent = fs.readFileSync(filePath, "utf8");
  const fillableVarName = `${moduleName.toLowerCase()}_fillable`;
  const fillableMatch = apiFieldsContent.match(
    new RegExp(`${fillableVarName}\\s*=\\s*\\[(.*?)\\];`, "s")
  );
  if (!fillableMatch) {
    console.log(
      chalk.red(`No ${fillableVarName} variable found in api_fields.txt.`)
    );
    return [];
  }
  const fillableFields = fillableMatch[1]
    .split(",")
    .map((field) => field.trim().replace(/['"\s]/g, ""))
    .filter(Boolean);
  return fillableFields;
};

const getCrudTemplate = (
  moduleName,
  fields
) => `/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./${moduleName}.module.css";
import RenderItem from "../shared/RenderItem";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import NotAccess from "@/components/layout/NotAccess/NotAccess";
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import ImportDataModal from "@/mk/components/data/ImportDataModal/ImportDataModal";


const mod: ModCrudType = {
  modulo: "${moduleName.toLowerCase()}",
  singular: "${moduleName.toLowerCase().slice(0, -1)}",
  plural: "${moduleName.toLowerCase()}",
  permiso: "",
  import: true,
  extraData: true,
};

const paramsInitial = {
  perPage: 100,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const ${moduleName} = () => {
  const fields = useMemo(() => {
    return {
      ${fields
        .map(
          (field) => `
      ${field}: {
        rules: ["required"],
        api: "ae",
        label: "${field.charAt(0).toUpperCase() + field.slice(1)}",
        form: { type: "text" },
        list: true
      },`
        )
        .join("")}
    };
  }, []);

  const onImport = () => {
    setOpenImport(true);
  };

  const {
    userCan,
    List,
    setStore,
    onSearch,
    searchs,
    onEdit,
    onDel,
    showToast,
    execute,
    reLoad,
    getExtraData,
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    _onImport: onImport,
  });
  const { onLongPress, selItem, searchState, setSearchState } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
  });

  const [openImport, setOpenImport] = useState(false);
  useEffect(() => {
    setOpenImport(searchState == 3);
  }, [searchState]);

  const renderItem = (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => {
    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <ItemList
          title={item?.name}
          subtitle={item?.description}
          variant="V1"
          active={selItem && selItem.id == item.id}
        />
      </RenderItem>
    );
  };

  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.${moduleName.toLowerCase()}}>
      <List onTabletRow={renderItem} />
      {openImport && (
        <ImportDataModal
          open={openImport}
          onClose={() => {
            setSearchState(0);
            setOpenImport(false);
          }}
          mod={mod}
          showToast={showToast}
          reLoad={reLoad}
          execute={execute}
          getExtraData={getExtraData}
          // requiredCols="DEPARTAMENTO, HABITANTES, HABILITADOS, ESCANOS, CODE"
        />
      )}
    </div>
  );
};

export default ${moduleName};
`;

const getMainFileTemplate = (
  moduleName
) => `import styles from './${moduleName}.module.css';

type PropsType = {
  // Add props here

};

const ${moduleName} = ({}:PropsType) => {
  return (
    <div className={styles.${moduleName.toLowerCase()}}>
      <h1>${moduleName} Module</h1>
    </div>
  );
};

export default ${moduleName};
`;

const getStylesFileTemplate = () => `.${moduleName} {
  /* Add your styles here */
}
`;

const getPageFileTemplate = (
  moduleName
) => `import ${moduleName} from '@/modulos/${moduleName}/${moduleName}';

const ${moduleName.toLowerCase()}Page = () => {
  return <${moduleName} />;
};

export default ${moduleName.toLowerCase()}Page;
`;

const createModule = (moduleName, crud = false, modelName = "") => {
  const moduleDir = path.join(__dirname, "../../modulos", moduleName);
  const pageFilePath = path.join(
    __dirname,
    "../../pages",
    `${moduleName.toLowerCase()}.tsx`
  );
  const apiModelPath = path.join(
    __dirname,
    "../../../../api/app/models",
    `${modelName}.php`
  );
  const apiFieldsPath = path.join(__dirname, "../../../api_fields.txt");

  if (fs.existsSync(moduleDir)) {
    console.log(chalk.red(`Module ${moduleName} already exists.`));
    return;
  }

  if (fs.existsSync(pageFilePath)) {
    console.log(chalk.red(`Page for module ${moduleName} already exists.`));
    return;
  }

  let fillableFields = [];

  // Verificar si el modelo PHP existe
  if (fs.existsSync(apiModelPath)) {
    fillableFields = parsePHPFile(apiModelPath);
  } else if (fs.existsSync(apiFieldsPath)) {
    fillableFields = parseApiFieldsFile(apiFieldsPath, moduleName);
  } else {
    console.log(
      chalk.red(
        `API model for ${moduleName} does not exist and api_fields.txt not found.`
      )
    );
    return;
  }

  fs.mkdirSync(moduleDir, { recursive: true });

  const mainFilePath = path.join(moduleDir, `${moduleName}.tsx`);

  if (crud) {
    createFile(mainFilePath, getCrudTemplate(moduleName, fillableFields));
  } else {
    createFile(mainFilePath, getMainFileTemplate(moduleName));
  }

  const stylesFilePath = path.join(moduleDir, moduleName + ".module.css");
  createFile(stylesFilePath, getStylesFileTemplate());

  createFile(pageFilePath, getPageFileTemplate(moduleName));

  console.log(chalk.green(`Module ${moduleName} created successfully.`));
};

let moduleName = process.argv[2] || "";
const crud = process.argv[3] === "crud";
// si moduleName tiene una coma la palabra que este despues de la coma, que sea el modelName, sino modelname que sea el mismo que moduleName, pero sin la ultima letra
let modelName = (moduleName + ",").split(",")[1] || moduleName.slice(0, -1);
moduleName = moduleName.split(",")[0];

if (!moduleName) {
  console.log(chalk.red("Please provide a module name."));
  process.exit(1);
}

const capitalizedModuleName =
  moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
createModule(capitalizedModuleName, crud, modelName);
