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
      <a
        href={"http://localhost:3000/#"}
        className={`=${styles.navlink} navbar-image`}
      >
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
          label: "what is Jasmin",
          link: "http://localhost:3000/what-is-jasmin",
        },
        { label: "downloads", link: "http://localhost:3000/downloads" },
        { label: "examples", link: "http://localhost:3000/examples" },
        {
          label: "about",
          link: "http://localhost:3000/about",
        },
        {
          label: "private space",
          link: "http://localhost:3000/private-space",
        },
      ].map((x, i) => (
        <NavBarButton key={i} label={x.label} link={x.link}></NavBarButton>
      ))}

      {/* TODO redesign this button*/}
      {session ? (
        <Button sx={{ mt: 1 }} onClick={handleLogOut}>
          Log out
        </Button>
      ) : null}
    </nav>
  );
}
