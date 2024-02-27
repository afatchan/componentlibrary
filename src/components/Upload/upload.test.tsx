/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import {
  render,
  fireEvent,
  waitFor,
  createEvent,
  screen
} from "@testing-library/react";

import { Upload, UploadProps } from "./Upload";

jest.mock("../Icon/Icon", () => {
  return ({ icon, onClick } ) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
let  fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("test upload component", () => {
  beforeEach(() => {
    render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = document.querySelector(".viking-file-input") as HTMLInputElement;
    uploadArea = screen.queryByText("Click to upload") as HTMLElement;
  });
  it("upload process should works fine", async () => {
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(screen.getByText("spinner")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("test.png")).toBeInTheDocument();
    });
    expect(screen.getByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //remove the uploaded file
    expect(screen.getByText("times")).toBeInTheDocument();
    fireEvent.click(screen.queryByText("times") as HTMLElement);
    expect(screen.queryByText("test.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);

    await waitFor(() => {
      expect(screen.getByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});
