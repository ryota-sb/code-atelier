import { NextPage, InferGetStaticPropsType } from "next";
import { Blog } from "types/blog";
import { client } from "libs/client";

import Link from "next/link";
import Image from "next/image";

import { FooterComponent } from "../components/FooterComponent";

// Mantine UI
import { AppShell, Header, Title, Card, Text, Grid } from "@mantine/core";

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  return {
    props: {
      blogs: blog.contents,
    },
  };
};

type Props = {
  blogs: Blog[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}: Props) => {
  console.log(blogs);
  return (
    <AppShell
      header={
        <Header height={60}>
          <div className="flex align-middle h-full">
            <Title>Run Dev</Title>
          </div>
        </Header>
      }
      footer={<FooterComponent />}
    >
      <main className="flex flex-1 flex-col justify-center p-4">
        <Grid>
          {blogs.map((blog) => (
            <Grid.Col sm={6} md={4} lg={3}>
              <Link href={`/blog/${blog.id}`}>
                <Card shadow="sm" p="xl">
                  <Card.Section>
                    <Image
                      src={blog.image.url}
                      objectFit="contain"
                      height={160}
                      width={500}
                      alt="image"
                    />
                  </Card.Section>
                  <Text>{blog.createdAt}</Text>
                  <Text weight={500} mt="md">
                    {blog.title}
                  </Text>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </main>
    </AppShell>
  );
};

export default Home;
