import { withRegistry, Registry } from '@bem-react/di';

import { Topbar as TopbarCommon, cnTopbar } from '.';
import { TopbarLogo } from './Logo/Topbar-Logo';

const topbarRegistry = new Registry({ id: cnTopbar() });
topbarRegistry.set('TopbarLogo', TopbarLogo);

export const Topbar = withRegistry(topbarRegistry)(TopbarCommon);
