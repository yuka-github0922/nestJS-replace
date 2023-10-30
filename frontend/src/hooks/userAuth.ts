import { useEffect, useState } from "react";
import { Payload } from "../types/payload";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{
    checked: boolean;
    isAuthenticated: boolean;
  }>({checked: false, isAuthenticated: false});

  // 読み込まれた際に一度だけ実行したい
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      if (token) {
        const decordedToken = jwtDecode<Payload>(token);
        if (decordedToken.exp * 1000 < Date.now()) { // 有効期限のチェック
          // 有効期限切れの場合
          localStorage.removeItem("token");
          setAuthInfo({checked: true, isAuthenticated: false});
        } else {
          setAuthInfo({checked: true, isAuthenticated: true});
        }
      } else {
        // token存在しない場合
        setAuthInfo({checked: true, isAuthenticated: false});
      }
    } catch (err) {
      console.log(err)
      setAuthInfo({checked: true, isAuthenticated: false});
    }
  }, []);
  return authInfo;
};
