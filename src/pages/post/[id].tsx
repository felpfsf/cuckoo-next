import MainLayout from "@/components/MainLayout";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post() {
  return (
    <MainLayout pageTitle={"Post"}>
      <h1>Post</h1>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);
  return {
    props: {},
  };
};
