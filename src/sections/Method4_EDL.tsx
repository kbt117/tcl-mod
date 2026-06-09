import { HardDrive, AlertTriangle } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import WarningBox from '../components/WarningBox';

export default function Method4_EDL() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <HardDrive className="text-orange-400" size={24} />
        Method 4 — EDL (Emergency Download) Mode
      </h2>
      <p className="text-gray-400 mb-2">
        Difficulty: <span className="text-red-400 font-semibold">Hard</span> · Risk: <span className="text-red-400 font-semibold">High (brick risk)</span> · Reversible: <span className="text-yellow-400 font-semibold">If you have backups</span>
      </p>
      <p className="text-gray-400 mb-6">
        EDL mode is a low-level Qualcomm feature that operates below the bootloader. It allows direct read/write access to eMMC partitions using a "firehose programmer" binary. This bypasses ALL software protections including SELinux, locked bootloaders, and KaiOS restrictions.
      </p>

      <WarningBox level="danger">
        <strong>This is hardware-level access.</strong> Writing wrong data to partitions WILL brick your phone. Always dump/backup EVERY partition before modifying anything. Have a plan to restore.
      </WarningBox>

      <StepCard number={1} title="Enter EDL Mode">
        <p className="mb-3">Power off the phone completely, then:</p>
        <div className="bg-gray-800/50 rounded-lg p-4 mb-3">
          <p className="font-semibold text-white mb-2">Hardware Method:</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Power off the device completely</li>
            <li>Hold <strong>Volume Up + Volume Down</strong> simultaneously</li>
            <li>While holding both volume keys, connect the USB cable to your computer</li>
            <li>Hold for 10-15 seconds</li>
          </ol>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 mb-3">
          <p className="font-semibold text-white mb-2">ADB Method (if ADB is working):</p>
          <CodeBlock code="adb reboot edl" language="bash" title="Reboot to EDL via ADB" />
        </div>
        <p className="text-sm text-gray-400">Your computer should detect the device as <code className="text-cyan-400 bg-gray-800 px-1 rounded text-xs">Qualcomm HS-USB QDLoader 9008</code></p>
      </StepCard>

      <StepCard number={2} title="Verify EDL Connection">
        <CodeBlock
          code={`# Linux: check if device is detected
lsusb | grep -i qualcomm
# Should show: Qualcomm, Inc. Gobi Wireless Modem (QDL mode)
# or: 05c6:9008

# Windows: check Device Manager
# Look for "Qualcomm HS-USB QDLoader 9008" under Ports
# You may need Qualcomm USB drivers installed`}
          language="bash"
          title="Verify EDL mode"
        />
      </StepCard>

      <StepCard number={3} title="Get the Firehose Programmer">
        <p className="mb-3">
          You need a firehose programmer binary (.mbn file) specific to the QM215 chipset. This is the trickiest part.
        </p>
        <CodeBlock
          code={`# Clone the EDL tools
git clone https://github.com/bkerler/edl.git
cd edl
pip3 install -r requirements.txt

# The tool includes some generic loaders
# For QM215 you may need to find/extract the right one

# Check BananaHackers' EDL archive for KaiOS loaders:
# https://edl.bananahackers.net

# The QM215 hardware ID will be something like:
# HWID: 0x000B60xxxx (check with edl tool)`}
          language="bash"
          title="Setup EDL tools"
        />
        <WarningBox level="warning">
          The firehose programmer must match your device's PK_HASH (the Qualcomm-signed key). If it doesn't match, EDL will reject it. Finding the right programmer may require extracting it from an OTA update or firmware dump.
        </WarningBox>
      </StepCard>

      <StepCard number={4} title="Dump all partitions (CRITICAL — backup first!)">
        <CodeBlock
          code={`# Using bkerler's edl tool:
python3 edl.py --loader=<your_loader.mbn> printgpt

# This will show all partitions. Common KaiOS partitions:
# boot, system, userdata, recovery, cache, modem, etc.

# Dump EVERYTHING:
python3 edl.py --loader=<your_loader.mbn> rl dumps --skip=userdata --genxml

# Or dump specific critical partitions:
python3 edl.py --loader=<your_loader.mbn> r boot boot.img
python3 edl.py --loader=<your_loader.mbn> r system system.img
python3 edl.py --loader=<your_loader.mbn> r recovery recovery.img
python3 edl.py --loader=<your_loader.mbn> r userdata userdata.img
python3 edl.py --loader=<your_loader.mbn> r cache cache.img`}
          language="bash"
          title="Dump partitions"
        />
      </StepCard>

      <StepCard number={5} title="Patch boot/system to enable ADB and root">
        <p className="mb-3">
          Once you have the partition dumps, you can modify them to enable ADB and gain root:
        </p>
        <CodeBlock
          code={`# Mount the system image (Linux)
mkdir /tmp/system_mount
sudo mount -o loop,rw system.img /tmp/system_mount

# Check for tctweb_server
ls -la /tmp/system_mount/bin/tctweb_server

# Check build properties
cat /tmp/system_mount/build.prop

# Modify build.prop to enable ADB:
echo "persist.service.adb.enable=1" >> /tmp/system_mount/build.prop
echo "ro.debuggable=1" >> /tmp/system_mount/build.prop
echo "service.adb.root=1" >> /tmp/system_mount/build.prop
echo "ro.secure=0" >> /tmp/system_mount/build.prop

# Add your ADB keys
mkdir -p /tmp/system_mount/../data/misc/adb
cp ~/.android/adbkey.pub /tmp/system_mount/../data/misc/adb/adb_keys

# Unmount
sudo umount /tmp/system_mount`}
          language="bash"
          title="Patch system image"
        />
      </StepCard>

      <StepCard number={6} title="Flash modified partitions back">
        <CodeBlock
          code={`# Flash the patched system image back:
python3 edl.py --loader=<your_loader.mbn> w system system.img

# For the boot partition, you may need to modify
# the kernel cmdline to set ro.debuggable=1
# This requires unpacking/repacking the boot image

# After flashing, reset the device:
python3 edl.py --loader=<your_loader.mbn> reset`}
          language="bash"
          title="Flash modified images"
        />
        <WarningBox level="danger">
          <strong>Double-check everything before flashing!</strong> If the system image is corrupted or incompatible, the phone won't boot. Keep your original dumps safe.
        </WarningBox>
      </StepCard>

      <div className="mt-6 bg-gray-900/60 border border-orange-500/20 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-orange-400" />
          Alternative: QFIL (Qualcomm Flash Image Loader)
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          If bkerler's edl tool doesn't work, try Qualcomm's official QFIL (part of QPST):
        </p>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">▸</span>
            <span>Download QPST/QFIL from Qualcomm (requires account)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">▸</span>
            <span>Install Qualcomm USB drivers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">▸</span>
            <span>Use QFIL in "Flat Build" mode with the correct firehose programmer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">▸</span>
            <span>This allows reading/writing individual partitions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
