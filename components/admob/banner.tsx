import React from "react";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

export default function BannerAdMob() {
  setTestDeviceIDAsync("EMULATOR");
  return (
    <AdMobBanner
      bannerSize="fullBanner"
      adUnitID="ca-app-pub-2748604666098105/1668467365" // Test ID, Replace with your-admob-unit-id
      servePersonalizedAds // true or false
    />
  );
}
