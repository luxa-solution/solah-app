import { useDefaultStore } from "./defaultStore";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useDefaultStore.getState();

describe("useDefaultStore", () => {
  beforeEach(() => {
    useDefaultStore.setState(initialState, true);
  });

  it("starts with the expected defaults", () => {
    const state = useDefaultStore.getState();

    expect(state.defaultCalculationMethod.method).toBe("MoonsightingCommittee");
    expect(state.defaultTimezone.timezone).toBe("Asia/Riyadh");
    expect(state.defaultLocation.location.city).toBe("Riyadh");
    expect(state.defaultLanguage.value).toBe("Default");
  });

  it("updates each default setting", () => {
    const nextCalculationMethod = {
      name: "Karachi",
      method: "Karachi" as const,
      isDefault: false,
    };
    const nextTimezone = {
      name: "UTC",
      timezone: "UTC",
      isDefault: false,
    };
    const nextLocation = {
      name: "Makkah",
      location: {
        longitude: 39.8262,
        latitude: 21.4225,
        city: "Makkah",
        region: "Makkah Province",
        country: "Saudi Arabia",
      },
      timezone: nextTimezone,
      isDefault: false,
    };
    const nextLanguage = {
      name: "English",
      value: "English",
      isDefault: false,
    };

    const state = useDefaultStore.getState();
    state.setDefaultCalculationMethod(nextCalculationMethod);
    state.setDefaultTimeZone(nextTimezone);
    state.setDefaultLocation(nextLocation);
    state.setDefaultLanguage(nextLanguage);

    expect(useDefaultStore.getState().defaultCalculationMethod).toEqual(nextCalculationMethod);
    expect(useDefaultStore.getState().defaultTimezone).toEqual(nextTimezone);
    expect(useDefaultStore.getState().defaultLocation).toEqual(nextLocation);
    expect(useDefaultStore.getState().defaultLanguage).toEqual(nextLanguage);
  });
});
