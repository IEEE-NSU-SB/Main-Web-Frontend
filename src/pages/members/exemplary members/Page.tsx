import { useFetchDataAPI } from "@/hooks/fetchdata";
import Members from "./members";
import Wave from "@/components/Wave";

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
  const { data, loading } = useFetchDataAPI<Member[]>({ apiUrl: `main_website/get_exemplary_members/` });
  if (loading)
    return<>
            <Wave title="Loading.." />
            <div className="flex justify-center items-center min-h-[500px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading exemplary members...</p>
              </div>
            </div>
          </>
  return <Members members={data || []} />;
}
