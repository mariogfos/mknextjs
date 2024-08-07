import React from "react";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "../Avatar/Avatar";
import HeadTitle from "../HeadTitle/HeadTitle";
import { IconArrowDown, IconMenu, IconNotification } from "@/components/layout/icons/IconsBiblioteca";
import styles from "./styles.module.css";

type PropsType = {
  isTablet: boolean;
  user: any;
  path: string;
  router: any;
  client: any;
  setOpenSlider: Function;
  openSlider: boolean;
  title: string;
};

const Head = ({
  isTablet,
  user,
  path,
  router,
  client,
  setOpenSlider,
  openSlider,
  title,
}: PropsType) => {
  const Title = () => {
    return (
      <div className="layout-title">
        <Avatar
          name={getFullName(user)}
          src={getUrlImages("/ADM-" + user?.id + ".png?d=" + user?.updated_at)}
          onClick={() => {
            router.push("/profile");
          }}
        />

        <p>{getFullName(user)}</p>
        <p>{client?.name}</p>
      </div>
    );
  };
  if (isTablet)
    return (
      <HeadTitle
        title={title}
        customTitle={path == "/" ? <Title /> : undefined}
        left={
          path == "/" ? (
            <IconMenu
              onClick={() => setOpenSlider(!openSlider)}
              circle
              size={32}
            />
          ) : null
        }
        right={path == "/" ? <IconNotification circle size={32} /> : null}
      />
    );
  return (
    <div className={styles.headerDesktop}>
      <div>
        <div>
          ¡Hola {user?.name} {user.middle_name}!
        </div>
        <span>
          Es un gusto tenerte de nuevo con nosotros, te deseamos una excelente
          jornada laboral
        </span>
      </div>
      <div>
        <IconNotification circle size={50} />
      </div>
      <div>
        <span>{getFullName(user)}</span>
        <span>
          <Avatar
            name={getFullName(user)}
            src={getUrlImages(
              "/ADM-" + user?.id + ".png?d=" + user?.updated_at
            )}
            onClick={() => {
              router.push("/profile");
            }}
            w={50}
            h={50}
          />
        </span>
        <span>
          <IconArrowDown />
          {/* <ul>
            <li>
              <Link href={"/perfil"}>Ver perfil</Link>
            </li>
            <li>
              <Link href={"/selcliente"}>Cambiar condominio</Link>
            </li>
            <li>
              <Link href={"/logout"}>Cerrar sesión</Link>
            </li>
          </ul> */}
        </span>
      </div>
    </div>
  );
};

export default Head;
