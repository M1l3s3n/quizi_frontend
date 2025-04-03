import axios from "axios";
import { get_user_id, save_user_id } from "./cache";

const base_url = "http://localhost:8000/usr";

class Auth_Service {
  async handle_login(username, password) {
    const payload = {
      username: username,
      password: password,
    };
    const response = await axios.post(base_url + "/login", payload);
    if (response.status === 200) {
      const user_id = response.data.user_id;
      save_user_id(user_id);
      return { message: "Login successful", data: response.data };
    } else {
      return null;
    }
  }

  async handle_signup(username, password) {
    const payload = {
      username: username,
      password: password,
    };

    const response = await axios.post(base_url + "/signup", payload);
    if (response.status === 200) {
      const user_id = response.data.user_id;
      save_user_id(user_id);
      return { message: "Signup successful", data: response.data };
    } else {
      return null;
    }
  }
}

const authService = new Auth_Service();

export default authService;
