import Link from "next/link";
import styles from "./NavBar.module.css";

type Props = {
  label: string;
  link: string;
};

export default function NavBarButton({ label, link }: Props) {
  const redirect = () => {};

  return (
    <div>
      <a href={link} className={`badge badge-dark ${styles.navlink}`}>
        {label}
      </a>
    </div>
  );
}
