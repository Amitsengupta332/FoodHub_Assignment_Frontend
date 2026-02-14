import { getAllUsers } from "@/actions/user.action";
import UsersTable from "@/components/modules/dashboard/usertable";

export default async function UserPage() {
  const users = await getAllUsers();

  return (
    <div>
      <UsersTable users={users.data}></UsersTable>
    </div>
  );
}
