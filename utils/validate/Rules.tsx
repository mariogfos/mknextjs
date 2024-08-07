import { validators as loadedValidators } from "@/components/validators";
export type ActionType = "add" | "edit" | "del" | "view" | "export";

export type ValidFunctionType = (
  value: any,
  param: string[],
  field?: Record<string, any> | null
) => string;

export type RulesColumnsType = {
  label: string;
  required?: boolean;
  rules?: string[];
  actions?: ActionType[];
};

export type RulesFieldsType = {
  [key: string]: {
    label?: string;
    required?: boolean;
    rules?: string[];
    api?: string;
  };
};

export const validRule = (
  value: any = "",
  _rule: string = "",
  formState: Record<string, any> = {},
  key?: string
) => {
  if (!_rule) return "";
  const [rule, params] = (_rule + ":").split(":");
  const param = params ? params.split(",") : [];

  const validations: Record<string, () => string> = {
    requiredIf: () => {
      if (param[1] !== formState[param[0]]) return "";
      if (value === 0) return "";
      return !value ? "Este campo es requerido" : "";
    },
    required: () => {
      if (value === 0) return "";
      return !value ? "Este campo es requerido" : "";
    },
    requiredFile: () => {
      return !value?.file ? "Este campo es requerido" : "";
    },
    requiredFileIf: () => {
      if (param[1] !== formState[param[0]]) return "";
      if (value === 0) return "";
      return !value?.file ? "Este campo es requerido" : "";
    },
    same: () => (value !== formState[param[0]] ? "Tienen que ser iguales" : ""),
    min: () => (value?.length < param[0] ? `min ${param[0]} caracteres` : ""),
    max: () => (value?.length > param[0] ? `max ${param[0]} caracteres` : ""),
    email: () => (!/\S+@\S+\.\S+/.test(value) ? "No es un email valido" : ""),
    alpha: () => (!/^[a-zA-Z]+$/.test(value) ? "No es un texto valido" : ""),
    noSpaces: () => (!/^\S+$/.test(value) ? "No debe tener espacios" : ""),
    number: () => {
      // console.error("number", value, /^[0-9.,-]+$/.test(value));
      if (value === "" || value === null) return "";
      return !/^[0-9.,-]+$/.test(value) ? "No es un numero valido" : "";
    },
    integer: () =>
      !/^[0-9]+$/.test(value) ? "No es un numero entero valido" : "",
    positive: () => (value < 0 ? "Debe ser número positivo " : ""),
    greater: () => (value <= param[0] ? `Debe ser mayor que ${param[0]}` : ""),
    less: () => (value >= param[0] ? `Debe ser menor que ${param[0]}` : ""),
    between: () =>
      Number(value) < Number(param[0]) || Number(value) > Number(param[1])
        ? `Debe estar entre ${param[0]} y ${param[1]}`
        : "",
    ...Object.keys(loadedValidators).reduce((acc, key) => {
      acc[key] = () =>
        loadedValidators[key as keyof typeof loadedValidators](
          value,
          param,
          formState
        );
      return acc;
    }, {} as Record<string, ValidFunctionType>),
  };

  return validations[rule]?.() || "";
};

export const checkRulesFields = (
  fields: RulesFieldsType = {},
  data: Record<string, any> = {},
  action: ActionType = "add"
) => {
  let errors: Record<string, string> = {};

  for (const key in fields) {
    // if (!fields[key].rules || error != "" || (rule !== "required" && !value)) return;

    if (!fields[key].rules) continue;

    const value = data[key] || "";
    (fields[key].rules || []).forEach((rule) => {
      const [ruleName, ruleActions] = rule.split("*");

      if (!ruleName || (ruleActions && !ruleActions.includes(action[0])))
        return;

      const error = validRule(data[key], ruleName, data, key);
      if (error) errors[key] = error;
    });
  }

  return errors;
};

type CheckRulesType = {
  value: any;
  rules: string[];
  errors?: Record<string, string> | null;
  key?: string | null;
  data?: Record<string, any>;
};
export const checkRules = ({
  value = "",
  rules = [],
  errors = null,
  key = null,
  data = {},
}: CheckRulesType): string | Record<string, string> | null => {
  let error: string = "";
  if (!rules || rules.length == 0) return errors || error;
  rules.forEach((rule) => {
    if (!rule || error != "" || (rule !== "required" && !value)) return;
    error = validRule(value, rule, data);
  });
  return errors
    ? error
      ? { ...errors, [key || "error"]: error }
      : errors
    : error;
};

export const getParamFields = (
  data: Record<string, any> = {},
  fields: RulesFieldsType = {},
  action: ActionType = "add"
) => {
  return Object.entries(fields).reduce((param: any, [key, el]) => {
    const apiIndex: number = (el.api + "").indexOf(action.charAt(0));
    if (apiIndex === -1) {
      return param;
    }

    const hasAsterisk = (el.api + "").charAt(apiIndex + 1) === "*";
    const isEmptyValue = !data[key] || (data[key] + "").trim() === "";

    if (hasAsterisk && isEmptyValue) {
      return param;
    }

    param[key] = data[key];
    return param;
  }, {});
};

export const hasErrors = (errors: Record<string, string>) => {
  return Object.keys(errors).length > 0;
};
