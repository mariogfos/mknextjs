export const MONTHS = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
export const MONTHS_S = [
  "",
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function getFormattedDate() {
  const date = new Date();
  const dayName = DAYS[date.getDay()];
  const day = date.getDate();
  const month = MONTHS[date.getMonth() + 1];
  const year = date.getFullYear();

  return `${dayName}, ${day} de ${month} del ${year}`;
}

export const getDateStr = (dateStr: string | null): string =>
  (dateStr + "T").split("T")[0];
export const getUTCNow = (dias = 0) => {
  let d = new Date();
  if (dias != 0) d.setDate(d.getDate() + dias);
  // return d.toISOString();
  return d.toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ");
};

export const esFormatoISO8601 = (cadena: string | null) => {
  if (!cadena || cadena == "") return false;
  const regexISO8601 =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?Z?$/;
  return regexISO8601.test(cadena);
};

export const convertirFechaUTCaLocal = (fechaUTCString: string | null) => {
  if (!fechaUTCString || fechaUTCString == "") return null;
  const fechaUTC = new Date(fechaUTCString);
  // console.log("fechaUTC", fechaUTC, fechaUTC.getTimezoneOffset());

  const offsetUTC = fechaUTC.getTimezoneOffset();
  const fechaLocal = new Date(fechaUTC.getTime() - offsetUTC * 60000);
  // console.log("fechaLocal", fechaLocal);
  // if (process.env.NODE_ENV == "development")
  if (offsetUTC == 0) fechaLocal.setHours(fechaLocal.getHours() - 4);
  return fechaLocal;
};

export const getDateTimeStrMes = (
  dateStr: string | null = "",
  dateStrBase: string | null = "",
  utc: boolean = false,
  utcBase: boolean = false
): string => {
  if (!dateStr || dateStr == "") return "";
  if (esFormatoISO8601(dateStr) || utc) {
    const fechaLocal: any = convertirFechaUTCaLocal(dateStr);
    dateStr = fechaLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "-")
      .replace("T", " ");
  }

  const datetime: any = dateStr?.split(" ");
  const date = datetime[0].split("-");
  const time = (datetime[1] + "").substr(0, 5);
  // if(onlyHour)return `${time}`
  // if (dateStrBase != "") {
  //   if (esFormatoISO8601(dateStrBase)) {
  //     const fechaLocal: any = convertirFechaUTCaLocal(dateStrBase);
  //     dateStrBase = fechaLocal
  //       ?.toISOString()
  //       .slice(0, 19)
  //       .replace(/-/g, "-")
  //       .replace("T", " ");
  //   }
  //   dateStrBase = dateStrBase?.replace("T", " ");
  //   dateStrBase = dateStrBase?.replace("/", "-");
  //   const datetimeBase = dateStrBase?.split(" ");
  //   if (datetimeBase[0] == datetime[0]) return time;
  // }
  // return `${time} del  ${date[2]} de ${MONTHS[parseInt(date[1])]}`;
  return `${date[2]} de ${MONTHS[parseInt(date[1])]} del ${date[0]}, ${time}`;
};

