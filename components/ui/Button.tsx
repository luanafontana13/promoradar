'use client'
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}

const variants = {
  primary:  { background: '#00C853', color: '#fff', border: 'none', boxShadow: '0 2px 12px #00C85344' },
  outline:  { background: 'transparent', color: '#00C853', border: '1.5px solid #00C853' },
  ghost:    { background: 'transparent', color: '#6B7280', border: '1px solid #E5E7EB' },
  danger:   { background: '#EF4444', color: '#fff', border: 'none' },
  whatsapp: { background: '#25D366', color: '#fff', border: 'none', boxShadow: '0 2px 10px #25D36644' },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: 13 },
  md: { padding: '10px 20px', fontSize: 14 },
  lg: { padding: '14px 28px', fontSize: 16 },
}

export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  fullWidth, disabled, type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 10,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.18s',
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        width: fullWidth ? '100%' : undefined,
        justifyContent: fullWidth ? 'center' : undefined,
      }}
      onMouseEnter={e => !disabled && ((e.currentTarget as HTMLElement).style.opacity = '0.88')}
      onMouseLeave={e => !disabled && ((e.currentTarget as HTMLElement).style.opacity = '1')}
    >
      {children}
    </button>
  )
}
