# Assets Directory

This directory should contain the following image files for the Expo app:

## Required Files:
- `icon.png` (1024x1024) - App icon
- `splash.png` (1284x2778) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon

## Recommended Specifications:

### icon.png
- Size: 1024x1024 pixels
- Format: PNG with transparency
- Design: Should work well when rounded on iOS and adaptive on Android

### splash.png
- Size: 1284x2778 pixels (iPhone 13 Pro Max)
- Format: PNG
- Background: #8B5CF6 (Elite & Estilo primary color)
- Logo/Icon centered

### adaptive-icon.png
- Size: 1024x1024 pixels
- Format: PNG with transparency
- Safe area: Keep important elements within central 512x512 circle

### favicon.png
- Size: 48x48 pixels
- Format: PNG
- Simple version of the app icon

## Creating Assets

You can use tools like:
- Figma or Adobe XD for design
- [Icon Kitchen](https://icon.kitchen/) for generating all icon sizes
- [Expo Asset Generator](https://github.com/expo/expo-cli) tools

## Temporary Solution

For development, you can use simple colored squares with the Elite & Estilo branding colors.
The app will work without these files, but will show warnings.
