import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../index";

const mockUseHome = jest.fn();
jest.mock("../useHome", () => () => mockUseHome());

const mockEmployees = [{ id: 1, employee_name: "Geraldy" }];

const mockActions = {
  goToAddEmployee: jest.fn(),
  reload: jest.fn(),
  onPressDelete: jest.fn(),
  goToEditEmployee: jest.fn(),
  onAgreeToDelete: jest.fn(),
  onDisagreeToDelete: jest.fn(),
};

describe("Home Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders employee list and calls onEdit and onDelete buttons", () => {
    mockUseHome.mockReturnValue({
      states: {
        loading: false,
        error: false,
        employees: mockEmployees,
        deletionModalVisible: false,
        selectedEmployee: null,
      },
      actions: mockActions,
    });
    const { getByText } = render(<Home />);
    expect(getByText("Employee Lists:")).toBeTruthy();
    expect(getByText("Geraldy")).toBeTruthy();
    fireEvent.press(getByText("Edit"));
    expect(mockActions.goToEditEmployee).toHaveBeenCalled();
    fireEvent.press(getByText("Delete"));
    expect(mockActions.onPressDelete).toHaveBeenCalled();
  });

  it("shows loading indicator", () => {
    mockUseHome.mockReturnValue({
      actions: mockActions,
      states: {
        loading: true,
        error: false,
        employees: [],
        deletionModalVisible: false,
        selectedEmployee: null,
      },
    });
    const { getByTestId } = render(<Home />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("calls reload when pressing Reload button", () => {
    mockUseHome.mockReturnValue({
      actions: mockActions,
      states: {
        loading: false,
        error: true,
        employees: [],
        deletionModalVisible: false,
        selectedEmployee: null,
      },
    });
    const { getByText } = render(<Home />);
    fireEvent.press(getByText("Reload"));
    expect(mockActions.reload).toHaveBeenCalled();
  });
});
