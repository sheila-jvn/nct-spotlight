import { DeltaProvider } from '@/components/DeltaProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <DeltaProvider>{children}</DeltaProvider>
}
