import { describe, vi } from "vitest";
import HeartButton from "./HeartButton";
import { render } from "@testing-library/react";
import { LocationData } from "../../../lib/types";

describe("HeartButton", () => {
    it("should render correctly", () => {
        const { container } = render(
            <HeartButton location={{
                representasjonspunkt: {
                    nord: 0,
                    øst: 0
                },
                stedsnavn: [],
                stedsnummer: "",
                navneobjekttype: undefined,
                kommuner: undefined
            }} />
        );
        expect(container).toMatchSnapshot();
    });

    it("should render correctly with favorite from localstorage", () => {
        const location = {
            representasjonspunkt: {
                nord: 0,
                øst: 0
            },
            stedsnavn: [
                { skrivemåte: "Test" }
            ],
            stedsnummer: "",
            navneobjekttype: undefined,
            kommuner: undefined
        } as LocationData;
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn()
        };
        Object.defineProperty(window, "localStorage", { value: localStorageMock });

        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([location]));

        const { container } = render(<HeartButton location={location} />);
        expect(container).toMatchSnapshot();
    });


    // it("should toggle favorite correctly", () => {
    //     const location = {
    //         representasjonspunkt: {
    //             nord: 0,
    //             øst: 0
    //         },
    //         stedsnavn: [{ skrivemåte: "Test" }],
    //         stedsnummer: "1",
    //         navneobjekttype: undefined,
    //         kommuner: undefined
    //     };
    //     const { getByTestId } = render(<HeartButton location={location} />);
    //     const heartButton = getByTestId("heart-button");

    //     fireEvent.click(heartButton);
    //     expect(localStorage.getItem("favorites")).toEqual(JSON.stringify([location]));
    //     expect(heartButton.getAttribute("class")).toContain("solid");

    //     fireEvent.click(heartButton);
    //     expect(localStorage.getItem("favorites")).toEqual(JSON.stringify([]));
    //     expect(heartButton.getAttribute("class")).not.toContain("solid");
    // });
});