export const getDateStrMes = (
  dateStr: string | null = "",
  utc: boolean = false
): string => {
  if (!dateStr || dateStr == "") return "";
  if (esFormatoISO8601(dateStr) || utc) {
    const fechaLocal: any = convertirFechaUTCaLocal(dateStr);
    dateStr = fechaLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "-")
      .replace("T", " ");
  }
  // if (
  //   getDateStr(dateStr).substring(0, 10) ==
  //   getDateStr(getUTCNow().substring(0, 10))
  // )
  //   return "Hoy";
  // if (
  //   getDateStr(dateStr).substring(0, 10) ==
  //   getDateStr(getUTCNow(-1)).substring(0, 10)
  // )
  //   return "Ayer";

  dateStr = (dateStr + "").replace("T", " ");
  dateStr = dateStr.replace("/", "-");
  const datetime = dateStr.split(" ");
  const date = datetime[0].split("-");
  let year = ` del ${date[0]}`;
  // let year = "";
  // if (date[0] != getUTCNow().substring(0, 4)) {
  //   year = ` del ${date[0]}`;
  // }
  return `${date[2]} de ${MONTHS[parseInt(date[1])]}${year}`;
};
export const getDateTimeStrMesShort = (
  dateStr: string | null = "",
  utc: boolean = false
): string => {
  if (!dateStr || dateStr == "") return "";
  if (esFormatoISO8601(dateStr) || utc) {
    const fechaLocal: any = convertirFechaUTCaLocal(dateStr);
    dateStr = fechaLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "-")
      .replace("T", " ");
  }

  const datetime: any = dateStr?.split(" ");
  const date = datetime[0].split("-");
  const time = (datetime[1] + "").substr(0, 5);

  return `${date[2]} ${MONTHS_S[parseInt(date[1])]} ${date[0]}, ${time}`;
};

export const getNow = (): string => {
  const fec: any = convertirFechaUTCaLocal(new Date().toISOString());
  return fec.toISOString().substring(0, 10);
  // return new Date().toISOString().substring(0, 10);
};

export const getDateDesdeHasta = (date: any) => {
  const fechaActual = new Date();

  // obtener fecha de inicio del mes actual y fecha de fin del mes actual
  const primerDia = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    1
  );
  const ultimoDia = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth() + 1,
    0
  );

  if (date === "m") {
    // return `${primerDia.getDate()}/${
    //   primerDia.getMonth() + 1
    // }/${primerDia.getFullYear()} al ${ultimoDia.getDate()}/${
    //   ultimoDia.getMonth() + 1
    // }/${ultimoDia.getFullYear()}`;
  }

  if (date === "lm") {
    const mesActual = fechaActual.getMonth();
    const primerDia = new Date(fechaActual.getFullYear(), mesActual - 1, 1);
    const ultimoDia = new Date(fechaActual.getFullYear(), mesActual, 0);

    // return `${primerDia.getDate()}/${
    //   primerDia.getMonth() + 1
    // }/${primerDia.getFullYear()} al ${ultimoDia.getDate()}/${
    //   ultimoDia.getMonth() + 1
    // }/${ultimoDia.getFullYear()}`;
  }

  if (date === "y") {
    const primerDia = new Date(fechaActual.getFullYear(), 0, 1);
    const ultimoDia = new Date(fechaActual.getFullYear(), 11, 31);
    // return `${primerDia.getDate()}/${
    //   primerDia.getMonth() + 1
    // }/${primerDia.getFullYear()} al ${ultimoDia.getDate()}/${
    //   ultimoDia.getMonth() + 1
    // }/${ultimoDia.getFullYear()}`;
  }

  if (date === "ly") {
    const añoAnterior = fechaActual.getFullYear() - 1;
    const primerDia = new Date(añoAnterior, 0, 1);
    const ultimoDia = new Date(añoAnterior, 11, 31);
    // return `${primerDia.getDate()}/${
    //   primerDia.getMonth() + 1
    // }/${primerDia.getFullYear()} al ${ultimoDia.getDate()}/${
    //   ultimoDia.getMonth() + 1
    // }/${ultimoDia.getFullYear()}`;
  }
  return (
    getDateStrMes(
      primerDia.getFullYear() +
        "-" +
        (primerDia.getMonth() + 1) +
        "-" +
        primerDia.getDate()
    ) +
    " al " +
    getDateStrMes(
      ultimoDia.getFullYear() +
        "-" +
        (ultimoDia.getMonth() + 1) +
        "-" +
        ultimoDia.getDate()
    )
  );
  // return "Fecha no válida";
};

export const formatNumberCustom = (number: any) => {
  if (number == null) {
    return "";
  }
  if (number < 1000) {
    return number.toString();
  }
  return number.toLocaleString("de-DE");
};
