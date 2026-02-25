import { PortalImage } from '@/assets';
import { cn } from '@/shared/lib';

import './loader.scss';

type LoaderSize = 'small' | 'large';

type LoaderProps = {
  size: LoaderSize;
  caption?: string;
  className?: string;
};

const Loader = ({ size, caption, className }: LoaderProps) => {
  return (
    <div className={cn('loader', `loader--size-${size}`, className)}>
      <div className="loader__icon" aria-hidden="true">
        <PortalImage />
      </div>

      {caption ? <div className="loader__caption">{caption}</div> : null}
    </div>
  );
};

export default Loader;
