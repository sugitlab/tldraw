import { useTLDrawContext } from '../hooks'
import { Data } from '../state2'
import styled from '../styles'

const activeToolSelector = (s: Data) => s.appState.activeTool

export function StatusBar(): JSX.Element | null {
  const { useAppState } = useTLDrawContext()
  const activeTool = useAppState(activeToolSelector)

  return (
    <StatusBarContainer size={{ '@sm': 'small' }}>
      <Section>{activeTool}</Section>
      {/* <Section>{shapesInView || '0'} Shapes</Section> */}
    </StatusBarContainer>
  )
}

const StatusBarContainer = styled('div', {
  height: 40,
  userSelect: 'none',
  borderTop: '1px solid $border',
  gridArea: 'status',
  display: 'flex',
  color: '$text',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '$panel',
  gap: 8,
  fontFamily: '$ui',
  fontSize: '$0',
  padding: '0 16px',

  variants: {
    size: {
      small: {
        fontSize: '$1',
      },
    },
  },
})

const Section = styled('div', {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
})
