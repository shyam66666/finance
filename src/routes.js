// import React from 'react'

// const Finances = React.lazy(() => import('./views/finances/Finances'))
// const Farmer = React.lazy(() => import('./views/farmer/Farmer'))
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/views/finances/Finances', name: 'Dashboard', element: Finances },
//   { path: '/farmer', name: 'Farmer', element: Farmer },
//   { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
//   { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
//   { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
//   { path: '/widgets', name: 'Widgets', element: Widgets },
// ]

// export default routes
import React from 'react'

const Finances = React.lazy(() => import('./views/finances/Finances'))
const DailyRegistration = React.lazy(() => import('./views/finances/DailyRegistration'))
const MonthlyRegistration = React.lazy(() => import('./views/finances/MonthlyRegistration'))
const YearlyRegistration = React.lazy(() => import('./views/finances/YearlyRegistration'))
const FarmerRegistration = React.lazy(() => import('./views/finances/FarmerRegistration'))
const Farmer = React.lazy(() => import('./views/farmer/Farmer'))
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/finances', name: 'Dashboard', element: Finances },
  { path: '/finances/FarmerRegistration', name: 'FarmerRegistration', element: FarmerRegistration },
  { path: '/finances/DailyRegistration', name: 'DailyRegistration', element: DailyRegistration },
  { path: '/finances/MonthlyRegistration', name: 'MonthlyRegistration', element: MonthlyRegistration },
  { path: '/finances/YearlyRegistration', name: 'YearlyRegistration', element: YearlyRegistration },
  { path: '/farmer', name: 'Farmer', element: Farmer },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes

