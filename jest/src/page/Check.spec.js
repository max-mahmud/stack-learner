import { screen, render } from "@testing-library/react";
import Check from "./Check";
import * as ResultModule from "../utils/Result";

jest.mock("../utils/Result");

describe("Check Component", () => {
    it("renders 'Its working' if Result returns true", () => {
        // Mock the Result function to always return true
        ResultModule.Result.mockReturnValue(true);

        render(<Check />);

        expect(screen.getByText("Its working")).toBeInTheDocument();
    });

    it("renders 'Not working' if Result returns false", () => {
        // Mock the Result function to always return false
        ResultModule.Result.mockReturnValue(false);

        render(<Check />);

        expect(screen.getByText("Not working")).toBeInTheDocument();
    });
    it("snapShot checking", () => {
        // Mock the Result function to always return false
        ResultModule.Result.mockReturnValue(true);

        const check = render(<Check />);
        expect(check).toMatchSnapshot()


    });
});
