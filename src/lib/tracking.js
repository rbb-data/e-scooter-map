export default function (event) {
  if (typeof window.callAnalytics === 'function') {
    window.callAnalytics('pi', 'rbb-data-e-scooter', event)
  }
}
