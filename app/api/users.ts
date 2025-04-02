// export const saveUserToLocalStorage = (user: { name: string; email: string; phone: string }) => {
//     let users = JSON.parse(localStorage.getItem("users") || "[]");
//     users.push(user);
//     localStorage.setItem("users", JSON.stringify(users));
//   };
  
  export const getUsersFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };
  

  export const saveUserToLocalStorage = async (user: { name: string; email: string; phone: string }) => {
    return new Promise<void>((resolve) => {
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      resolve(); // Ensure it's async by resolving a Promise
    });
  };
  