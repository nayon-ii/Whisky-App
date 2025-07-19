// app\(screen)\_layout.tsx
import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
      <Stack.Screen name="offer-details/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="express-interest/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="express-interest-success/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
