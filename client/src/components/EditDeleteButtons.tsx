import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface Props {
  identifier: string;
  slug: string;
  userEmail: string;
}

const EditDeleteButtons = ({ identifier, slug, userEmail }: Props) => {
  const { data: MeData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  return (
    <>
      {MeData?.me?.email === userEmail && (
        <HStack cursor="pointer">
          <DeleteIcon
            _hover={{ color: "red.400" }}
            onClick={() => {
              deletePost({
                variables: {
                  deletePostIdentifier: identifier!,
                },
              });
              if (router.pathname !== "/") {
                router.push("/");
              } else {
                router.reload();
              }
            }}
          />
          <NextLink href={`/post/edit/${slug}?identifier=${identifier}`}>
            <EditIcon _hover={{ color: "blue.400" }} />
          </NextLink>
        </HStack>
      )}
    </>
  );
};

export default EditDeleteButtons;
