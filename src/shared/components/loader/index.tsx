import { PortalImage } from '@/assets';

import './loader.css';

type LoaderSize = 'small' | 'large';

type LoaderProps = {
  size: LoaderSize;
  caption?: string;
};

const Loader = ({ size, caption }: LoaderProps) => {
  return (
    <div className={`loader loader_size_${size}`}>
      <div className="loader__icon" aria-hidden="true">
        <PortalImage />
      </div>

      {caption ? <div className="loader__caption">{caption}</div> : null}
    </div>
  );
};

export default Loader;
