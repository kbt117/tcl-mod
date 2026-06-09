import { useState } from 'react';
import { CheckSquare, Square, ClipboardList } from 'lucide-react';

interface CheckItem {
  id: string;
  text: string;
  category: string;
}

const items: CheckItem[] = [
  { id: '1', category: 'Recon', text: 'Confirmed device model: TCL T435D' },
  { id: '2', category: 'Recon', text: 'Confirmed KaiOS version in Settings → Device → Device Info' },
  { id: '3', category: 'Recon', text: 'Checked build.prop / firmware version' },
  { id: '4', category: 'W2D', text: 'Opened w2d.js.org in built-in Browser' },
  { id: '5', category: 'W2D', text: 'Clicked "Open Developer menu" button' },
  { id: '6', category: 'W2D', text: 'Developer menu appeared: Yes / No' },
  { id: '7', category: 'W2D', text: 'Toggled ADB & DevTools — bug icon appeared: Yes / No' },
  { id: '8', category: 'Codes', text: 'Tried dialer code *#*#33284#*#*' },
  { id: '9', category: 'Codes', text: 'Tried dialer code *#*#0574#*#*' },
  { id: '10', category: 'Codes', text: 'Tried dialer code *#*#2886#*#*' },
  { id: '11', category: 'Codes', text: 'Tried Konami code in Settings → Device Info → More Info' },
  { id: '12', category: 'Codes', text: 'Tried launching Engmode via window.open from browser' },
  { id: '13', category: 'TCTWeb', text: 'Probed http://127.0.0.1:2929 in browser' },
  { id: '14', category: 'TCTWeb', text: 'Server responded: Yes / No / Error' },
  { id: '15', category: 'TCTWeb', text: 'Tested cmd=bash commands' },
  { id: '16', category: 'TCTWeb', text: 'Tested name=query property queries' },
  { id: '17', category: 'Engmode', text: 'Tested navigator.b2g.engmodeManager API in browser' },
  { id: '18', category: 'Engmode', text: 'Tested navigator.engmodeExtension API in browser' },
  { id: '19', category: 'ADB', text: 'Connected phone to computer via USB' },
  { id: '20', category: 'ADB', text: 'adb devices shows the device' },
  { id: '21', category: 'ADB', text: 'adb root works' },
  { id: '22', category: 'ADB', text: 'adb shell accessible' },
  { id: '23', category: 'EDL', text: 'Entered EDL mode (Vol Up+Down + USB)' },
  { id: '24', category: 'EDL', text: 'Device detected as Qualcomm 9008' },
  { id: '25', category: 'EDL', text: 'Found working firehose programmer for QM215' },
  { id: '26', category: 'EDL', text: 'Dumped all partitions as backup' },
  { id: '27', category: 'Fastboot', text: 'Entered Fastboot mode' },
  { id: '28', category: 'Fastboot', text: 'Probed fastboot oem commands' },
  { id: '29', category: 'Fastboot', text: 'Tried cache injection' },
  { id: '30', category: 'Sideload', text: 'Successfully sideloaded an app' },
  { id: '31', category: 'Sideload', text: 'Successfully removed a bloatware app' },
  { id: '32', category: 'Root', text: 'Achieved root shell access' },
];

export default function Checklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [...new Set(items.map(i => i.category))];
  const progress = Math.round((checked.size / items.length) * 100);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <ClipboardList className="text-green-400" size={24} />
        Progress Checklist
      </h2>
      <p className="text-gray-400 mb-4">
        Track what you've tried and what worked. Check off items as you go.
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-cyan-400 font-mono">{checked.size}/{items.length} ({progress}%)</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {categories.map(cat => (
        <div key={cat} className="mb-5">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {cat}
          </h3>
          <div className="space-y-1">
            {items.filter(i => i.category === cat).map(item => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg text-left text-sm transition-colors ${
                  checked.has(item.id)
                    ? 'bg-green-500/10 text-green-300'
                    : 'bg-gray-900/40 text-gray-400 hover:bg-gray-800/60 hover:text-gray-300'
                }`}
              >
                {checked.has(item.id) ? (
                  <CheckSquare size={16} className="text-green-400 flex-shrink-0" />
                ) : (
                  <Square size={16} className="text-gray-600 flex-shrink-0" />
                )}
                <span className={checked.has(item.id) ? 'line-through opacity-60' : ''}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
