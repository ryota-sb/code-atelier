export type Blog = {
  id: string;
  body: string;
  title: string;
  image: { url: string };
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: string;
};
