import {
  IconArrowLeft,
  IconArrowRight,
} from "@/components/layout/icons/IconsBiblioteca";
import { useMemo } from "react";
import styles from "./styles.module.css";

type PropsType = {
  className?: string;
  currentPage: number;
  nextLabel?: string;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  totalPages: number;
  total?: number | null;
};


const Pagination = ({
  className = "",
  currentPage = 1,
  nextLabel = "Siguiente",
  onPageChange = (page: number) => {},
  previousLabel = "Anterior",
  totalPages,
  total = null,
}: PropsType) => {
  const { firstPage, lastPage, goToNextPage, goToPreviousPage, range } =
    useMemo(() => {
      const firstPage = totalPages > 1 ? Math.max(1, currentPage - 3) : 1;
      const lastPage =
        totalPages > 1 ? Math.min(currentPage + 3, totalPages) : 1;

      const goToNextPage = (): void => {
        onPageChange(Math.min(currentPage + 1, totalPages));
      };

      const goToPreviousPage = (): void => {
        onPageChange(Math.max(currentPage - 1, 1));
      };
      const range = (start: number, end: number): number[] => {
        if (start >= end) {
          return [];
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      };
      return { firstPage, lastPage, goToNextPage, goToPreviousPage, range };
    }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination + " " + className}>
      <span>
        <IconArrowLeft onClick={goToPreviousPage} />
      </span>
      {range(firstPage, lastPage).map((page: number) => (
        <div
          key={page}
          onClick={() => onPageChange(page)}
          className={page == currentPage ? styles["active"] : ""}
        >
          {page}
        </div>
      ))}
      <span>
        <IconArrowRight onClick={goToNextPage} />
      </span>
      {total && <p> Total items: {total}</p>}
    </div>
  );
};

export default Pagination;
