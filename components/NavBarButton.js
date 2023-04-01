import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBarButton({ label, link }) {
  const redirect = () => {};

  return (
    <div>
      <Link href={link} className={`badge badge-dark ${styles.navlink}`}>
        {label}
      </Link>
    </div>
  );
}
