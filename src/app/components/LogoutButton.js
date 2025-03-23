import { IoIosLogOut } from "react-icons/io";

export default function LogoutButton({ onLogout }) {
  return (
    <p
      className="absolute top-3 right-3 text-3xl cursor-pointer"
      onClick={onLogout}
    >
      <IoIosLogOut />
    </p>
  );
}
