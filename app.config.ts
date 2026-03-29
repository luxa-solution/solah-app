// app.config.js
import { ConfigContext, ExpoConfig } from "expo/config";

import { version } from "./package.json";

const EAS_PROJECT_ID = "8adc6578-e4a8-4fa8-98b4-37ab84ad6a76";
const PROJECT_SLUG = "solah-app";
const OWNER = "luxa-digitals";

const APP_NAME = "Solah App";
const SCHEME = "com.luxa.solahapp";

const appIcons = {
  lightBg: "#ffffff",
  darkBg: "#000000",
} as const;

const IOS_ICON = "./assets/appIcons/icon.png";
const ADAPTIVE_ICON = {
  bgColor: appIcons.lightBg,
  fgImage: "./assets/appIcons/android-icon-foreground.png",
  bgImage: "./assets/appIcons/android-icon-background.png",
  mcImage: "./assets/appIcons/android-icon-monochrome.png",
};
const SPLASH_ICON = {
  image: "./assets/appIcons/splash-icon.png",
  bgColor: appIcons.lightBg,
  darkImage: "./assets/appIcons/splash-icon.png", // Not setup currently.
  darkBgColor: appIcons.darkBg,
};
const NOTIFICATION_AUDIOS = {
  short: "./assets/notification/takbir-only.mp3",
  full: "./assets/notification/full-adhan.mp3",
} as const;

// Environment-specific overrides
function getDynamicAppConfig(
  environment: "development" | "preview" | "production"
) {
  if ( environment === "production" ) {
    return {
      name: APP_NAME,
      scheme: SCHEME,
    };
  }

  if ( environment === "preview" ) {
    return {
      name: `${APP_NAME} (Preview)`,
      scheme: `${SCHEME}.preview`,
    };
  }

  return {
    name: `${APP_NAME} (Dev)`,
    scheme: `${SCHEME}.dev`,
  };
}

// CONFIG

export default ( { config }: ConfigContext ): ExpoConfig => {
  const env =
    ( process.env.APP_ENV as "development" | "preview" | "production" ) ||
    "development";

  const { name, scheme } =
    getDynamicAppConfig( env );

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    version,
    orientation: "portrait",
    icon: IOS_ICON,
    scheme,
    userInterfaceStyle: "automatic",
    platforms: [ "android", "ios" ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: scheme,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: ADAPTIVE_ICON.bgColor,
        foregroundImage: ADAPTIVE_ICON.fgImage,
        backgroundImage: ADAPTIVE_ICON.bgImage,
        monochromeImage: ADAPTIVE_ICON.mcImage,
      },
      predictiveBackGestureEnabled: false,
      package: scheme,
    },
    "plugins": [
      "expo-router",
      "expo-background-task",
      "expo-task-manager",
      "expo-font",
      "expo-localization",
      "expo-web-browser",
      "expo-image",
      [
        "expo-splash-screen",
        {
          "image": SPLASH_ICON.image,
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": SPLASH_ICON.bgColor,
          "dark": {
            "backgroundColor": SPLASH_ICON.darkBgColor,
          }
        }
      ],
      [
        "expo-notifications",
        {
          "icon": "./assets/appIcons/android-icon-monochrome.png",
          "color": "#ffffff",
          "defaultChannel": "solah-times-default",
          "sounds": [
            NOTIFICATION_AUDIOS.short,
            NOTIFICATION_AUDIOS.full
          ],
          "enableBackgroundRemoteNotifications": false
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    owner: OWNER,
    runtimeVersion: {
      policy: "fingerprint",
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
  };
};
