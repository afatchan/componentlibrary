import type { Meta, StoryObj } from "@storybook/react";
import AutoComplete from "./AutoComplete";
import { action } from "@storybook/addon-actions";

const SimpleComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      //renderOption={renderOption}
    />
  );
};

const meta: Meta<typeof SimpleComplete> = {
  component: SimpleComplete,
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const DefaultAutoComplete: Story = {
  args: {
    //👇 Now all AutoComplete stories will be primary.
    fetchSuggestions: (query) => {
      const testArray = [
        { value: "ab", number: 11 ,},
        { value: "abc", number: 1 },
        { value: "b", number: 4 },
        { value: "c", number: 15 },
      ];
      return testArray.filter((item) => item.value.includes(query));
    },
    // onSelect: jest.fn(),
    placeholder: "auto-complete",
  },
};
