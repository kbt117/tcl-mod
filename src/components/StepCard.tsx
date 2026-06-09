interface StepCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
  status?: 'pending' | 'active' | 'done';
}

export default function StepCard({ number, title, children, status = 'pending' }: StepCardProps) {
  const statusColors = {
    pending: 'border-gray-700 bg-gray-900/40',
    active: 'border-cyan-500/50 bg-cyan-500/5 glow-border',
    done: 'border-green-500/40 bg-green-500/5',
  };

  const numberColors = {
    pending: 'bg-gray-700 text-gray-300',
    active: 'bg-cyan-500 text-black',
    done: 'bg-green-500 text-black',
  };

  return (
    <div className={`rounded-xl border p-5 mb-4 transition-all duration-300 ${statusColors[status]}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${numberColors[status]}`}>
          {status === 'done' ? '✓' : number}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="pl-11 text-gray-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
