import classNames from 'classnames';
import { RiLogoutCircleRLine, RiMailLine, RiUserLine } from 'react-icons/ri';

import DropdownComponent from 'shared/components/dropdown/dropdown.component';
import { DropdownItem } from 'shared/components/dropdown/interfaces/dropdown.interface';

import { AuthDropdownProps } from './interfaces/auth-dropdown.interface';

export default function AuthDropdownComponent({
  userEmail,
  signOut,
}: AuthDropdownProps): JSX.Element {
  const accountDropdown: DropdownItem[] = [
    {
      id: 1,
      elementType: 'text',
      icon: <RiMailLine className="u-text-base-3 u-mr-5" size={15} />,
      label: userEmail,
      maxWidth: '180px',
      hasDivider: true,
      isActive: true,
    },
    {
      id: 2,
      elementType: 'button',
      icon: <RiLogoutCircleRLine className="u-text-base-3 u-mr-5" size={15} />,
      label: 'Sair',
      isActive: true,
      action: signOut,
    },
  ];

  return (
    <DropdownComponent
      buttonAppearance="round"
      buttonColor="transparent"
      buttonActiveColor="primary"
      buttonIcon={<RiUserLine className="u-flex-shrink-0" size={20} />}
      buttonStyleClasses={classNames({
        'u-display-flex': true,
        'u-border-width-1': true,
      })}
      listItems={accountDropdown}
    />
  );
}
