import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    
  },
  {
    name: 'users',
    url: '/user',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'List Owners',
        url: '/user/owner'
      },
      {
        name: 'Add Owner',
        url: '/user/addOwner'
      },
    ]
  },
  {
    name: 'stores',
    url: '/stores',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'All Stores',
        url: '/stores/allstore'
      },
      {
        name: 'Requested stores',
        url: '/stores/requeststore'
      },
      {
        name: 'Rejected stores',
        url: '/stores/rejectedstore'
      },
    ]
  },
];
