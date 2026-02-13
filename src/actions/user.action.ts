import userService from "@/services/user.service";

 

export async function getCurrentUser() {
  return await userService.getCurrentUser();
}


export async function getAllUsers() {
  return await userService.getAllUsers();
}
