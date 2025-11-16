import { useFetchDataAPI } from "@/hooks/fetchdata";
import Members from "./members";

interface Member {
  member_name: string;
  former_position: string;
  activity_year: string;
  current_activity: string;
  member_picture?: string;
  facebook_account_link?: string;
  email?: string;
  achievements: string;
  rank:string;
}

export default function Exemplary() {
  const { data } = useFetchDataAPI<Member[]>({ apiUrl: `main_website/get_exemplary_members/` });

  return <Members members={data || []} />;
}
