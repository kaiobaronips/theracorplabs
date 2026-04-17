type BadgeVariant = 'default' | 'teal';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClass: Record<BadgeVariant, string> = {
  default: 'tc-badge',
  teal: 'tc-badge-teal'
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`${variantClass[variant]}${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  );
}
