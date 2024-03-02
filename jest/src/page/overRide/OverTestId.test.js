import { render, screen, configure } from "@testing-library/react";
import OverTestId from "./OverTestId";

// Override queries using configure
configure({
    testIdAttribute: "elem-id",
    asyncWrapper: (ui) => render(ui),
});

test("renders component with overridden data-testid", () => {
    render(<OverTestId />);

    // Check if the element with the overridden data-testid is present
    const overriddenElement = screen.getByTestId("over-test");
    expect(overriddenElement).toBeInTheDocument();

    // Check if the button with the overridden title is present
    const overriddenButton = screen.getByTitle("nyton");
    expect(overriddenButton).toBeInTheDocument();
});
