import { type JwtPayload, jwtDecode } from "jwt-decode";

// interface UserToken {
//   name: string;
//   exp: number;
// }

interface UserToken extends JwtPayload {
  data: {
    username: string;
    email: string;
    id: string;
  };
}

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken() || "");
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem('user', JSON.stringify(jwtDecode<UserToken>(idToken).data));
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem('user');
    window.location.assign("/");
  }
}

export default new AuthService();
