export type StatusVariant = 'alive' | 'dead' | 'unknown';
import './status-dot.css';


const StatusDot = ({ variant }: { variant: StatusVariant }) => {
  return <span className={`status-dot status-dot_variant_${variant}`} />;
};

export default StatusDot;
