import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IconAlert,
  IconHome,
  IconPayments,
  IconUser,
} from "@/components/layout/icons/IconsBiblioteca";
import styles from "./styles.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";

const Footer = () => {
  const pathname = usePathname();
  const { isTablet } = useScreenSize();
  const Item = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: any;
  }) => {
    return (
      <Link className={pathname == href ? styles.active : ""} href={href}>
        {icon}
        <p>{label}</p>
      </Link>
    );
  };

  return (
    <>
      {isTablet && (
        <div className={styles.footer}>
          <Item href="/" label="Home" icon={<IconHome />} />
          <Item href="/alert" label="Alertas" icon={<IconAlert />} />
          <Item href="/payments" label="Ingresos" icon={<IconPayments />} />
          <Item href="/profile" label="Perfil" icon={<IconUser />} />
        </div>
      )}
    </>
  );
};

export default Footer;
