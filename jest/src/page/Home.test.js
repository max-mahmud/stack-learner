import { screen, render } from "@testing-library/react";
import Home from "./Home";
import axios from "axios";

jest.mock("axios");

describe("HOME TEST", () => {
    it("checking text", () => {
        render(<Home />);
        const hm = screen.getByText("Home")
        expect(hm).toBeInTheDocument()
    })

    it("renders Home component with fetched data", async () => {
        const mockData = {
            data: {
                title: "Mock Title",
                description: "Mock Description",
                price: "$10.99",
            },
        };

        axios.get.mockResolvedValue(mockData);

        render(<Home />);

        // Wait for the fetch to be resolved
        await screen.findByText(mockData.data.title);

        expect(screen.getByText(mockData.data.title)).toBeInTheDocument();
        expect(screen.getByText(mockData.data.description)).toBeInTheDocument();
        expect(screen.getByText(mockData.data.price)).toBeInTheDocument();
    });

    it("renders Home component with error message on fetch failure", async () => {
        const errorMessage = "Fetch failed";
        axios.get.mockRejectedValue(new Error(errorMessage));
        render(<Home />);

        // Wait for the fetch to be rejected
        await screen.findByTestId("error-message");
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
});
