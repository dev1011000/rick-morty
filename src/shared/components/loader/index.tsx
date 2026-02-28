import { forwardRef } from 'react';

import { PortalImage } from '@/assets';
import { cn } from '@/shared/lib';

import './loader.scss';

type LoaderSize = 'small' | 'large';

type LoaderProps = {
  size: LoaderSize;
  caption?: string;
  className?: string;
};

const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ size, caption, className }, ref) => {
  return (
    <div ref={ref} className={cn('loader', `loader--size-${size}`, className)}>
      <div className="loader__icon" aria-hidden="true">
        <PortalImage />
      </div>

      {caption ? <div className="loader__caption">{caption}</div> : null}
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;
