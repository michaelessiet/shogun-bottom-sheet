export { BottomSheet } from './components/BottomSheet'
export { PortalProvider } from '@gorhom/portal'

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a ** b)
}
