import styles from "./styles.module.css";
type PropsType = {
  sel: string;
  tabs: { value: string; text: string; numero?: Number }[];
  setSel: Function;
  variant?: string;
};
const TabsButtons = ({ sel, tabs, setSel, variant = "" }: PropsType) => {
  return (
    <div className={styles.tabs + " " + styles[variant]}>
      {tabs.map((tab: any) => (
        <button
          key={tab.value}
          onClick={() => setSel(tab.value)}
          className={sel == tab.value ? styles["selected"] : ""}
        >
          {tab.text}
          {tab.numero > 0 && <span>{tab.numero}</span>}
        </button>
      ))}
    </div>
  );
};

export default TabsButtons;
