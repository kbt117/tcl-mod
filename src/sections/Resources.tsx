import { BookOpen, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Essential Tools',
    items: [
      { name: 'W2D — Launch hidden KaiOS settings', url: 'https://w2d.js.org', desc: 'WebActivity-based tool to open Developer menu from browser' },
      { name: 'BananaHackers Wiki', url: 'https://wiki.bananahackers.net', desc: 'Community wiki for KaiOS hacking — device lists, guides, and tools' },
      { name: 'bkerler EDL Tool', url: 'https://github.com/bkerler/edl', desc: 'Python-based Qualcomm EDL/Firehose client for partition management' },
      { name: 'BananaHackers EDL Loaders', url: 'https://edl.bananahackers.net', desc: 'Archive of firehose programmer binaries for KaiOS devices' },
      { name: 'ADB Platform Tools', url: 'https://developer.android.com/tools/releases/platform-tools', desc: 'Official Android Debug Bridge download' },
    ],
  },
  {
    category: 'KaiOS 3 Specific',
    items: [
      { name: 'KaiOS Developer Portal', url: 'https://developer.kaiostech.com', desc: 'Official developer tools, docs, and app submission' },
      { name: 'appscmd — KaiOS 3 App Manager', url: 'https://github.com/nictas/appscmd-bin', desc: 'Community builds of the KaiOS 3 app management CLI' },
      { name: 'kaios-devtool-extension', url: 'https://github.com/nictas/kaios-devtool-extension', desc: 'Firefox extension for KaiOS 3 development' },
    ],
  },
  {
    category: 'Security Research',
    items: [
      { name: 'kaios.dev — CVE-2023-33294', url: 'https://kaios.dev/cve/1411380', desc: 'Root command execution via tctweb_server (KaiOS 3.0)' },
      { name: 'kaios.dev — System Properties', url: 'https://kaios.dev/2024/03/kaios-system-properties/', desc: 'Deep dive on KaiOS system properties and Engmode API' },
      { name: 'kaios.dev — TCL Go Flip 4 5G Analysis', url: 'https://kaios.dev/2026/03/a-closer-look-at-the-tcl-go-flip-4-5g-and-kaios-4.0/', desc: 'Latest research on TCL KaiOS devices, tctweb_server status' },
      { name: 'NCC Group KaiOS Security Whitepaper', url: 'https://d3adend.org/papers/KaiOS-Whitepaper_1.3.pdf', desc: 'Professional security audit of KaiOS — browser over-permissioning' },
      { name: 'kaios.dev — KaiOS User Agents', url: 'https://kaios.dev/2024/02/deep-dive-on-kaios-user-agents/', desc: 'Confirms TCL T435D runs KaiOS 3.1 with Gecko 84.0' },
    ],
  },
  {
    category: 'Community',
    items: [
      { name: 'r/KaiOS Subreddit', url: 'https://www.reddit.com/r/KaiOS/', desc: 'Primary community hub — research, Q&A, device reports' },
      { name: 'KaiOS Discord', url: 'https://discord.gg/kaios', desc: 'Real-time community chat — get help from experienced hackers' },
      { name: 'Nokia 2780 Weeknd Toolbox', url: 'https://git.abscue.de/affe_null/weeknd-toolbox', desc: 'Jailbreak toolbox for Nokia KaiOS 3.1 — research applicable to TCL' },
    ],
  },
  {
    category: 'KaiOS 2.5 Tools (Reference)',
    items: [
      { name: 'Wallace Toolbox', url: 'https://gitlab.com/nictas/nictas/-/tree/main/', desc: 'Universal KaiOS 2.5 tweaking toolbox (not compatible with v3)' },
      { name: 'OmniSD', url: 'https://nictas.gitlab.io/', desc: 'Privileged factory reset tool for KaiOS 2.5 jailbreak' },
      { name: 'AppBuster', url: 'https://nictas.gitlab.io/', desc: 'App disabler for KaiOS 2.5 — disable bloatware without root' },
      { name: 'Waterfox Classic', url: 'https://classic.waterfox.net', desc: 'Browser with WebIDE support for KaiOS 2.5 development' },
    ],
  },
];

export default function Resources() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <BookOpen className="text-purple-400" size={24} />
        Resources & Links
      </h2>
      <p className="text-gray-400 mb-6">
        Every tool, document, and community resource referenced in this guide.
      </p>

      {resources.map(group => (
        <div key={group.category} className="mb-6">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {group.category}
          </h3>
          <div className="space-y-2">
            {group.items.map(item => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-900/60 border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-gray-800/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">{item.name}</span>
                  <ExternalLink size={14} className="text-gray-500 group-hover:text-cyan-400" />
                </div>
                <p className="text-xs text-gray-500">{item.desc}</p>
                <p className="text-xs text-cyan-600 font-mono mt-1">{item.url}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
