import axios from "axios";
import { get_user_id, save_user_id } from "./cache";

const base_url = "http://localhost:8000/usr";

class Auth_Service {
  async handle_login(username, password) {
    const payload = { username, password };

    try {
      const response = await axios.post(base_url + "/login", payload);
      const user_id = response.data["user_SID"];

      if (!user_id) {
        throw new Error("User ID is undefined");
      }

      save_user_id(user_id);

      return { message: "Login successful", data: response.data };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          alert(`Unauthorized: ${data.detail || "Wrong password"}`);
        } else if (status === 404) {
          alert(`Not found: ${data.detail || "No user found"}`);
        } else {
          alert(`Error ${status}: ${data.detail || "An error occurred"}`);
        }
      } else {
        alert(`Unexpected error: ${error.message}`);
      }
    }
  }

  async handle_signup(username, password) {
    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(base_url + "/signup", payload);
      if (response.status === 200) {
        const user_id = response.data.user_SID;
        save_user_id(user_id);
        return { message: "Signup successful", data: response.data };
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        console.log(`Error ${status}:`, data);

        if (status === 400) {
          alert(data.message || "Invalid credentials");
        } else {
          alert(`Error ${status}: ${data.detail || "An error occurred"}`);
        }
      } else {
        alert(`Unexpected error: ${error.message}`);
      }
    }
  }

  async get_user_info(user_SID = null) {
    try {
      const user_id = user_SID || get_user_id(); // Використовуємо переданий user_SID або поточного користувача
      const response = await axios.post(base_url + "/get_user_info", {
        user_SID: user_id,
      });

      if (response.status === 200) {
        console.log("User info retrieved:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("User not found.");
          return { success: false, message: "User not found." };
        }
        console.error("An unexpected error occurred.");
        return { success: false, message: "An error occurred." };
      } else {
        console.error("Error fetching user info:", error);
        return { success: false, message: "Network error." };
      }
    }
  }
}

const authService = new Auth_Service();

export default authService;
