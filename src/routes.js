import React from 'react'

const Finances = React.lazy(() => import('./views/finances/Finances'))
const Farmer = React.lazy(() => import('./views/farmer/Farmer'))
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/finances', name: 'Dashboard', element: Finances },
  { path: '/farmer', name: 'Farmer', element: Farmer },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
