import BlogCard from "@/components/BlogCard";
import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/waave";

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
