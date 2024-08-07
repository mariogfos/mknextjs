import {
  IconAlert,
  IconCheck,
  IconX,
} from "@/components/layout/icons/IconsBiblioteca";
import { ToastType } from "@/mk/hooks/useToast";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const ToastMsg = {
  success: "¡GENIAL!",
  error: "¡ERROR!",
  warning: "¡ALERTA!",
  info: "¡INFO!",
};

const ToastIcon = {
  success: <IconCheck size={24} color="var(--cSuccess)" />,
  error: <IconX size={24} color="var(--cError)" />,
  warning: <IconAlert size={24} color="var(--cWarning)" />,
  info: <div style={{ color: "var(--cInfo)" }}>!</div>,
};
const Toast = ({
  toast,
  showToast,
}: {
  toast: ToastType;
  showToast: Function;
}) => {
  const [open1, setOpen1] = useState(false);

  const _close = () => {
    setOpen1(false);
    setTimeout(() => {
      showToast("");
    }, 700);
  };

  useEffect(() => {
    if (toast?.msg && toast?.msg != "") {
      setOpen1(true);
      if ((toast?.time || 5000) > 0) {
        setTimeout(() => {
          _close();
        }, toast?.time || 5000);
      }
    }
  }, [toast?.msg]);
  /*
  const getCal = () => {
    let fec: any = new Date();
    let f: any =
      fec.getHours() +
      "" +
      fec.getMinutes() +
      "" +
      fec.getSeconds() +
      fec.getMilliseconds();
    fec = f * 1;
    return fec + 2;
  };
*/
  const clase =
    styles.toast +
    " " +
    (open1 ? styles.open : "") +
    " " +
    (!toast?.msg || toast?.msg == "" ? "hidden " : "") +
    styles[toast?.type || "info"];

  return (
    <>
      <div className={clase} style={{ zIndex: 999999999 }}>
        <div>{ToastIcon[toast?.type || "info"]}</div>
        <div>
          <p>{ToastMsg[toast?.type || "info"]}</p>
          <div>{toast?.msg}</div>
        </div>
        <div className={styles.close} onClick={() => _close()}>
          <IconX size={14} />
        </div>
      </div>
    </>
  );
};

export default Toast;
