import { Key, Hash } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import WarningBox from '../components/WarningBox';

export default function Method3_HiddenMenus() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Key className="text-purple-400" size={24} />
        Method 3 — Dialer Codes, Konami Codes & Hidden Menus
      </h2>
      <p className="text-gray-400 mb-2">
        Difficulty: <span className="text-green-400 font-semibold">Easy</span> · Risk: <span className="text-green-400 font-semibold">None</span> · Reversible: <span className="text-green-400 font-semibold">Yes</span>
      </p>
      <p className="text-gray-400 mb-6">
        KaiOS devices have hidden menus accessible through secret dialer codes and key combinations. These are manufacturer-specific and may or may not be active on your firmware.
      </p>

      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Hash size={18} className="text-cyan-400" />
        Dialer Codes — Try Every One
      </h3>

      <p className="text-sm text-gray-400 mb-4">Open the Phone/Dialer app and type these codes (they execute automatically when the last character is entered):</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {[
          { code: '*#*#33284#*#*', desc: 'Enable debug mode (standard KaiOS)', note: 'Should show 🐛 bug icon in status bar' },
          { code: '*#*#0574#*#*', desc: 'USB debugging toggle (Spreadtrum devices)', note: 'May work on Qualcomm too' },
          { code: '*#*#2886#*#*', desc: 'TCL/Alcatel hidden test menu', note: 'TCL-specific engineering menu' },
          { code: '*#*#3646633#*#*', desc: 'Engineering mode (MediaTek)', note: 'Unlikely on QM215 but worth trying' },
          { code: '*#06#', desc: 'Display IMEI', note: 'Useful to confirm phone identity' },
          { code: '*#*#372733#*#*', desc: 'FTM mode / Factory test', note: 'TCL factory test mode' },
          { code: '*#*#4636#*#*', desc: 'Testing / Phone info', note: 'Standard Android hidden menu' },
          { code: '*#*#8255#*#*', desc: 'Google Talk monitoring', note: 'Rare but occasionally works' },
          { code: '*#*#7378423#*#*', desc: 'Service menu', note: 'Common on some OEMs' },
          { code: '*#*#564564#*#*', desc: 'KaiOS Info', note: 'Shows KaiOS version details' },
          { code: '##33284##', desc: 'Alt debug code format', note: 'Without asterisks — some phones accept this' },
          { code: '*#*#824#*#*', desc: 'TCL engineering menu (alternate)', note: 'TCL-specific' },
        ].map(({ code, desc, note }) => (
          <div key={code} className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-4">
            <div className="font-mono text-lg text-cyan-400 font-bold mb-1">{code}</div>
            <div className="text-sm text-gray-300">{desc}</div>
            <div className="text-xs text-gray-500 mt-1">{note}</div>
          </div>
        ))}
      </div>

      <WarningBox level="info">
        Document which codes produce any response at all — even an error or momentary flicker — as this reveals what's active on the firmware.
      </WarningBox>

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Key size={18} className="text-yellow-400" />
        Konami Code (Hidden Engineering Menu)
      </h3>

      <StepCard number={1} title="Navigate to the hidden menu location">
        <p>Go to: <strong className="text-white">Settings → Device → Device Info → More Info</strong></p>
      </StepCard>

      <StepCard number={2} title="Enter the Konami Code">
        <p className="mb-3">While on the "More Info" screen, press the following softkey sequence:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {['SoftLeft', 'SoftLeft', 'SoftRight', 'SoftLeft', 'SoftRight', 'SoftRight'].map((key, i) => (
            <span key={i} className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg font-mono text-sm shadow-md">
              {key}
            </span>
          ))}
        </div>
        <p className="text-gray-400">This was confirmed working on the TCL Go Flip 4 5G (KaiOS 4.0). It may also work on KaiOS 3.1 TCL devices.</p>
      </StepCard>

      <StepCard number={3} title="Explore the hidden menu">
        <p>If a menu appears, document everything. Look for:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>ADB toggle</li>
          <li>Debug mode</li>
          <li>USB mode settings</li>
          <li>Factory test options</li>
          <li>Build info / engineering info</li>
        </ul>
      </StepCard>

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Key size={18} className="text-green-400" />
        Launch Engmode App from Browser
      </h3>

      <p className="text-sm text-gray-400 mb-3">
        On KaiOS 3, you can launch any installed app from the browser using <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">window.open</code> with the <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">kind=app</code> parameter.
      </p>

      <CodeBlock
        code={`// Type this in the browser URL bar:
javascript:void(window.open("http://engmode.localhost/manifest.webmanifest","_blank","kind=app,noopener=yes"))

// If that doesn't work, the manifest path may differ on TCL:
javascript:void(window.open("http://engmode.localhost/manifest.webapp","_blank","kind=app,noopener=yes"))`}
        language="javascript"
        title="Launch Engmode app from Browser"
      />

      <WarningBox level="info">
        The Engmode app (if present) is a factory/engineering application with access to system-level diagnostic and configuration functions. This includes toggling ADB, reading/writing NV items, running tests, and more.
      </WarningBox>
    </div>
  );
}
