/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */

import {
  render,
  fireEvent,
  screen,
} from "@testing-library/react";
import Select, { SelectProps } from "./Select";
import Option from "./Option";
jest.mock("../Icon/Icon", () => {
  return () => {
    return <i className="fa" />;
  };
});
jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: any) => {
      return props.children;
    },
  };
});
//用例参数
const testProps: SelectProps = {
  style: { width: "300px" },
  placeholder: "test-select",
  multiple: false,
};
const testMultProps: SelectProps = {
  style: { width: "300px" },
  placeholder: "test-select",
  multiple: true,
};
const generateSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <Option value="123" disabled>
        123
      </Option>
      <Option value="456" >
        456
      </Option>
      <Option value="789">
        789
      </Option>
    </Select>
  );
};
let selectElement: HTMLElement;
describe("test Select and Option component in default(single) mode", () => {
  beforeEach(() => {
    render(generateSelect(testProps));
    selectElement = screen.getByTestId("test-select");
  });
  it("should render the correct default Select", () => {
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveClass("select");
  });
  it("click input should show dropdown items", () => {
    const clickItem = screen.getByPlaceholderText("test-select")  as HTMLInputElement;
    fireEvent.click(clickItem);
    const disabledItem = screen.queryByText("123");
    expect(selectElement).toHaveClass("select menu-is-open");
    expect(selectElement.querySelectorAll("li").length).toEqual(3);
    expect(disabledItem).toHaveClass("is-disabled");
  });
  it("click input should choose item or change selected item",()=>{
    const selectItem1 = screen.getByText("456");
    const selectItem2 = screen.getByText("789");
    fireEvent.click(selectItem1);
    expect(selectElement).toHaveClass("select menu-is-open");
    expect(selectItem1).toHaveClass("is-selected");
    fireEvent.click(selectItem2);
    expect(selectItem1).not.toHaveClass("is-selected");
  });
});
describe("test Select and Option component in default(multiple) mode",()=>{
    beforeEach(() => {
        render(generateSelect(testMultProps));
        selectElement = screen.getByTestId("test-select");
      });
      it("should render the correct default Select", () => {
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveClass("select is-multiple");
      });
      it("click input should show dropdown items", () => {
        const clickItem = screen.getByPlaceholderText("test-select") as HTMLInputElement;
        fireEvent.click(clickItem);
        // const {getByText} = render(generateSelect(testMultProps));
        const disabledItem = screen.getByText("123");
        expect(selectElement).toHaveClass("select menu-is-open is-multiple");
        expect(selectElement.querySelectorAll("li").length).toEqual(3);
        expect(disabledItem).toHaveClass("is-disabled");
      });
      it("click input should choose item or delect selected item",()=>{
        const selectItem1 = screen.getByText("456");
        const selectItem2 = screen.getByText("789");
        fireEvent.click(selectItem1);
        expect(selectElement).toHaveClass("select is-multiple");
        const selectItem = screen.queryAllByText("456");
        expect(selectItem).toBeDefined();;
        fireEvent.click(selectItem2);
        expect(selectItem2).toBeVisible();
        // fireEvent.click(selectItem1);
        // expect(selectItem).not.toBeDefined()
        // fireEvent.click(selectItem2);
        // expect(selectItem).not.toBeVisible()
      });
});