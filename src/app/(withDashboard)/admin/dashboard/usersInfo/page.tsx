import UserTable from "@/components/modules/user/userTable/UserTable";
import { getAllUsersByAdmin } from "@/services/user";

const UsersInfo = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllUsersByAdmin(page);
  console.log(data, meta);

  return (
    <div>
      <UserTable users={data} meta={meta} />
    </div>
  );
};

export default UsersInfo;
