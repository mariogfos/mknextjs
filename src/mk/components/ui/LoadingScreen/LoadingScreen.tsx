import { useContext } from "react";
import { AxiosContext } from "@/mk/contexts/AxiosInstanceProvider";
import SkeletonAdapterComponent, { SkeletonType } from "./SkeletonAdapter";
import styles from "./styles.module.css";

interface PropsType {
  type?: SkeletonType;
  className?: string;
  children?: any;
}

const LoadingScreen = ({
  type = "CardSkeleton",
  className,
  children = null,
}: PropsType) => {
  const isSkeleton = !!type;
  const { waiting }: any = useContext(AxiosContext);
  if (waiting == 0) return children;
  if (isSkeleton) return <SkeletonAdapterComponent type={type} />;
  return (
    <div className={styles.loadingScreen + " " + className}>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
