// =========================================================================
// Sri Ammavaru Website Silent Visitor & Devotee Analytics Tracker
// Tracks Unique Visitors, Returning Visits, and Pageview Frequencies silently
// Data is stored in Firebase RTDB /site_analytics without displaying on main pages
// =========================================================================

(function() {
  const DB_BASE = 'https://ammavaru-533ac-default-rtdb.firebaseio.com';
  const STORAGE_UID_KEY = 'ammavaru_visitor_uid';
  const STORAGE_VISIT_COUNT_KEY = 'ammavaru_visitor_count';
  const STORAGE_FIRST_SEEN_KEY = 'ammavaru_visitor_first_seen';
  const SESSION_HIT_KEY = 'ammavaru_session_hit_' + new Date().toISOString().slice(0, 10);

  function getOrGenerateUID() {
    let uid = localStorage.getItem(STORAGE_UID_KEY);
    if (!uid) {
      uid = 'devotee_' + Math.random().toString(36).substring(2, 8) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_UID_KEY, uid);
      localStorage.setItem(STORAGE_FIRST_SEEN_KEY, Date.now().toString());
    }
    return uid;
  }

  function detectDevice() {
    const ua = navigator.userAgent || '';
    let type = 'Desktop';
    if (/iPad|Tablet/i.test(ua)) type = 'Tablet';
    else if (/Android|iPhone|iPod|Mobile/i.test(ua)) type = 'Mobile';

    let os = 'Unknown OS';
    if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS/i.test(ua)) os = 'Mac';
    else if (/Linux/i.test(ua)) os = 'Linux';

    let browser = 'Browser';
    if (/WhatsApp/i.test(ua)) browser = 'WhatsApp In-App';
    else if (/Chrome|CriOS/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox|FxiOS/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';

    return { type, os, browser, label: `${type} • ${os} (${browser})` };
  }

  function detectReferrer() {
    const ref = document.referrer || '';
    if (!ref) return 'Direct / Bookmark';
    if (ref.includes('whatsapp') || ref.includes('api.whatsapp.com')) return 'WhatsApp Share';
    if (ref.includes('facebook') || ref.includes('fb.com')) return 'Facebook';
    if (ref.includes('google')) return 'Google Search';
    if (ref.includes('instagram')) return 'Instagram';
    return ref.split('/')[2] || 'External Link';
  }

  function getCurrentPageName() {
    const p = window.location.pathname || '';
    if (p.includes('pooja.html')) return 'పూజా సంకల్పం (Pooja Portal)';
    if (p.includes('visitors.html') || p.includes('analytics.html')) return 'Analytics Page';
    return 'హోమ్ & చందాల నివేదిక (Home)';
  }

  async function trackVisit() {
    try {
      const uid = getOrGenerateUID();
      const firstSeen = parseInt(localStorage.getItem(STORAGE_FIRST_SEEN_KEY) || Date.now().toString(), 10);
      let localVisitCount = parseInt(localStorage.getItem(STORAGE_VISIT_COUNT_KEY) || '0', 10) + 1;
      localStorage.setItem(STORAGE_VISIT_COUNT_KEY, localVisitCount.toString());

      const today = new Date().toISOString().slice(0, 10);
      const deviceInfo = detectDevice();
      const referrer = detectReferrer();
      const pageName = getCurrentPageName();
      const now = Date.now();

      // Don't count visitors dashboard page hits itself as devotee visits
      if (window.location.pathname.includes('visitors.html')) return;

      // 1. Fetch current visitor profile from Firebase to preserve total count across browsers if possible
      let visitorData = null;
      try {
        const getRes = await fetch(`${DB_BASE}/site_analytics/visitors/${uid}.json`);
        if (getRes.ok) visitorData = await getRes.json();
      } catch(e) {}

      const remoteVisitCount = (visitorData && visitorData.totalVisits) ? visitorData.totalVisits + 1 : localVisitCount;
      const isNewVisitor = !visitorData;

      // Update visitor record
      const updatedVisitor = {
        uid: uid,
        totalVisits: remoteVisitCount,
        firstVisitAt: (visitorData && visitorData.firstVisitAt) ? visitorData.firstVisitAt : firstSeen,
        lastVisitAt: now,
        device: deviceInfo.label,
        deviceType: deviceInfo.type,
        os: deviceInfo.os,
        browser: deviceInfo.browser,
        referrer: referrer,
        lastPage: pageName,
        updatedAt: now
      };

      // Save visitor record
      fetch(`${DB_BASE}/site_analytics/visitors/${uid}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVisitor)
      }).catch(() => null);

      // Record hit event in recent hits stream (for live activity ticker)
      const hitPayload = {
        uid: uid,
        time: now,
        page: pageName,
        device: deviceInfo.label,
        visitNumber: remoteVisitCount,
        isRepeat: remoteVisitCount > 1
      };

      fetch(`${DB_BASE}/site_analytics/recent_hits.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hitPayload)
      }).catch(() => null);

      // Increment daily pageviews
      fetch(`${DB_BASE}/site_analytics/daily/${today}/views.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ['.sv']: 'timestamp' }) // touch or increment
      }).catch(() => null);

    } catch (err) {
      console.debug('[Analytics] Silent notice:', err);
    }
  }

  // Trigger tracking once DOM is ready or immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackVisit);
  } else {
    trackVisit();
  }
})();
