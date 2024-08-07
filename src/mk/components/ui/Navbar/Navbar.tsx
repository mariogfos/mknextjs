import { useRouter } from "next/router";
import styles from "./styles.module.css";
import {
  IconArrowDown,
  IconArrowLeft,
  IconMenu,
  IconNotification,
  IconSetting,
} from "@/components/layout/icons/IconsBiblioteca";
import { Avatar } from "../Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { useAuth } from "@/mk/contexts/AuthProvider";
import Dropdown from "../Dropdown/Dropdown";
import Sidebar from "../Sidebar/Sidebar";
import MainMenu from "../MainMenu/Mainmenu";
import { useState } from "react";
import useScreenSize from "@/mk/hooks/useScreenSize";

const Navbar = ({
  client,
  user,
  setOpen,
  setOpenSupport,
  setOpenModal,
}: any) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const { logout } = useAuth();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { store } = useAuth();
  const { isDesktop, isTablet } = useScreenSize();

  const handleLogout = () => {
    logout();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <header className={styles.navbar}>
      <div>
        {isHome ? (
          <>
            <IconMenu onClick={() => setSideBarOpen(!sideBarOpen)} size={24} />
            <Sidebar
              open={sideBarOpen}
              onClose={setSideBarOpen}
              iconClose={false}
            >
              <MainMenu client={client} user={user} />
            </Sidebar>
          </>
        ) : (
          <IconArrowLeft onClick={handleBack} size={24} />
        )}
      </div>
      {isHome ? (
        <>
          {isDesktop ? (
            <head>{store?.title}</head>
          ) : (
            <head>
              <Avatar
                name={getFullName(user)}
                src={getUrlImages(
                  "/ADM-" + user?.id + ".png?d=" + user?.updated_at
                )}
                onClick={() => {
                  router.push("/profile");
                }}
                h={48}
                w={48}
              />
              <p>{getFullName(user)}</p>
              <p>{client?.name}</p>
            </head>
          )}
        </>
      ) : (
        <head>{store?.title}</head>
      )}
      <div>{store?.navBarRightIcon}</div>
      <span>
        <IconSetting onClick={() => router.push("/setting")} />
      </span>
      <span>
        <IconNotification onClick={() => router.push("/notifications")} />
      </span>
      <section>
        <Avatar
          name={getFullName(user)}
          src={getUrlImages("/ADM-" + user?.id + ".png?d=" + user?.updated_at)}
          onClick={() => {
            setOpenModal('profile');
          }}
          h={40}
          w={40}
        />
        <div>
          <p>{getFullName(user)}</p>
          <p>Administración</p>
        </div>
      </section>
      <a>
        <Dropdown trigger={<IconArrowDown />}>
          <p onClick={() => setOpenModal('profile')}>Mi perfil</p>
          <p onClick={handleLogout}>Cerrar sesión</p>
        </Dropdown>
      </a>
    </header>
    // <header className={styles.navbar}>
    //   {isHome && !isDesktop && (
    //     <div className={styles.containerV1}>
    //       <IconMenu
    //         onClick={() => setSideBarOpen(!sideBarOpen)}
    //         circle
    //         size={36}
    //       />
    //       <div className={styles.profile}>
    //         <Avatar
    //           name={getFullName(user)}
    //           src={getUrlImages(
    //             "/ADM-" + user?.id + ".png?d=" + user?.updated_at
    //           )}
    //           onClick={() => {
    //             router.push("/profile");
    //           }}
    //           h={48}
    //           w={48}
    //         />
    //         <p>{getFullName(user)}</p>
    //         <p>{client?.name}</p>
    //       </div>
    //       <IconNotification
    //         onClick={() => router.push("/notifications")}
    //         circle
    //         size={36}
    //         style={{
    //           cursor: "pointer",
    //         }}
    //       />
    // <Sidebar
    //   open={sideBarOpen}
    //   onClose={setSideBarOpen}
    //   iconClose={false}
    // >
    //   <MainMenu
    //     client={client}
    //     router={router}
    //     user={user}
    //     setOpenSupport={setOpenSupport}
    //     setOpen={setOpen}
    //   />
    // </Sidebar>
    //     </div>
    //   )}
    //   {!isHome && !isDesktop && (
    //     <div className={styles.containerV2}>
    //       <p className={styles.icon} onClick={(e) => router.back()}>
    //         <IconArrowLeft />
    //       </p>
    //       <div>{sectionTitle}</div>
    //     </div>
    //   )}
    //   {isDesktop && (
    //     <div className={styles.containerV3}>
    //       <div>
    //         <p>{sectionTitle}</p>
    //         {/* <p>Texto secundario de la sección</p> */}
    //       </div>
    //       <div>
    //         <IconSetting
    //           className={styles.icon}
    //           style={{
    //             cursor: "pointer",
    //           }}
    //         />
    //         <IconNotification
    //           className={styles.icon}
    //           onClick={() => router.push("/notifications")}
    //           style={{
    //             cursor: "pointer",
    //           }}
    //         />
    //         <Avatar
    //           name={getFullName(user)}
    //           src={getUrlImages(
    //             "/ADM-" + user?.id + ".png?d=" + user?.updated_at
    //           )}
    //           onClick={() => {
    //             router.push("/profile");
    //           }}
    //           h={48}
    //           w={48}
    //         />
    //         <div>
    //           <p>{getFullName(user)}</p>
    //           <p>Administración</p>
    //         </div>
    //         <div className={styles.dropdown} ref={dropdownRef}>
    //           <IconArrowDown onClick={handleDropdownToggle} />
    //           {dropdownOpen && (
    //             <div className={styles.dropdownMenu}>
    //               <p onClick={() => router.push("/profile")}>Mi perfil</p>
    //               <p onClick={handleLogout}>Cerrar sesión</p>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </header>
  );
};

export default Navbar;
