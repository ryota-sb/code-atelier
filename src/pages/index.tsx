import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import { Blog } from "types/blog";
import { client } from "libs/client";

import { NavbarComponent } from "../components/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";

// Mantine UI
import { AppShell, Header, Burger, Title } from "@mantine/core";

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
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <AppShell
      header={
        <Header height={60}>
          <div className="flex align-middle h-full">
            <Burger
              opened={opened}
              onClick={() => setOpened((open) => !open)}
              size="sm"
              mr="xl"
            />
            <Title>Run Dev</Title>
          </div>
        </Header>
      }
      navbar={<NavbarComponent opened={opened} />}
      footer={<FooterComponent />}
    >
      <main className="flex flex-1 flex-col justify-center p-4">
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </AppShell>
  );
};

export default Home;
