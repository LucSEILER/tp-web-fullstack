'use client'

import { ChakraProvider, createSystem, defaultConfig, defaultSystem, defineConfig } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        red: "#EE0F0F",
        primary: "#2C2C2C",
        buttonPrimary: "#AD3215",
        textPrimary: "#D5D8E8",
        textLink: "#AD3215",
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config)

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
