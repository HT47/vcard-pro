# build-android.ps1
# Automates the Gradle build for the Android project
# IMPORTANT: ASCII only, no Unicode characters allowed in this script.

Write-Host "Starting Android build process..."

# Synchronize assets first
npx cap sync android

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Capacitor sync failed."
    exit 1
}

if (Test-Path "android") {
    Write-Host "Compiling APK using Gradle..."
    cmd.exe /c "cd android && gradlew.bat assembleDebug"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "--------------------------------------------------"
        Write-Host "SUCCESS: APK build completed successfully!"
        Write-Host "Location: android/app/build/outputs/apk/debug/app-debug.apk"
        Write-Host "--------------------------------------------------"
    } else {
        Write-Host "Error: Gradle build failed."
        exit 1
    }
} else {
    Write-Host "Error: Android folder not found. Run 'npx cap add android' first."
    exit 1
}
