const get_user_id = () => {
  const user_id = sessionStorage.getItem("user_id");
  if (!user_id) {
    throw new Error("No user_id in session storage");
  }
  return user_id;
};

const save_user_id = (user_id) => {
  try {
    sessionStorage.setItem("user_id", user_id);
  } catch (e) {
    throw new Error("Cannot put user_id");
  }
};

export { get_user_id, save_user_id };
