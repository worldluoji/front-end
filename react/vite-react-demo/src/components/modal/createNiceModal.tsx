import useNiceModal from './useNiceModal'
export const createNiceModal = (modalId: string, Comp: React.ComponentType<unknown>) => {
  return (props: unknown) => {
    const { visible, args } = useNiceModal(modalId)
    if (!visible) { 
      return null 
    }
    const safeArgs = typeof args === 'object' && args !== null ? args : {}
    const safeProps = typeof props === 'object' && props !== null ? props : {}
    return <Comp {...safeArgs} {...safeProps} />
  }
}