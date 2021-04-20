import { Heading, HeadingProps } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React, { FC } from "react";

interface Props extends HeadingProps {}

const Logo: FC<Props> = ({ ...props }) => {
  return (
    <Heading {...(props as HeadingProps)}>
      The Blog <chakra.span color="red.300">.</chakra.span>
    </Heading>
  );
};

export default Logo;
