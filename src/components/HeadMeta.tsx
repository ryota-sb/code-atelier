import Head from "next/head";

type Props = {
  title: string;
  description: string;
};

export default function HeadMeta(props: Props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}
