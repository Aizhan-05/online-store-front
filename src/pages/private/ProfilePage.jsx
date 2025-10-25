import { useSelector } from "react-redux";
import { rusRoles } from "../../utils/consts";
import { CgProfile } from "react-icons/cg";

export default function DashboardProfilePage() {
  const user = useSelector(state => state.user.user);

  return (
    <div className="profile">
      <h1 className="title">Мой профиль</h1>

      <div className="profile-wrapper">
        <div className="profile-part">
          <CgProfile />
        </div>
        <div className="profile-part">
          {/* <div className="profile-line">
            <span className="profile-line-key">Имя:</span>
            <p className="profile-line-value">{user.firstName}</p>
          </div>
          <div className="profile-line">
            <span className="profile-line-key">Фамилия:</span>
            <p className="profile-line-value">{user.lastName}</p>
          </div> */}
          <div className="profile-line">
            <span className="profile-line-key">E-mail:</span>
            <p className="profile-line-value">{user.email}</p>
          </div>
          <div className="profile-line">
            <span className="profile-line-key">Роль:</span>
            <p className="profile-line-value">{rusRoles[user.role]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
