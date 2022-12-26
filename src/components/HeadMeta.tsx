import Head from "next/head";

type Props = {
  title: string;
  description: string;
  url: string;
  type: string;
  imageUrl: string;
};

export default function HeadMeta(props: Props) {
  const { title, description, url, type, imageUrl } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
}
