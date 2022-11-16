export type Blog = {
  id: string;
  body: string;
  title: string;
  tags: Tag[];
  image: { url: string };
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: string;
};

export type Tag = {
  id: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: string;
};
