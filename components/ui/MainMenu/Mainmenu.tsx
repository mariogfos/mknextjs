import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "../Avatar/Avatar";
import {
  IconAlert,
  IconDepartments,
  IconFacebook,
  IconFeedBack,
  IconHistorial,
  IconHome,
  IconInstagram,
  IconLinkedin,
  IconLogout,
  IconPayments,
  IconPreRegister,
  IconTikTok,
  IconUser,
  IconYoutube,
} from "@/components/layout/icons/IconsBiblioteca";
import styles from "./styles.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { useRouter } from "next/router";

type PropsType = {
  user: any;
  client: any;
  router?: any;
  setOpenSupport?: any;
  setOpen?: any;
};

const MainMenu = ({
  user,
  client = null,
}: //router,
// setOpenSupport,
// setOpen,
PropsType) => {
  const pathname = usePathname();
  const { isTablet, isDesktop } = useScreenSize();
  const defaultImage = "default.png";
  const router = useRouter();
  const Item = ({
    href,
    label,
    icon,
    onclick,
  }: {
    href: any;
    label: string;
    icon: any;
    onclick?: any;
  }) => {
    return (
      <Link
        className={styles.item}
        onClick={onclick}
        href={href}
        style={{
          backgroundColor: pathname == href ? "#246950" : "",
          color: pathname == href ? "#FAFAFA" : "",
        }}
      >
        <p>{icon}</p>
        <p>{label}</p>
      </Link>
    );
  };

  return (
    <div className={styles.mainMenu}>
      {isDesktop && (
        <div className={styles.profileDesktop}>
          <div className={styles.profileAvatarDesktop}>
            <img
              alt="client"
              src={getUrlImages(
                `/CLIENT-${user?.client_id}.png?d=${
                  client?.update_at
                }&t=${Date.now()}`
              )}
              onError={(e) => (e.currentTarget.src = defaultImage)}
            />
          </div>
          <div className={styles.profileContentDesktop}>
            <p>Estás en</p>
            <p>{client?.name}</p>
          </div>
        </div>
      )}
      {isTablet && (
        <div className={styles.profileTablet}>
          <Avatar
            name={getFullName(user)}
            src={getUrlImages(
              "/ADM-" + user?.id + ".png?d=" + user?.updated_at
            )}
            onClick={() => {
              router.push("/profile");
            }}
            h={64}
            w={64}
          />
          <div className={styles.profileContentTablet}>
            <p>{getFullName(user)}</p>
            <p>Estás en</p>
            <p>{client?.name}</p>
          </div>
        </div>
      )}
      <div className={styles.items}>
        <Item href="/" label="Inicio" icon={<IconHome />} />
        <Item href="/roles" label="Roles" icon={<IconAlert />} />
        <Item href="/activities" label="Actividades" icon={<IconHistorial />} />
        {user?.clients?.length > 1 && (
          <Item
            href={"#"}
            label="Cambio de condominio"
            icon={<IconDepartments />}
            // onclick={() => setOpen(true)}
          />
        )}
      </div>
      <div className={styles.itemsBottom}>
        <Item
          href="#"
          label="Soporte y atención al cliente"
          icon={<IconFeedBack />}
          // onclick={() => setOpenSupport(true)}
        />
      </div>
    </div>
  );
};

export default MainMenu;
