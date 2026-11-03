import { Activity } from 'lucide-react';

export default function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark">
        <Activity size={21} strokeWidth={2.4} />
      </span>

      {!compact && (
        <span className="brand-name">
          <strong>Urologist</strong>
          <small>HEALTHCARE</small>
        </span>
      )}
    </div>
  );
}
