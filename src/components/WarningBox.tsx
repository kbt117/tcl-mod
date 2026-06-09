import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  children: React.ReactNode;
  level?: 'warning' | 'danger' | 'info';
}

export default function WarningBox({ children, level = 'warning' }: WarningBoxProps) {
  const styles = {
    warning: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-200',
    danger: 'border-red-500/40 bg-red-500/5 text-red-200',
    info: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-200',
  };

  const iconColor = {
    warning: 'text-yellow-400',
    danger: 'text-red-400',
    info: 'text-cyan-400',
  };

  return (
    <div className={`my-4 p-4 rounded-lg border ${styles[level]} flex gap-3`}>
      <AlertTriangle size={20} className={`${iconColor[level]} flex-shrink-0 mt-0.5`} />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
