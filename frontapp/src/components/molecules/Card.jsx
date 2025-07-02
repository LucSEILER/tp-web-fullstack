import { Card as ChakraCard } from "@chakra-ui/react";

const Card = ({ title, children }) => {
  return (
    <ChakraCard.Root className="p-4">
      <ChakraCard.Header>{title}</ChakraCard.Header>
      <ChakraCard.Body>{children}</ChakraCard.Body>
    </ChakraCard.Root>
  );
};

export default Card;
