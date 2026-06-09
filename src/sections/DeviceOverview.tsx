import { Cpu, Smartphone, Shield, Wifi } from 'lucide-react';

export default function DeviceOverview() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Smartphone className="text-cyan-400" size={24} />
        Device Profile — TCL T435D
      </h2>
      <p className="text-gray-400 mb-6">
        Understanding the hardware and software stack is critical before attempting anything.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
            <Cpu size={18} /> Hardware
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Chipset', 'Qualcomm 215 (QM215)'],
                ['CPU', '4× Cortex-A53 @ 1.3GHz'],
                ['GPU', 'Adreno 308'],
                ['RAM', '1 GB'],
                ['Storage', '16 GB eMMC'],
                ['Display', '3.2" TFT 240×320'],
                ['Battery', '1850 mAh Li-Ion'],
                ['SIM', 'Nano-SIM'],
              ].map(([key, val]) => (
                <tr key={key} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-1.5 text-gray-500 pr-4 font-mono text-xs">{key}</td>
                  <td className="py-1.5 text-gray-300">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
            <Shield size={18} /> Software Stack
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['OS', 'KaiOS 3.1'],
                ['Gecko Engine', 'Firefox 84.0 (rv:84.0)'],
                ['User Agent', 'Mozilla/5.0 (Mobile; TCL T435D; rv:84.0)'],
                ['Base', 'Boot2Gecko (B2G) / AOSP'],
                ['SELinux', 'Enforcing'],
                ['Known As', 'TCL Flip 3'],
                ['Market', 'USA (Tracfone)'],
                ['Build Type', 'user (likely)'],
              ].map(([key, val]) => (
                <tr key={key} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-1.5 text-gray-500 pr-4 font-mono text-xs">{key}</td>
                  <td className="py-1.5 text-gray-300">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 mb-6">
        <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
          <Wifi size={18} /> Architecture Stack
        </h3>
        <div className="flex flex-col gap-1 text-sm font-mono">
          {[
            { layer: 'Gaia', desc: 'UI layer — HTML5/CSS/JS apps (Settings, Browser, etc.)', color: 'text-purple-400' },
            { layer: 'Gecko (84.0)', desc: 'Web engine — renders apps, handles WebActivity/APIs', color: 'text-blue-400' },
            { layer: 'Gonk', desc: 'HAL + Linux kernel + Android libs (camera, GPS, RIL)', color: 'text-green-400' },
            { layer: 'Linux Kernel', desc: 'Custom kernel for QM215, SELinux enforcing', color: 'text-yellow-400' },
            { layer: 'Bootloader', desc: 'Qualcomm Primary/Secondary bootloader, EDL mode', color: 'text-red-400' },
          ].map(({ layer, desc, color }) => (
            <div key={layer} className="flex items-start gap-3 py-2 px-3 bg-gray-800/30 rounded-lg">
              <span className={`${color} font-bold min-w-[130px]`}>{layer}</span>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-2">🎯 Why This Device is Interesting</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span><strong className="text-white">Qualcomm chipset</strong> — EDL (Emergency Download) mode is available for low-level partition access</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span><strong className="text-white">TCL manufacturer</strong> — the <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">tctweb_server</code> binary is TCL-specific and was confirmed present on KaiOS 3.0 TCL devices. It was reported "removed in KaiOS 3.1" but this was based on Nokia builds. On your TCL device, it <strong className="text-yellow-300">may still be present</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span><strong className="text-white">WebActivity API</strong> — confirmed working on KaiOS 3 from the browser, enabling W2D jailbreak to open hidden Developer menu</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span><strong className="text-white">Engmode app</strong> — can potentially be launched from the browser using <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">window.open</code> with the <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">kind=app</code> parameter</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
