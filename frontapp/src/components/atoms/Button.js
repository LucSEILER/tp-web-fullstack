import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ label, onClick }) => {
  return (
    <ChakraButton onClick={onClick} colorPalette={"blue"}>
      {label}
    </ChakraButton>
  );
};

export default Button;
