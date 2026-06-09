import { Globe, Zap } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import WarningBox from '../components/WarningBox';

export default function Method1_W2D() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Globe className="text-green-400" size={24} />
        Method 1 — W2D: Web-to-Dev (Browser Jailbreak)
      </h2>
      <p className="text-gray-400 mb-2">
        Difficulty: <span className="text-green-400 font-semibold">Easy</span> · Risk: <span className="text-green-400 font-semibold">None</span> · Reversible: <span className="text-green-400 font-semibold">Yes</span>
      </p>
      <p className="text-gray-400 mb-6">
        The W2D technique exploits a legitimate KaiOS feature: <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">WebActivity</code> is accessible from websites in the built-in Browser app. This means any website can trigger system actions — like opening the hidden Developer menu in Settings.
      </p>

      <WarningBox level="info">
        This is your <strong>first move</strong>. Even if it doesn't give you full debug access, it reveals whether the Developer menu exists and whether ADB can be toggled. Try this before anything else.
      </WarningBox>

      <StepCard number={1} title="Open the built-in Browser on your TCL T435D">
        <p>Navigate to the browser app. Do NOT use any downloaded browser — only the built-in system Browser has the elevated permissions needed for WebActivity to work.</p>
      </StepCard>

      <StepCard number={2} title="Navigate to the W2D page">
        <p className="mb-3">Type one of these URLs directly into the browser address bar:</p>
        <CodeBlock code="https://w2d.js.org" title="Primary W2D URL" />
        <CodeBlock code="https://w2d.bananahackers.net" title="Fallback URL" />
        <p className="mt-2 text-gray-400">If neither loads, try the raw JavaScript method in Step 2b.</p>
      </StepCard>

      <StepCard number={3} title='Click "Open Developer menu"'>
        <p className="mb-3">
          This triggers a <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">WebActivity</code> call that opens the hidden Developer settings page:
        </p>
        <CodeBlock
          code={`// What happens under the hood (KaiOS 3 syntax):
let w2d = new WebActivity("configure", {
  target: "device",
  section: "developer",
});

w2d.start()
  .then(() => console.log("Developer menu opened!"));`}
          language="javascript"
          title="WebActivity call"
        />
        <p className="mt-3">If it works, the Settings app will open directly to the Developer menu.</p>
      </StepCard>

      <StepCard number={4} title="Enable ADB and DevTools">
        <p className="mb-2">Inside the Developer menu, look for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Debugger</strong> → Select <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">ADB and DevTools</code></li>
          <li>A <strong>bug icon 🐛</strong> should appear in the status bar if successful</li>
        </ul>
        <WarningBox level="warning">
          On KaiOS 3.1, even if the Developer menu opens, the ADB/DevTools toggle may be disabled or non-functional due to SELinux restrictions. If the bug icon doesn't appear, proceed to Method 2.
        </WarningBox>
      </StepCard>

      <StepCard number={5} title="Test ADB connection from your computer">
        <p className="mb-3">If the bug icon appeared, connect your phone via USB and test:</p>
        <CodeBlock
          code={`# Install ADB (if not already)
# Linux: sudo apt install android-tools-adb
# Mac: brew install android-platform-tools
# Windows: download from developer.android.com/tools/releases/platform-tools

# Connect phone via USB, then:
adb devices

# You should see something like:
# List of devices attached
# XXXXXXXXXX    device`}
          language="bash"
          title="Test ADB"
        />
      </StepCard>

      <div className="mt-6 bg-gray-900/60 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          Alternative: Raw JavaScript in Browser Console
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          If the W2D site doesn't load, you can try typing JavaScript directly into the browser's address bar. Some KaiOS browsers execute <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">javascript:</code> URIs:
        </p>
        <CodeBlock
          code={`javascript:void(new WebActivity("configure",{target:"device",section:"developer"}).start())`}
          language="javascript"
          title="Paste into browser URL bar"
        />
        <p className="text-xs text-gray-500 mt-2">Note: Some browsers strip the <code>javascript:</code> prefix when pasting. You may need to type it manually.</p>
      </div>
    </div>
  );
}
