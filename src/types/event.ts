export interface EventData {
  title: string;
  category: string;
  id: number;
  image: string;
  organizer: string;
  inter_branch_collaboration: string | null,
  intra_branch_collaboration: string | null;
  start_date: string;
  end_date: string;
  registration_fee_amount: string;
  register_link: string;
  read_more_link: string;
  description: string;
  images: string[];
}
