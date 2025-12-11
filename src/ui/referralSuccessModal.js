function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;

    if (key === 'className') {
      node.className = value;
    } else if (key === 'text') {
      node.textContent = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, String(value));
    }
  }

  for (const child of children) {
    if (child == null) continue;
    node.append(child);
  }

  return node;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = el('textarea', { style: 'position:fixed;left:-9999px;top:-9999px;' }, []);
  textarea.value = text;
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function progressBar(progress01) {
  const outer = el('div', { className: 'we-referral-progress-outer' });
  const inner = el('div', { className: 'we-referral-progress-inner' });
  inner.style.width = `${Math.max(0, Math.min(1, progress01)) * 100}%`;
  outer.append(inner);
  return outer;
}

/**
 * @param {object} props
 * @param {string} props.referralLink
 * @param {number} props.referralsCount
 * @param {number} props.position
 * @param {{ totalWaitlist?: number, totalReferrals?: number }} [props.socialProof]
 * @param {Array<{ referralsRequired: number, label: string }>} props.tiers
 * @param {{ currentTier: any, nextTier: any, progressToNextTier: number, remainingToNextTier: number }} props.tierProgress
 * @param {string} [props.appName]
 */
export function createReferralSuccessModal(props) {
  const appName = props.appName ?? 'WidgetExplorer';

  const shareText = `I just joined ${appName}'s waitlist. Join with my link: ${props.referralLink}`;

  const overlay = el('div', { className: 'we-referral-overlay', role: 'dialog', 'aria-modal': 'true' });
  const modal = el('div', { className: 'we-referral-modal' });

  const closeBtn = el('button', {
    className: 'we-referral-close',
    type: 'button',
    text: '×',
    onclick: () => api.close()
  });

  const title = el('h2', { className: 'we-referral-title', text: 'You’re on the waitlist!' });

  const statsLine = el('div', {
    className: 'we-referral-stats',
    text: `Referrals: ${props.referralsCount} • Position: #${props.position}`
  });

  const linkBox = el('div', { className: 'we-referral-linkbox' }, [
    el('input', {
      className: 'we-referral-input',
      type: 'text',
      value: props.referralLink,
      readonly: 'true'
    }),
    el('button', {
      className: 'we-referral-btn',
      type: 'button',
      text: 'Copy',
      onclick: async () => {
        await copyText(props.referralLink);
        toast.textContent = 'Copied link';
        toast.classList.add('we-referral-toast--show');
        setTimeout(() => toast.classList.remove('we-referral-toast--show'), 1500);
      }
    })
  ]);

  const shareRow = el('div', { className: 'we-referral-share-row' });

  const shareNativeBtn = el('button', {
    className: 'we-referral-btn we-referral-btn--secondary',
    type: 'button',
    text: 'Share…',
    onclick: async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: appName, text: shareText, url: props.referralLink });
          return;
        } catch {
          // user cancelled
        }
      }

      await copyText(props.referralLink);
      toast.textContent = 'Copied link (share unavailable)';
      toast.classList.add('we-referral-toast--show');
      setTimeout(() => toast.classList.remove('we-referral-toast--show'), 1500);
    }
  });

  const mailtoLink = `mailto:?subject=${encodeURIComponent(`Join me on ${appName}`)}&body=${encodeURIComponent(shareText)}`;
  const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const emailBtn = el('a', { className: 'we-referral-btn we-referral-btn--secondary', href: mailtoLink, target: '_blank', rel: 'noopener noreferrer', text: 'Email' });
  const tweetBtn = el('a', { className: 'we-referral-btn we-referral-btn--secondary', href: tweetLink, target: '_blank', rel: 'noopener noreferrer', text: 'Tweet' });

  shareRow.append(shareNativeBtn, emailBtn, tweetBtn);

  const tiersTitle = el('h3', { className: 'we-referral-subtitle', text: 'Perks' });

  const tiersList = el('ul', { className: 'we-referral-tiers' });
  const tiersSorted = [...props.tiers].sort((a, b) => a.referralsRequired - b.referralsRequired);
  for (const tier of tiersSorted) {
    const done = props.referralsCount >= tier.referralsRequired;
    tiersList.append(
      el('li', { className: `we-referral-tier ${done ? 'we-referral-tier--done' : ''}` }, [
        el('span', { className: 'we-referral-tier-label', text: tier.label }),
        el('span', { className: 'we-referral-tier-req', text: `${tier.referralsRequired} referrals` })
      ])
    );
  }

  const progressTitleText = props.tierProgress.nextTier
    ? `${props.tierProgress.remainingToNextTier} more to unlock: ${props.tierProgress.nextTier.label}`
    : 'All perks unlocked';

  const progressTitle = el('div', { className: 'we-referral-progress-title', text: progressTitleText });
  const progress = progressBar(props.tierProgress.progressToNextTier);

  const socialProof = el('div', {
    className: 'we-referral-social-proof',
    text: props.socialProof
      ? `${props.socialProof.totalWaitlist ?? ''} on the waitlist • ${props.socialProof.totalReferrals ?? ''} total referrals`
      : ''
  });

  const toast = el('div', { className: 'we-referral-toast', text: '' });

  modal.append(
    closeBtn,
    title,
    statsLine,
    linkBox,
    shareRow,
    tiersTitle,
    tiersList,
    progressTitle,
    progress,
    socialProof,
    toast
  );

  overlay.append(modal);

  // basic styles (scoped by class names)
  const style = el('style', {
    text: `
.we-referral-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;padding:16px;z-index:9999;}
.we-referral-overlay--open{display:flex;}
.we-referral-modal{background:#fff;border-radius:12px;max-width:520px;width:100%;padding:20px;box-shadow:0 16px 40px rgba(0,0,0,.25);position:relative;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}
.we-referral-close{position:absolute;top:12px;right:12px;border:0;background:transparent;font-size:24px;line-height:1;cursor:pointer;}
.we-referral-title{margin:0 0 8px 0;font-size:22px;}
.we-referral-stats{color:#444;margin-bottom:14px;}
.we-referral-linkbox{display:flex;gap:8px;margin-bottom:10px;}
.we-referral-input{flex:1;border:1px solid #ddd;border-radius:8px;padding:10px;font-size:14px;}
.we-referral-btn{border:1px solid #111;background:#111;color:#fff;border-radius:8px;padding:10px 12px;font-size:14px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;}
.we-referral-btn--secondary{background:#fff;color:#111;border-color:#ddd;}
.we-referral-share-row{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 16px 0;}
.we-referral-subtitle{margin:0 0 8px 0;font-size:16px;}
.we-referral-tiers{list-style:none;padding:0;margin:0 0 12px 0;display:flex;flex-direction:column;gap:8px;}
.we-referral-tier{display:flex;justify-content:space-between;border:1px solid #eee;border-radius:10px;padding:10px 12px;}
.we-referral-tier--done{border-color:#c7f1d1;background:#f3fff6;}
.we-referral-tier-label{font-weight:600;}
.we-referral-tier-req{color:#555;}
.we-referral-progress-title{color:#333;margin:10px 0 8px 0;}
.we-referral-progress-outer{height:10px;border-radius:999px;background:#eee;overflow:hidden;}
.we-referral-progress-inner{height:100%;background:#111;}
.we-referral-social-proof{color:#666;margin-top:12px;font-size:13px;}
.we-referral-toast{position:absolute;left:50%;transform:translateX(-50%);bottom:10px;background:#111;color:#fff;padding:8px 10px;border-radius:8px;font-size:13px;opacity:0;transition:opacity .15s ease;pointer-events:none;}
.we-referral-toast--show{opacity:1;}
`
  });

  overlay.append(style);

  function onKeyDown(e) {
    if (e.key === 'Escape') api.close();
  }

  const api = {
    element: overlay,
    open() {
      overlay.classList.add('we-referral-overlay--open');
      document.addEventListener('keydown', onKeyDown);
    },
    close() {
      overlay.classList.remove('we-referral-overlay--open');
      document.removeEventListener('keydown', onKeyDown);
    }
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) api.close();
  });

  return api;
}
