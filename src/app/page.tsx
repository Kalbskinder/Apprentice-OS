import Image from "next/image";
import styles from "./page.module.css";
import BootScreen from "./components/BootScreen/BootScreen";

// TODO: Add global state management with localStorage

export default function Home() {
  return (
    <BootScreen />
  );
}
