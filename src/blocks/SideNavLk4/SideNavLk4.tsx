import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import {
  cnSideNav,
  ISideNavProps,
  SideNavTitle,
  SideNavContent,
  SideNavLink
} from '.';

import './SideNavLk4.scss';
import './_active/SideNav-Item_active.scss';
import './_expanded/SideNav-Item_expanded.scss';

export const SideNavLk4: FC<ISideNavProps> = ({
  navItems,
  activeNavItem,
  handleNavItemClick,
  handleNavLinkClick,
  className
}) => {
  const initialExpandedId = useMemo(() => activeNavItem.id, []);

  const [expandedItemId, setExpandedItemId] = useState(initialExpandedId);

  const isActive = useCallback((navItemId: string) => navItemId === activeNavItem.id, [activeNavItem.id]);

  useEffect(() => {
    if (activeNavItem.link && navItems) {
      const sectionId = navItems.find(item =>
        item.links.some(link => link.to === activeNavItem.link)
      )?.id;

      if (sectionId && sectionId !== expandedItemId) {
        setExpandedItemId(sectionId);
      }
    }
  }, [activeNavItem.link, navItems]);

  const handleTitleClick = useCallback((navItemId: string) => {
    setExpandedItemId(prev => prev === navItemId ? '' : navItemId);
    handleNavItemClick(navItemId);
  }, [handleNavItemClick]);

  const handleLinkClick = useCallback((ev: React.MouseEvent, navLinkId: string) => {
    handleNavLinkClick({ev, navLinkId});
  }, [handleNavLinkClick]);

  return (
    <ul className={cnSideNav(null, [className])}>
      {navItems?.map((item) => (
        <li
          key={item.id}
          className={cnSideNav('Item', {
            active: isActive(item.id),
            expanded: expandedItemId === item.id
          })}
        >
          <SideNavTitle
            className={cnSideNav('Title')}
            handleNavItemClick={() => handleTitleClick(item.id)}
          >
            {item.title}
          </SideNavTitle>
          <SideNavContent
            className={cnSideNav('Content')}
            visible={expandedItemId === item.id}
          >
            {item.links.map((link) => (
              <SideNavLink
                key={`${item.id}-${link.to}`}
                href={link.to}
                active={link.to === activeNavItem.link}
                handleClick={(ev) => handleLinkClick(ev, link.to)}
              >
                {link.text}
              </SideNavLink>
            ))}
          </SideNavContent>
        </li>
      ))}
    </ul>
  );
};
