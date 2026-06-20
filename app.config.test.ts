import getAppConfig from "./app.config";

describe("app.config", () => {
  const originalAppEnv = process.env.APP_ENV;

  afterEach(() => {
    process.env.APP_ENV = originalAppEnv;
  });

  it("configures expo-notifications for local notifications only", () => {
    process.env.APP_ENV = "development";

    const config = getAppConfig({ config: {} } as any);
    const notificationsPlugin = config.plugins?.find(
      (plugin) => Array.isArray(plugin) && plugin[0] === "expo-notifications"
    ) as [string, Record<string, unknown>] | undefined;

    expect(notificationsPlugin).toEqual([
      "expo-notifications",
      {
        icon: "./assets/appIcons/android-icon-monochrome.png",
        color: "#ffffff",
        defaultChannel: "solah-times-default",
        sounds: [
          "./assets/notification/takbirOnly.mp3",
          "./assets/notification/fullAdhan.mp3",
        ],
        enableBackgroundRemoteNotifications: false,
      },
    ]);
  });

  it("registers both background-task plugins needed by notification renewal", () => {
    process.env.APP_ENV = "development";

    const config = getAppConfig({ config: {} } as any);

    expect(config.plugins).toContain("expo-background-task");
    expect(config.plugins).toContain("expo-task-manager");
  });
});
