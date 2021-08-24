import { Heading, HeadingProps } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import Link from "next/link";
import React, { FC } from "react";

interface Props extends HeadingProps {}

const Logo: FC<Props> = ({ ...props }) => {
  return (
    <Link href="/">
      <Heading cursor="pointer" {...(props as HeadingProps)}>
        The Blog{" "}
        <chakra.span color="red.300" fontSize="6xl" lineHeight="0">
          .
        </chakra.span>
      </Heading>
    </Link>
  );
};

export default Logo;
