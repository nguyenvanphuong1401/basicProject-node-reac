// import Carrier from "./pages/carriers/carriers";

export const adminMenu = [
  {
    title: 'Users',
    router: '/admin/users-manager',
    icon: 'user',
    role: ['Administrator'],
    //team_role: ['Admin']
  },
  {
    title: 'Sites',
    router: '/sites',
    icon: 'global',
    //role: ['Administrator', 'Seller'],
    team_role: ['Admin']
  },
  {
    title: 'Products',
    router: '/products',
    icon: 'appstore',
    //role: ['Administrator', 'Seller'],
    team_role: ['Admin', 'Supporter']
  },
  {
    title: 'Orders',
    router: '/orders',
    icon: 'ordered-list',
    team_role: ['Admin', 'Supporter']
  },
  {
    title: "Customers",
    router: '/customers',
    icon: 'user',
    team_role: ['Admin', 'Supporter']
  },
  {
    title: "Members",
    router: '/members',
    icon: 'smile',
    team_role: ['Admin']
  },
  {
    title: "Tasks",
    router: '/tasks',
    icon: 'snippets',
    team_role: ['Admin', 'Supporter', 'Designer']
  },
  {
    title: 'App Settings',
    icon: 'setting',
    child: [
      {
        title: 'Categories',
        router: '/admin/categories',
        icon: 'unordered-list'
      },
      {
        title: 'Product Type',
        router: '/admin/product-types',
        icon: 'skin'
      },
      {
        title: 'Carrier',
        router:'/admin/carriers',
        icon: 'car'

      },
    ]
  },
]