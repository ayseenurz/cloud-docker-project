import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Kayıt başarılı!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Giriş başarılı!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);

      toast.success("Google ile giriş başarılı!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      toast.error("Lütfen email giriniz!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      toast.success("Şifre sıfırlama maili gönderildi!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Firebase Login</h1>

      <input
        type="email"
        placeholder="Email giriniz"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Şifre giriniz"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="auth-buttons">
        <button onClick={register}>Kayıt Ol</button>

        <button onClick={login}>Giriş Yap</button>
      </div>

      <button className="google-btn" onClick={googleLogin}>
        Google ile Giriş Yap
      </button>

      <button className="reset-btn" onClick={forgotPassword}>
        Şifremi Unuttum
      </button>
    </div>
  );
}

export default Login;
