/* Alert模块单元测试 */
import { render, fireEvent,screen } from "@testing-library/react";
import Alert from "./Alert";

describe("test Alert component", () => {
  it("should render the correct default Alert", () => {
    render(<Alert title="Alert-test" />);
    // eslint-disable-next-line testing-library/no-node-access
    const element = screen.getByText("Alert-test").parentNode as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("DIV");
    expect(element).toHaveClass("alert alert-info");
  });
  it("should render the correct component based on different closeFunction", () => {
    render(<Alert
      title="Alert-onClose-test"
      closable
      onClose={() => {
        console.log("aaa");
      }}
    />);
    const element = 
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText("Alert-onClose-test").nextElementSibling as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("closeBtn");
    fireEvent.click(element);
  });
});
