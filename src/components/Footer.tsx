'use client';
import { css, cx } from '@styles/css';
import { FooterData } from '@/utils/constants';

const footer = css({
  display: 'flex',
  padding: '2.8125rem 0.625rem 0rem 0.625rem',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2.8125rem',
});

const footerLogo = css({
  fontSize: '4rem',
    fontWeight: 700,
  color: 'text.80'
});

const footerColumns = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '60px',
});

const itemTitle = css({
  color: 'text.50',
  fontWeight: 600,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  marginBottom: '1rem',
});

const itemText = css({
  color: 'text.60',
  fontWeight: 400,
  fontSize: '0.875rem',
});

export function Footer({ footerData }: { footerData: FooterData }) {
  return (
    <div className={footer}>
      <div className={footerColumns}>
        <div>
          <p className={itemTitle}>Updates</p>
          {footerData.updates.map((update, i) => (
            <div key={i}>
              <a href={update.link} className={itemText}>
                {update.title}
              </a>
            </div>
          ))}
        </div>

        <div>
          <p className={itemTitle}>Support</p>
          {footerData.support.map((update, i) => (
            <div key={i}>
              <a href={update.link} className={itemText}>
                {update.title}
              </a>
            </div>
          ))}
        </div>

        <div>
          <p className={itemTitle}>Legal</p>
          {footerData.legal.map((update, i) => (
            <div key={i}>
              <a href={update.link} className={itemText}>
                {update.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      <h1 className={footerLogo}>DanBot Hosting</h1>
    </div>
  );
}
