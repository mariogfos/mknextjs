import {
  CSSProperties,
  Fragment,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Table.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { formatNumber } from "@/mk/utils/numbers";
import useScrollbarWidth from "@/mk/hooks/useScrollbarWidth";

export type RenderColType = {
  value: any;
  key?: number;
  row?: Record<string, any>;
  i?: number;
  extraData?: any;
};

type PropsType = {
  header?: {
    key: string;
    responsive: string;
    label: string;
    width?: string;
    className?: string;
    onRender?: Function;
    style?: any;
    sumarize?: number | boolean;
    sumDec?: number;
  }[];
  data: any;
  footer?: any;
  sumarize?: boolean;
  onRenderBody?: null | ((row: any, i: number) => any);
  onRenderHead?: null | ((item: any, row: any) => any);
  onRenderFoot?: null | ((item: any, row: any) => any);
  onRowClick?: (e: any) => void;
  onTabletRow?: (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => any;
  onButtonActions?: Function;
  actionsWidth?: string;
  style?: CSSProperties;
  className?: string;
  height?: string;
};

const Table = ({
  header = [],
  data,
  footer,
  sumarize = false,
  onRenderBody = null,
  onRenderHead = null,
  onRenderFoot = null,
  onRowClick = (e) => {},
  onTabletRow,
  onButtonActions,
  actionsWidth,
  style = {},
  className = "",
  height,
}: PropsType) => {
  const { isTablet } = useScreenSize();
  const [scrollbarWidth, setScrollbarWidth] = useState();

  return (
    <div
      className={styles.table + " " + styles[className] + " " + className}
      style={style}
    >
      {(!isTablet || !onTabletRow) && (
        <Head
          header={header}
          actionsWidth={actionsWidth}
          onRenderHead={onRenderHead}
          onButtonActions={onButtonActions}
          scrollbarWidth={scrollbarWidth}
        />
      )}
      <div style={height ? { height: height, overflowY: "auto" } : {}}>
        <Body
          onTabletRow={onTabletRow}
          onRowClick={onRowClick}
          data={data}
          header={header}
          actionsWidth={actionsWidth}
          renderBody={onRenderBody}
          onButtonActions={onButtonActions}
          height={height}
          setScrollbarWidth={setScrollbarWidth}
          onRenderBody={onRenderBody}
        />
      </div>
      {sumarize && (
        <Sumarize
          header={header}
          data={data}
          actionsWidth={actionsWidth}
          renderFoot={onRenderFoot}
          onButtonActions={onButtonActions}
          scrollbarWidth={scrollbarWidth}
        />
      )}
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

const Head = memo(function Head({
  header,
  actionsWidth,
  onRenderHead,
  onButtonActions,
  scrollbarWidth,
}: {
  header: any;
  actionsWidth: any;
  onRenderHead?: any;
  onButtonActions: any;
  scrollbarWidth?: number;
}) {
  if (onRenderHead === false) return null;
  return (
    <header style={{ width: `calc(100% - ${scrollbarWidth || 0}px)` }}>
      {header.map((item: any, index: number) => (
        <div
          key={"th" + index}
          className={styles[item.responsive] + " " + item.className}
          style={{
            ...item.style,
            ...(item.width ? { width: item.width } : {}),
          }}
          title={onRenderHead ? onRenderHead(item, index) : item.label}
        >
          {onRenderHead ? onRenderHead(item, index) : item.label}
        </div>
      ))}
      {onButtonActions && (
        <div
          className={styles.onlyDesktop}
          style={{ width: actionsWidth || "300px" }}
        >
          Acciones
        </div>
      )}
    </header>
  );
});

const Sumarize = memo(function Sumarize({
  header,
  data,
  actionsWidth = "100%",
  renderFoot = false,
  onButtonActions = false,
  scrollbarWidth,
}: {
  header: any;
  data: any;
  actionsWidth?: any;
  renderFoot?: any;
  onButtonActions?: any;
  scrollbarWidth?: number;
}) {
  // const { store } = useStore();
  const [sumas, setSumas]: any = useState({});
  const onSumarize = (item: any, row: any, i: number) => {
    if (item.sumarize) {
      setSumas((prev: any) => ({
        ...prev,
        [item.key]: (prev[item.key] || 0) + row[item.key] * 1,
      }));
    }
    return true;
  };
  useEffect(() => {
    if (!data || !header) return;
    data.map((item: any, i: number) => {
      header.map((h: any) => onSumarize(h, item, i));
    });
  }, [data]);

  return (
    <summary style={{ width: `calc(100% - ${scrollbarWidth || 0}px)` }}>
      {header.map((item: any, index: number) => (
        <div
          key={"foot" + index}
          className={styles[item.responsive] + " " + item.className}
          style={{
            ...item.style,
            ...(item.width ? { width: item.width } : {}),
          }}
        >
          {renderFoot ? (
            <span>{renderFoot(item, index)}</span>
          ) : item.sumarize ? (
            <div>{formatNumber(sumas[item.key], item.sumDec || 0)}</div>
          ) : (
            ""
          )}
        </div>
      ))}
      {onButtonActions && (
        <div
          className={styles.onlyDesktop}
          style={{ width: actionsWidth || "300px" }}
        >
          {" "}
        </div>
      )}
    </summary>
  );
});

const Body = memo(function Body({
  onTabletRow,
  onRowClick,
  data,
  header,
  actionsWidth,
  renderBody,
  onButtonActions,
  height,
  setScrollbarWidth,
  onRenderBody,
}: {
  onTabletRow: any;
  onRowClick: any;
  data: any;
  header: any;
  actionsWidth: any;
  renderBody: any;
  onButtonActions: any;
  height?: any;
  setScrollbarWidth?: Function;
  onRenderBody?: null | ((row: any, i: number) => any);
}) {
  const { isTablet } = useScreenSize();
  const divRef = useRef(null);
  const scrollWidth = useScrollbarWidth(divRef);
  useEffect(() => {
    if (setScrollbarWidth) setScrollbarWidth(scrollWidth);
  }, [scrollWidth]);
  return (
    <main
      ref={divRef}
      style={height ? { height: height, overflowY: "auto" } : {}}
    >
      {data?.map((row: Record<string, any>, index: number) => (
        <Fragment key={"r_" + index}>
          {isTablet && onTabletRow ? (
            onTabletRow(row, index, onRowClick)
          ) : onRenderBody ? (
            <div key={"row" + index} onClick={(e) => onRowClick(row)}>
              {renderBody?.(row, index + 1)}
            </div>
          ) : (
            <div key={"row" + index} onClick={(e) => onRowClick(row)}>
              {header.map((item: any, i: number) => (
                <div
                  key={item.key + i}
                  className={styles[item.responsive] + " " + item.className}
                  style={{
                    ...item.style,
                    ...(item.width
                      ? { width: item.width }
                      : { flexShrink: "1" }),
                  }}
                >
                  {item.onRender &&
                    item.onRender?.({
                      value: row[item.key],
                      key: item.key,
                      item: row,
                      i: index + 1,
                    })}
                  {!item.onRender && row[item.key]}
                </div>
              ))}
              {onButtonActions && (
                <div
                  className={styles.onlyDesktop}
                  style={{ width: actionsWidth || "300px" }}
                >
                  {onButtonActions(row)}
                </div>
              )}
            </div>
          )}
        </Fragment>
      ))}
    </main>
  );
});
export default Table;
