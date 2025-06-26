import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ label, onClick, ...props }) => {
  return (
    <ChakraButton onClick={onClick} color={"white"} {...props}>
      {label}
    </ChakraButton>
  );
};

export default Button;
