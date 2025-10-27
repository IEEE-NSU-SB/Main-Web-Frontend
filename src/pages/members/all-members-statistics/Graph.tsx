import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/skeeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface RecruitmentData {
  semester: string;
  recruits: number;
}

interface GenderData {
  gender: string;
  count: number;
}

interface GraphJSON {
  recruitment: RecruitmentData[];
  genderDistribution: GenderData[];
}

const Graphs = () => {
  const { loading, data, error, refetch } = useFetchDataAPI<GraphJSON>({
    apiUrl: "main_website/get_all_members_stats/",
  });

  return (
    <FadeIn>
      <section className="max-w-[1080px] mx-auto py-6 pb-16 px-5 sm:px-12 lg:px-5">
        <p className="text-center text-ieee-black-50 mb-8 text-sm sm:text-base">
          Based on IEEE NSU SB Portal Data since 2023
        </p>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <ErrorMessage message="Failed to load statistics" onRetry={refetch} />
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recruitment Line Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="120%">
                <LineChart
                  data={data.recruitment}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis
                    dataKey="semester"
                    tick={{ fill: "#333", fontSize: 12, textAnchor: "end" }}
                    interval={0} // ensures all labels are shown
                    height={60} // extra space for rotated labels
                  />
                  <YAxis tick={{ fill: "#333" }} domain={[0, "dataMax + 20"]} />
                  <Tooltip
                    cursor={{ stroke: "rgba(0,40,85,0.2)" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="recruits"
                    name="Total Recruits"
                    stroke="#00629B"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#00629b" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gender Distribution Histogram */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="120%">
                <BarChart
                  data={data.genderDistribution}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="genderGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#002855" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#00629B"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="gender" tick={{ fill: "#333" }} />
                  <YAxis tick={{ fill: "#333" }} domain={[0, "dataMax + 50"]} />
                  <Tooltip
                    cursor={{ fill: "rgba(96,37,105,0.05)" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Members"
                    fill="url(#genderGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : null}
      </section>
    </FadeIn>
  );
};

export default Graphs;
