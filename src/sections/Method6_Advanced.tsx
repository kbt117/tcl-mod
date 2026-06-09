import { Flame, Terminal, Wrench } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import WarningBox from '../components/WarningBox';

export default function Method6_Advanced() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Flame className="text-orange-400" size={24} />
        Method 6 — Advanced & Experimental Techniques
      </h2>
      <p className="text-gray-400 mb-2">
        Difficulty: <span className="text-red-400 font-semibold">Expert</span> · Risk: <span className="text-red-400 font-semibold">Very High</span> · Status: <span className="text-yellow-400 font-semibold">Experimental / Unconfirmed</span>
      </p>
      <p className="text-gray-400 mb-6">
        These are techniques that have worked on similar devices or are theoretically possible on the TCL T435D but haven't been fully confirmed. Use these as a research starting point.
      </p>

      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Terminal size={18} className="text-green-400" />
        A. Cache Injection (Qualcomm/Fastboot)
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        This method writes a special file to the cache partition that triggers the Developer menu to appear on next boot.
        Originally developed for MediaTek devices but theoretically works on Qualcomm devices with fastboot access.
      </p>

      <StepCard number={1} title="Enter Fastboot mode">
        <CodeBlock
          code={`# Via ADB (if available):
adb reboot bootloader

# Via hardware keys (power off first):
# Hold Volume Down + Power until you see fastboot text
# OR some TCL: Hold Volume Up + Power

# Check connection:
fastboot devices`}
          language="bash"
          title="Enter Fastboot"
        />
      </StepCard>

      <StepCard number={2} title="Flash cache with jailbreak payload">
        <CodeBlock
          code={`# Create the cache image with the magic file:
# The file /cache/__post_reset_cmd__ containing "root"
# triggers the Developer menu on boot

# If you have a pre-built cache-jb.img:
fastboot flash cache cache-jb.img -u

# Or try creating it manually:
mkdir cache_temp
echo "root" > cache_temp/__post_reset_cmd__

# Create an ext4 image (Linux):
dd if=/dev/zero of=cache-jb.img bs=1M count=16
mkfs.ext4 cache-jb.img
mkdir /tmp/cache_mount
sudo mount -o loop cache-jb.img /tmp/cache_mount
echo "root" | sudo tee /tmp/cache_mount/__post_reset_cmd__
sudo umount /tmp/cache_mount

fastboot flash cache cache-jb.img
fastboot reboot`}
          language="bash"
          title="Cache injection"
        />
        <WarningBox level="warning">
          After reboot, check Settings → Device for a new "Developer" menu. If it appears, you've successfully jailbroken the device.
        </WarningBox>
      </StepCard>

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Wrench size={18} className="text-purple-400" />
        B. Fastboot OEM Commands
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        Some KaiOS devices expose custom <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">fastboot oem</code> commands.
        The Nokia 2780 Flip (KaiOS 3.1) was found to have <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">fastboot oem sudo</code> which allowed writing a custom recovery image. Probe your device for similar commands:
      </p>

      <CodeBlock
        code={`# Enter fastboot mode first, then probe:
fastboot oem help
fastboot oem device-info
fastboot oem unlock
fastboot oem sudo
fastboot oem get-bsn
fastboot oem get-psn
fastboot oem get-hwid

# Try unlocking bootloader:
fastboot flashing unlock
fastboot oem unlock

# Check if dm-verity can be disabled:
fastboot oem disable-dm-verity

# Check for TCL-specific OEM commands:
fastboot oem tcl_unlock
fastboot oem ftm_mode`}
        language="bash"
        title="Probe fastboot OEM commands"
      />

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Terminal size={18} className="text-cyan-400" />
        C. API Daemon Exploitation (Port 80)
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        KaiOS 3 runs an <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">api-daemon</code> on localhost port 80 that provides platform APIs.
        While it's designed for certified apps, it may be accessible from the browser:
      </p>

      <CodeBlock
        code={`// Probe the api-daemon from the browser:
fetch('http://localhost/api/v1/apps/getall')
  .then(r => r.json())
  .then(data => {
    document.body.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
  })
  .catch(e => document.title = 'Error: ' + e.message);

// Try alternative endpoints:
fetch('http://api.localhost/apps/getall')
  .then(r => r.json())
  .then(console.log);

// The api-daemon manages app installation:
// If accessible, you could potentially install apps through it`}
        language="javascript"
        title="Probe api-daemon"
      />

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Terminal size={18} className="text-yellow-400" />
        D. Engmode API Exploitation
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        On KaiOS 2.5, the browser was over-permissioned with <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">engmode</code> permissions, allowing JavaScript on any website to access the Engmode API.
        This may still be partially true on KaiOS 3.1:
      </p>

      <CodeBlock
        code={`// KaiOS 3 Engmode API (if browser has engmode permission):
navigator.b2g.engmodeManager.getPropertyValue("ro.build.type")
  .then(v => document.title = "Build: " + v);

navigator.b2g.engmodeManager.getPropertyValue("ro.debuggable")
  .then(v => document.title = "Debuggable: " + v);

// The big one — try enabling ADB:
navigator.b2g.engmodeManager.setPropertyValue(
  "persist.service.adb.enable", "1"
);

// Try enabling developer mode:
navigator.b2g.engmodeManager.setPropertyValue(
  "persist.sys.usb.config", "adb"
);

// KaiOS 2.5 syntax (might also work):
navigator.engmodeExtension.getPropertyValue("ro.build.type");`}
        language="javascript"
        title="Engmode API from browser"
      />

      <WarningBox level="info">
        The NCC Group security audit found that the browser's over-permissioning "remains true across all tested versions of KaiOS 2.5." Whether this extends to KaiOS 3.1 on TCL devices is unconfirmed — <strong>but worth testing</strong>.
      </WarningBox>

      <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-2">
        <Terminal size={18} className="text-red-400" />
        E. KaiOS Developer Portal (Official Route)
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        As a last resort, KaiOS has an official Developer Portal where you can submit apps to the KaiStore.
        If accepted, your app will be installable on all KaiOS devices including yours:
      </p>

      <CodeBlock
        code={`# Register at: https://developer.kaiostech.com/
# Submit your app for review
# Once approved, install from KaiStore on your device

# The developer account also gives access to:
# - appscmd tool
# - Device simulator
# - API documentation
# - Debug tools (for authorized developer devices)`}
        language="bash"
        title="Official developer route"
      />
    </div>
  );
}
