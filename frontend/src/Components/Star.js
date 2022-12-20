import React from "react";
import { StarIcon } from "@chakra-ui/icons";

export default function Star(props) {
  let count = props.count;

  if (count === 5)
    return (
      <>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </>
    );
  else if (count === 4)
    return (
      <>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </>
    );
  else if (count === 3)
    return (
      <>
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </>
    );
  else if (count === 2)
    return (
      <>
        <StarIcon />
        <StarIcon />
      </>
    );
  else if (count === 1)
    return (
      <>
        <StarIcon />
      </>
    );

  return <></>;
}
