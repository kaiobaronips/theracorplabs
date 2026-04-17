import { clinicalDisclaimer } from '@/lib/site';

type DisclaimerProps = {
  className?: string;
};

export function Disclaimer({ className = '' }: DisclaimerProps) {
  return (
    <p className={`rounded-tc-sm border border-tc-gray-100 bg-white p-4 text-sm leading-relaxed text-tc-gray-500 ${className}`}>
      {clinicalDisclaimer}
    </p>
  );
}
