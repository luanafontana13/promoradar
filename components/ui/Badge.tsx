interface BadgeProps {
  children: React.ReactNode
  color?: string
  small?: boolean
}

export default function Badge({ children, color = '#00C853', small }: BadgeProps) {
  return (
    <span style={{
      background: color + '22',
      color,
      border: `1px solid ${color}44`,
      borderRadius: 6,
      padding: small ? '2px 7px' : '3px 10px',
      fontSize: small ? 11 : 12,
      fontWeight: 700,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap' as const,
      display: 'inline-block',
    }}>
      {children}
    </span>
  )
}
