import { Package, Download, Trash2 } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import WarningBox from '../components/WarningBox';

export default function Method5_Sideload() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Package className="text-blue-400" size={24} />
        Method 5 — Sideloading & App Management
      </h2>
      <p className="text-gray-400 mb-2">
        Difficulty: <span className="text-yellow-400 font-semibold">Medium</span> · Risk: <span className="text-green-400 font-semibold">Low</span> · Requires: <span className="text-cyan-400 font-semibold">ADB access</span>
      </p>
      <p className="text-gray-400 mb-6">
        Once you have ADB access (from any previous method), here's how to sideload apps, list installed apps, and remove bloatware.
        KaiOS 3 uses <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">appscmd</code> instead of WebIDE for app management.
      </p>

      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Download size={18} className="text-green-400" />
        Sideloading Apps (KaiOS 3 Method)
      </h3>

      <StepCard number={1} title="Set up appscmd on your computer">
        <CodeBlock
          code={`# appscmd is the KaiOS 3 tool for managing apps via ADB
# Download from KaiOS developer tools:
# https://github.com/nictas/appscmd-bin (community builds)
# or from the official KaiOS devtool extension

# Make sure ADB is running and phone is connected:
adb devices

# Get ADB root (required for appscmd)
adb root

# If adb root fails, try:
adb shell su -c "setprop service.adb.root 1"
adb shell su -c "stop adbd && start adbd"`}
          language="bash"
          title="Setup"
        />
      </StepCard>

      <StepCard number={2} title="List installed apps">
        <CodeBlock
          code={`# Using appscmd:
appscmd list

# If appscmd isn't available, query via ADB:
adb shell "ls /system/b2g/webapps/"
adb shell "ls /data/local/webapps/"

# Or cat the webapps manifest:
adb shell "cat /data/local/webapps/webapps.json" | python3 -m json.tool

# On KaiOS 3, apps may also be at:
adb shell "ls /system/b2g/apps/"

# You can also try querying via the api-daemon on port 80:
# Each app has a manifest URL like:
# http://<appname>.localhost/manifest.webmanifest`}
          language="bash"
          title="List all apps"
        />
      </StepCard>

      <StepCard number={3} title="Sideload a new app">
        <p className="mb-3">
          KaiOS 3 apps are web apps with a <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">manifest.webmanifest</code> file.
        </p>
        <CodeBlock
          code={`# Using appscmd:
appscmd install /path/to/your/app/folder

# Manual method via ADB:
# 1. Create your app folder with manifest.webmanifest + index.html
# 2. Package it as a zip
# 3. Push and install:

adb push my-app.zip /data/local/tmp/
adb shell "cd /data/local/tmp && unzip my-app.zip -d /data/local/webapps/my-app"

# You may need to update the webapps registry:
adb shell "cat /data/local/webapps/webapps.json"
# Add your app entry, then push back`}
          language="bash"
          title="Install an app"
        />
        <WarningBox level="info">
          A minimal KaiOS 3 app needs: <code>manifest.webmanifest</code>, <code>index.html</code>, and optionally CSS/JS files. The manifest must declare the app's name, launch path, and required permissions.
        </WarningBox>
      </StepCard>

      <StepCard number={4} title="Create a minimal test app">
        <CodeBlock
          code={`# manifest.webmanifest
{
  "name": "Test App",
  "short_name": "TestApp",
  "description": "A test sideloaded app",
  "start_url": "/index.html",
  "display": "standalone",
  "b2g_features": {
    "core": true
  },
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "112x112",
      "type": "image/png"
    }
  ]
}`}
          language="json"
          title="manifest.webmanifest"
        />
        <CodeBlock
          code={`<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Test App</title>
  <style>
    body {
      background: #1a1a2e; color: #0ff;
      font-family: sans-serif;
      display: flex; align-items: center; justify-content: center;
      height: 100vh; margin: 0;
      text-align: center;
    }
  </style>
</head>
<body>
  <div>
    <h1>🎉 It Works!</h1>
    <p>Sideloaded successfully on KaiOS 3.1</p>
    <p id="info"></p>
    <script>
      document.getElementById('info').textContent = navigator.userAgent;
    </script>
  </div>
</body>
</html>`}
          language="html"
          title="index.html"
        />
      </StepCard>

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Trash2 size={18} className="text-red-400" />
        Removing Bloatware
      </h3>

      <StepCard number={5} title="Disable/remove pre-installed apps">
        <CodeBlock
          code={`# Using appscmd:
appscmd uninstall <app-id>

# Manual method (requires root):
# 1. Pull the webapps registry
adb pull /data/local/webapps/webapps.json

# 2. Edit webapps.json - set "removable": true for target apps
# 3. Push it back
adb push webapps.json /data/local/webapps/webapps.json

# 4. Then uninstall from the phone's app manager
# OR delete the app folder directly:
adb shell "rm -rf /data/local/webapps/<app-folder>"

# For system apps (in /system partition, need root + rw mount):
adb shell "mount -o remount,rw /system"
adb shell "rm -rf /system/b2g/webapps/<app-name>"
adb shell "mount -o remount,ro /system"

# SAFER: Use the AppBuster approach - just hide apps
# Pull webapps.json, change the "visible" property
# This doesn't actually delete anything`}
          language="bash"
          title="Remove/disable apps"
        />
        <WarningBox level="danger">
          <strong>Do NOT remove core system apps</strong> like Settings, Homescreen, or System. This will soft-brick your device. Only remove third-party bloatware apps (games, carrier apps, promotional apps).
        </WarningBox>
      </StepCard>

      <div className="mt-6 bg-gray-900/60 border border-blue-500/20 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">Common Bloatware Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            'Facebook',
            'YouTube',
            'Google Assistant',
            'Life Timer',
            'KaiStore (optional)',
            'Carrier-specific apps',
            'Snake / Games',
            'News apps',
          ].map(app => (
            <div key={app} className="flex items-center gap-2 py-1.5 px-3 bg-gray-800/40 rounded-lg">
              <Trash2 size={12} className="text-red-400" />
              <span className="text-gray-300">{app}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Always research the app's system dependencies before removing. Some "bloatware" apps are required by the system to function.
        </p>
      </div>
    </div>
  );
}
