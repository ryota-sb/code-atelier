# My Blog

- Next.js(TypeScript)
- microCMS
- MantineUI
- TailwindCSS

# Create project

```bash
yarn create next-app --ts -e with-tailwindcss
yarn add @emotion/react
```

# MantineUI 導入

```bash
yarn add @mantine/core @mantine/hooks @mantine/next
```

# TailwindCSS と MantineUI を併用する場合の設定

tailwind.config.js

```bash
corePlugins: {
  preflight: false,
},
```
