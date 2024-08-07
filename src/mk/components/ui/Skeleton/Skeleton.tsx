import styles from "./styles.module.css";
const CardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton}>
      <div>
        <div />
        <div />
      </div>
      <div>
        <div />
      </div>
    </div>
  );
};
export default CardSkeleton;

// export function RevenueChartSkeleton() {
//   return (
//     <div
//       className={styles.revenueChartSkeleton}
//     >
//       <div />
//       <div >
//         <div/>
//         <div>
//           <div/>
//           <div/>
//         </div>
//       </div>
//     </div>
//   );
// }

export function RowSkeleton() {
  return (
    <div className={styles.rowSkeleton}>
      <div>
        <div />
        <div>
          <div />
          <div />
        </div>
      </div>
      <div />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <>
      <div className={styles.tableSkeleton}>
        <div>
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </div>
      </div>
    </>
  );
}
