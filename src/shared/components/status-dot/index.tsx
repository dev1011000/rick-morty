import { cn } from '@/shared/lib';
import type { StatusVariant } from '@/shared/types';
import './status-dot.scss';

const StatusDot = ({ variant }: { variant: StatusVariant }) => {
  return <span className={cn('status-dot', `status-dot--variant-${variant}`)} />;
};

export default StatusDot;
