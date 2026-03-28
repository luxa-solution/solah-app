import { useOnboardingStore } from "./onboardingStore";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useOnboardingStore.getState();

describe("useOnboardingStore", () => {
  beforeEach(() => {
    useOnboardingStore.setState(initialState, true);
  });

  it("starts with onboarding disabled", () => {
    expect(useOnboardingStore.getState().hasOnboarded).toBe(false);
  });

  it("updates onboarding status", () => {
    useOnboardingStore.getState().setHasOnboarded(true);
    expect(useOnboardingStore.getState().hasOnboarded).toBe(true);

    useOnboardingStore.getState().setHasOnboarded(false);
    expect(useOnboardingStore.getState().hasOnboarded).toBe(false);
  });
});
