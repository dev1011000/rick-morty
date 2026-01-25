import { cn } from '@/shared/lib/cn/cn';
import './status-dot.css';

export type StatusVariant = 'alive' | 'dead' | 'unknown';

const StatusDot = ({ variant }: { variant: StatusVariant }) => {
  return <span className={cn('status-dot', `status-dot--variant-${variant}`)} />;
};

export default StatusDot;
