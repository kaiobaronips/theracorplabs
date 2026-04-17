import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type BaseProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<Variant, string> = {
  primary: 'tc-btn-primary',
  secondary: 'tc-btn-secondary',
  ghost: 'tc-btn-ghost'
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const cls = `${variantClass[variant]}${className ? ` ${className}` : ''}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...rest} />
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return <button className={cls} {...rest} />;
}
