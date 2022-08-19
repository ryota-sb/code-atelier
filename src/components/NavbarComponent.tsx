import { Navbar, Avatar } from "@mantine/core";
import { FC } from "react";

type Props = {
  opened: boolean;
};

export const NavbarComponent: FC<Props> = ({ opened }) => {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Avatar
        component="a"
        href="http://github.com/ryota-sb"
        target="_blank"
        src="imgs/ryota.jpg"
        alt="Matsui Ryota"
        size={150}
        radius={80}
      />
    </Navbar>
  );
};
