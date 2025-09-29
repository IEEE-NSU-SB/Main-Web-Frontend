import BlogCard from "@/components/common_card/blog-card";
import FadeIn from "@/components/ui/fade-in";
import Wave from "@/components/wave";

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
