import { useState } from 'react';
import {
  Smartphone,
  Globe,
  Server,
  Key,
  HardDrive,
  Package,
  Flame,
  ClipboardList,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  Shield,
} from 'lucide-react';

import DeviceOverview from './sections/DeviceOverview';
import Method1_W2D from './sections/Method1_W2D';
import Method2_TCTWebServer from './sections/Method2_TCTWebServer';
import Method3_HiddenMenus from './sections/Method3_HiddenMenus';
import Method4_EDL from './sections/Method4_EDL';
import Method5_Sideload from './sections/Method5_Sideload';
import Method6_Advanced from './sections/Method6_Advanced';
import Checklist from './sections/Checklist';
import Resources from './sections/Resources';

const sections = [
  { id: 'overview', label: 'Device Profile', icon: Smartphone, color: 'text-cyan-400' },
  { id: 'w2d', label: '1. W2D Browser Jailbreak', icon: Globe, color: 'text-green-400' },
  { id: 'tct', label: '2. TCT Web Server Exploit', icon: Server, color: 'text-red-400' },
  { id: 'hidden', label: '3. Dialer & Hidden Menus', icon: Key, color: 'text-purple-400' },
  { id: 'edl', label: '4. EDL Mode (Hardware)', icon: HardDrive, color: 'text-orange-400' },
  { id: 'sideload', label: '5. Sideload & Remove Apps', icon: Package, color: 'text-blue-400' },
  { id: 'advanced', label: '6. Advanced / Experimental', icon: Flame, color: 'text-orange-400' },
  { id: 'checklist', label: 'Progress Checklist', icon: ClipboardList, color: 'text-green-400' },
  { id: 'resources', label: 'Resources & Links', icon: BookOpen, color: 'text-purple-400' },
];

function renderSection(id: string) {
  switch (id) {
    case 'overview': return <DeviceOverview />;
    case 'w2d': return <Method1_W2D />;
    case 'tct': return <Method2_TCTWebServer />;
    case 'hidden': return <Method3_HiddenMenus />;
    case 'edl': return <Method4_EDL />;
    case 'sideload': return <Method5_Sideload />;
    case 'advanced': return <Method6_Advanced />;
    case 'checklist': return <Checklist />;
    case 'resources': return <Resources />;
    default: return <DeviceOverview />;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen terminal-bg text-gray-200 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0a0d12] border-r border-gray-800/50 flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo area */}
        <div className="p-5 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-tight">TCL T435D</h1>
              <p className="text-cyan-400 text-xs font-mono">KaiOS 3.1 Hack Guide</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-5 right-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Attack tree */}
        <div className="p-3 border-b border-gray-800/50">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold px-2 mb-2">Attack Path</p>
          <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500 px-2 flex-wrap">
            <span className="text-green-400">W2D</span>
            <ChevronRight size={10} />
            <span className="text-red-400">TCT</span>
            <ChevronRight size={10} />
            <span className="text-purple-400">Codes</span>
            <ChevronRight size={10} />
            <span className="text-orange-400">EDL</span>
            <ChevronRight size={10} />
            <span className="text-blue-400">Sideload</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sections.map(section => {
            const Icon = section.icon;
            const active = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200 ${
                  active
                    ? 'bg-cyan-500/10 text-white border border-cyan-500/30'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                }`}
              >
                <Icon size={16} className={active ? section.color : 'text-gray-600'} />
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800/50">
          <p className="text-[10px] text-gray-600 leading-relaxed">
            ⚠️ For educational & personal use on devices you own. Modifying your device may void warranty and violate ToS.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0d12]/90 backdrop-blur-md border-b border-gray-800/50 px-4 py-3 flex items-center gap-3 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-800 text-gray-400"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">
              {sections.find(s => s.id === activeSection)?.label}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-600 hidden sm:block">
              Qualcomm 215 · Gecko 84.0 · SELinux Enforcing
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Guide active" />
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 p-4 lg:p-8 max-w-4xl">
          {activeSection === 'overview' && (
            <div className="mb-8 animate-fade-in">
              <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  TCL T435D <span className="text-cyan-400">KaiOS 3.1</span>
                </h1>
                <h2 className="text-lg text-gray-300 mb-4">
                  Debug · Root · Remove Apps · Sideload
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  This is a comprehensive, research-backed guide for gaining debug access, root privileges,
                  and full app management on the TCL Flip 3 (T435D) running KaiOS 3.1. We combine 6 attack
                  vectors — from simple browser-based jailbreaks to hardware-level EDL flashing — organized
                  from easiest to most advanced. Work through them in order.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Qualcomm 215', 'Gecko 84.0', 'WebActivity', 'tctweb_server', 'EDL 9008', 'CVE-2023-33294'].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-cyan-400 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {renderSection(activeSection)}
        </div>
      </main>
    </div>
  );
}
