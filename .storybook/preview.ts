import type { Preview } from "@storybook/react";
import "../src/styles/index.scss";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["welcome","components",["Button","Alert","Input","AutoComplete","Menu","Select","Upload"]],
      },
    },
  },
};

export default preview;
