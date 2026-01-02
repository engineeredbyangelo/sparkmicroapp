# Running Spark in Codespaces - Complete Guide

## Understanding the Environment

You're in **GitHub Codespaces** - a cloud-based development environment. This means:
- ❌ No Android SDK or iOS Xcode installed
- ❌ Cannot run Android/iOS emulators
- ✅ **CAN** test on physical devices via Expo Go
- ✅ **CAN** run web version in browser
- ✅ **CAN** use Expo's tunnel for remote testing

---

## ✅ Option 1: Test on Physical Device (RECOMMENDED)

This is the **best way** to test your React Native app in Codespaces.

### Steps:

1. **Install Expo Go on your phone**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server with tunnel**
   ```bash
   npx expo start --tunnel
   ```

3. **Scan the QR code**
   - **Android**: Open Expo Go → Tap "Scan QR Code"
   - **iOS**: Open Camera app → Point at QR code → Tap notification

### Why `--tunnel` flag?

Codespaces is in the cloud, not on your local network. The `--tunnel` flag creates a publicly accessible URL so your phone can connect to the development server running in Codespaces.

---

## ✅ Option 2: Run in Web Browser

Test the app's UI in a web browser (limited native features):

```bash
npx expo start --web
```

Then open the URL shown in the terminal (usually `http://localhost:8081`).

**Note**: Some React Native features won't work perfectly on web, but the UI layout will be visible.

---

## ✅ Option 3: Use Expo Tunnel Mode

For better performance and reliability:

```bash
# Start with tunnel
npx expo start --tunnel

# Or with specific options
npx expo start --tunnel --clear
```

The tunnel creates an `https://` URL that works from anywhere.

---

## 📱 Full Testing Workflow

### Recommended Command:
```bash
npx expo start --tunnel
```

### What You'll See:
```
› Metro waiting on exp://xxx.xxx.xxx.xxx:8081
› Tunnel ready at https://xxxxxx.exp.direct

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu

› Scan the QR code above with Expo Go (Android) or Camera (iOS)
```

### Testing Steps:
1. ✅ Scan QR code with Expo Go
2. ✅ App loads on your phone
3. ✅ Navigate between tabs (Home, Explore, Profile, Settings)
4. ✅ Test the centered Spark orb animation
5. ✅ Verify all UI elements render correctly

---

## 🚫 Why Those Errors?

### "Failed to resolve the Android SDK path"
**Cause**: Codespaces doesn't have Android SDK installed.
**Solution**: Use Expo Go on physical device instead.

### "spawn adb ENOENT"  
**Cause**: No Android Debug Bridge (adb) in Codespaces.
**Solution**: Don't use `npm run android` - use tunnel mode instead.

---

## 📝 Correct Scripts for Codespaces

Update your workflow:

### ✅ DO Use:
```bash
# Start with tunnel for mobile testing
npx expo start --tunnel

# Or test web version
npx expo start --web

# Clear cache if needed
npx expo start --tunnel --clear
```

### ❌ DON'T Use:
```bash
# These won't work in Codespaces
npm run android
npm run ios
npx expo run:android
npx expo run:ios
```

---

## 🔧 Troubleshooting

### Issue: "Can't connect to Metro bundler"
**Solution**: Make sure you used `--tunnel` flag:
```bash
npx expo start --tunnel
```

### Issue: "QR code not working"
**Solution**: 
1. Make sure Expo Go is installed
2. Check your phone's internet connection
3. Try typing the `exp://` URL manually in Expo Go

### Issue: "Tunnel connection slow"
**Solution**: This is normal - tunnel adds latency. For faster development, consider:
- Local development on your machine
- Using EAS Build for production testing

### Issue: "Module not found"
**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules
npm install --legacy-peer-deps
npx expo start --tunnel --clear
```

---

## 🎯 Best Practices for Codespaces

1. **Always use `--tunnel` flag** when testing on mobile
2. **Use web mode** for quick UI iterations
3. **Keep Expo Go updated** on your phone
4. **Save your work frequently** (Codespaces may timeout)
5. **Test on actual device** for best results

---

## 📊 Current Dependencies (Verified ✅)

Based on latest Expo 52 documentation:

```json
{
  "expo": "~52.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/bottom-tabs": "^6.6.1",
  "react-native-screens": "~4.4.0",
  "react-native-safe-area-context": "4.12.0",
  "expo-linear-gradient": "~13.0.2",
  "expo-status-bar": "~2.0.0",
  "react-native-svg": "15.8.0"
}
```

All versions are **compatible** and verified against official Expo 52 documentation.

---

## 🚀 Quick Start Command

**Copy and paste this:**

```bash
npx expo start --tunnel
```

Then scan the QR code with Expo Go on your phone. That's it! 🎉

---

## 📱 Expected Result

When properly connected via Expo Go, you should see:

1. ✨ **Black background** with blue gradient overlays
2. 🌟 **Animated Spark orb** in the header
3. 📊 **Progress dashboard** with stats
4. 📚 **Learning articles** with progress bars
5. 🎯 **Bottom navigation** with centered glowing orb
6. ⚡ **Smooth animations** and transitions

---

## 📖 Additional Resources

- [Expo Go Documentation](https://docs.expo.dev/get-started/expo-go/)
- [Tunnel Connection Guide](https://docs.expo.dev/more/expo-cli/#tunneling)
- [Development Mode](https://docs.expo.dev/develop/development-builds/introduction/)

---

**Status**: ✅ All dependencies installed and verified
**Next Step**: Run `npx expo start --tunnel` and scan QR code!
