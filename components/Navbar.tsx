import NavBarButton from "./NavBarButton";
import styles from "./NavBar.module.css";

export default function Navbar() {
  return (
    <nav className={`navbar ${styles.navbar}`}>
      {[
        { label: "What is Jasmin ?", link: "http://localhost:3000/#" },
        { label: "Downloads", link: "http://localhost:3000/#" },
        { label: "Docs", link: "http://localhost:3000/#" },
        { label: "Examples", link: "http://localhost:3000/#" },
        {
          label: "About",
          link: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal",
        },
      ].map((x, i) => (
        <NavBarButton key={i} label={x.label} link={x.link}></NavBarButton>
      ))}
    </nav>
  );
}
