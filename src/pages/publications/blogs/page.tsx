import BlogCard from "@/components/common_card/BlogCard";
import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/Wave";

const Blogs = () => {
  return (
    <>
      <Wave title="Blogs"></Wave>
      <FadeIn>
        <BlogCard></BlogCard>
      </FadeIn>
    </>
  );
};

export default Blogs;
