
/////////////////////////////////////////////////////////// AUTH JS   
      IF @user_service.get("/user_info/{user_id}") IS ACTIVE ON BACKEND  (LOOK IN VIEWS.PY OR CONTACT DANIEL_KAISER)

  async get_user_info() {
    try {
      const user_id = get_user_id();
      const response = await axios.get(`${base_url}/user_info/${user_id}`);

      if (response.status === 200) {

        console.log("User info retrieved:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert('User not found.');
          return { success: false, message: 'User not found.' };
        }
        alert('An unexpected error occurred.');
        return { success: false, message: 'An error occurred.' };
      } else {
        console.error("Error fetching user info:", error);
        return { success: false, message: 'Network error.' };
      }
    }
  }


       IF @user_service.post("/get_user_info") IS ACTIVE ON BACKEND  (LOOK IN VIEWS.PY OR CONTACT DANIEL_KAISER)

  async get_user_info() {
      try {
      const user_id = get_user_id();
      //console.log('User ID:', user_id);

      const response = await axios.post(base_url + "/get_user_info", { user_SID: user_id, });

      if (response.status === 200) {

        console.log("User info retrieved:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {

          alert('User not found.');
          return { success: false, message: 'User not found.' };
        }
        alert('An unexpected error occurred.');
        return { success: false, message: 'An error occurred.' };

      } else {
        console.error("Error fetching user info:", error);
        return { success: false, message: 'Network error.' };
      }
    }
  }



////////////////////////////////// HOME JS

import authService from "../../services/auth";


  const Home = () => {

 *PLACE THE NEXT CODE SNIPPET AFTER CONST HOME ABOVE*

const [curUsername, setCurUsername] = useState("");
const set_username = async () => {
    try {

        const response = await authService.get_user_info();
        if (response.success) {

            setCurUsername(response.data.username);
        }
    } catch (error) {
        console.error("error:", error);
    }
};

 *PLACE THE FOLLOWING CODE SNIPPET BEFORE THE RETURN(WITH PAGE HTML)*

    useEffect(() => {
    const fetchUsername = async () => {
        await set_username();
    };

    fetchUsername();
}, []);

 return(


             NOW U CAN USE    {curUsername}    INSTEAD OF NICKNAME TEXT
              EXAMPLE:            <div>{curUsername}</div>

