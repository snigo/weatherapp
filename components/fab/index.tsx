import Link from 'next/link';
import { FunctionComponent } from 'react';

import css from './fab.module.scss';

interface FabProps {
  href: string;
  label: string;
}

const Fab: FunctionComponent<FabProps> = ({ href, label }) => (
  <div className={css.fab}>
    <Link href={href}>
      <a>{label}</a>
    </Link>
  </div>
);

export default Fab;
