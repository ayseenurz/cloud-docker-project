import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);

      toast.info("Çıkış yapıldı!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container dashboard-card">
      <div className="dashboard-content">
        <p className="dashboard-subtitle">
          FIREBASE AUTHENTICATION SYSTEM
        </p>

        <h1 className="dashboard-title">
          Hoş Geldin 👋
        </h1>

        <div className="email-card">
          <span>Giriş yapılan hesap</span>

          <h3>{auth.currentUser?.email}</h3>
        </div>

        <p className="dashboard-text">
          Firebase Authentication sistemi ile
          güvenli giriş başarıyla tamamlandı.
        </p>

        <button className="logout-btn" onClick={logout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

export default Dashboard;