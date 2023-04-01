import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import NavBarButton from "./NavBarButton";
import styles from "./NavBar.module.css";
import Image from "next/image";
import { Button } from "@mui/joy";

export default function Navbar() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
  };

  return (
    <nav className={`navbar ${styles.navbar}`}>
      <a href={"./"} className={`=${styles.navlink} navbar-image`}>
        <Image
          src={"/images/jasmin.png"}
          alt={"logo of the jasmin language"}
          width={25}
          height={25}
          className={`navbar-image`}
        />
      </a>
      {[
        {
          label: "private space",
          link: "./private-space",
        },
        {
          label: "about",
          link: "./about",
        },
      ].map((x, i) => (
        <NavBarButton key={i} label={x.label} link={x.link}></NavBarButton>
      ))}

      {session ? (
        <Button sx={{ mt: 1 }} onClick={handleLogOut}>
          Log out
        </Button>
      ) : null}
    </nav>
  );
}
