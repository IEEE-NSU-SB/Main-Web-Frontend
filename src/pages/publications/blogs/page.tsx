import BlogCard from "@/components/blog-card";
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
