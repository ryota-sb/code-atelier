import { NextPage, InferGetStaticPropsType } from "next";
import { Blog } from "types/blog";
import { client } from "libs/client";

import { FooterComponent } from "../components/FooterComponent";

// Mantine UI
import {
  AppShell,
  Header,
  Title,
  Card,
  Text,
  Image,
  Grid,
} from "@mantine/core";

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
              <Card shadow="sm" p="xl" component="a" href={`/blog/${blog.id}`}>
                <Card.Section>
                  <Image
                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    height={160}
                    alt="image"
                  />
                </Card.Section>
                <Text weight={500} mt="md">
                  {blog.title}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </main>
    </AppShell>
  );
};

export default Home;
