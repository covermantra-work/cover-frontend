import DynamicBlogPage from "../[slug]/page";

export default function Blog6Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog6" })} />;
}