import AllMessages from "@/components/modules/message/AllMessage";
import { getAllMessageByAdmin } from "@/services/message";

const AdminMessage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllMessageByAdmin(page);
  console.log(data, meta);
  return (
    <div>
      <AllMessages res={data} meta={meta} />
    </div>
  );
};

export default AdminMessage;
