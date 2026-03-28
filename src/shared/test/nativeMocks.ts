type MockFactory<T> = Partial<{
  [K in keyof T]: T[K];
}>;

export function createAsyncStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem: jest.fn(async (key: string) => store.get(key) ?? null),
    setItem: jest.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: jest.fn(async (key: string) => {
      store.delete(key);
    }),
    clear: jest.fn(async () => {
      store.clear();
    }),
  };
}

export function createExpoLocationMock(overrides = {}) {
  return {
    getCurrentPositionAsync: jest.fn(),
    requestForegroundPermissionsAsync: jest.fn(),
    requestBackgroundPermissionsAsync: jest.fn(),
    getForegroundPermissionsAsync: jest.fn(),
    ...overrides,
  };
}

export function createExpoSensorsMock() {
  return {
    Magnetometer: {
      isAvailableAsync: jest.fn(),
      requestPermissionsAsync: jest.fn(),
      setUpdateInterval: jest.fn(),
      addListener: jest.fn(),
    },
  };
}

export function createExpoHapticsMock() {
  return {
    ImpactFeedbackStyle: {
      Light: "Light",
      Medium: "Medium",
      Heavy: "Heavy",
    },
    impactAsync: jest.fn(),
  };
}

export function createExpoNotificationsMock() {
  return {
    setNotificationHandler: jest.fn(),
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    cancelAllScheduledNotificationsAsync: jest.fn(),
    scheduleNotificationAsync: jest.fn(),
  };
}

export function withMockedModule<T>(factory: T, overrides: MockFactory<T>) {
  return { ...factory, ...overrides };
}
