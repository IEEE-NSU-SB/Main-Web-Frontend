export interface EventData {
  title: string;
  category: string;
  id: number;
  image: string;
  organizer: string;
  collaboration: string | null; // if sometimes no collab, keep optional or null
  start_date: string;
  end_date: string;
  registration_fee_amount: string;
  register_link: string;
  read_more_link: string;
  description: string;
  images: string[];
}
