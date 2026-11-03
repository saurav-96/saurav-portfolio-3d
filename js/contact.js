/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/contact.js — Interactive Contact Form Validation, Focusable Error Summary,
                   Endpoint Configuration, and Direct Email Fallback
   Audited & Upgraded with UI/UX Pro Max Form & Accessibility Guidelines
   ========================================================================== */

(function () {
  'use strict';

  /**
   * GENUINE SUBMISSION CONFIGURATION POINT
   * ------------------------------------------------------------------------
   * To enable direct serverless delivery via Formspree or Web3Forms:
   * 1. Paste your Formspree endpoint URL into `formspreeEndpoint` (e.g., 'https://formspree.io/f/xxxxxxx')
   *    OR paste your Web3Forms public access key into `web3FormsAccessKey`.
   * 2. When neither is configured, the form validates all fields, shows transparent status,
   *    prepares a formatted inquiry summary, and triggers your email client or one-click copy.
   */
  /**
   * CENTRALIZED CONTACT & SOCIAL MEDIA CONFIGURATION
   * ------------------------------------------------------------------------
   * All verified URLs, social profiles, and messaging channels for Saurav Bhusal.
   */
  const CONTACT_CONFIG = {
    formspreeEndpoint: '', // e.g., 'https://formspree.io/f/your_form_id'
    web3FormsAccessKey: '', // e.g., 'your-web3forms-access-key'
    recipientEmail: 'sauravbhusal369@gmail.com',
    whatsappNumber: '+9779766271244',
    whatsappUrl: 'https://wa.me/9779766271244',
    telegramUrl: 'https://t.me/+9779766271244',
    facebookUrl: 'https://www.facebook.com/saurav.bhusal.148',
    instagramUrl: 'https://www.instagram.com/sauravbhusal_96/',
    xTwitterUrl: 'https://x.com/all_saurav',
    upworkUrl: 'https://www.upwork.com/freelancers/~010a6e73c111779a15',
    fiverrUrl: 'https://www.fiverr.com/sellers/saurav_bhusal',
    freelancerUrl: 'https://www.freelancer.com/u/sauravb369',
    githubUrl: 'https://github.com/saurav-96',
    linkedinUrl: 'https://www.linkedin.com/in/saurav-b-502352415/'
  };

  // Expose configuration globally for modular access
  window.PORTFOLIO_CONTACT_CONFIG = CONTACT_CONFIG;

  function initContactModeTabs() {
    const tabHire = document.getElementById('tab-hire');
    const tabContact = document.getElementById('tab-contact');
    const viewHire = document.getElementById('view-hire');
    const viewContact = document.getElementById('view-contact');

    if (!tabHire || !tabContact || !viewHire || !viewContact) return;

    function switchMode(mode) {
      if (mode === 'hire') {
        tabHire.classList.add('active');
        tabHire.setAttribute('aria-selected', 'true');
        tabContact.classList.remove('active');
        tabContact.setAttribute('aria-selected', 'false');

        viewHire.classList.remove('hidden');
        viewContact.classList.add('hidden');
      } else {
        tabContact.classList.add('active');
        tabContact.setAttribute('aria-selected', 'true');
        tabHire.classList.remove('active');
        tabHire.setAttribute('aria-selected', 'false');

        viewContact.classList.remove('hidden');
        viewHire.classList.add('hidden');
      }
    }

    tabHire.addEventListener('click', () => switchMode('hire'));
    tabContact.addEventListener('click', () => switchMode('contact'));

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    // Default to General Contact and Inquiries unless ?mode=hire is explicitly requested (Requirement 7)
    if (mode === 'hire') {
      switchMode('hire');
    } else {
      switchMode('contact');
    }
  }

  function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    const fullNameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const projectTypeSelect = document.getElementById('contact-type');
    const budgetSelect = document.getElementById('contact-budget');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const statusBox = document.getElementById('contact-form-status');
    const errorSummaryBox = document.getElementById('contact-error-summary');
    const errorSummaryList = document.getElementById('contact-error-summary-list');

    // Pre-select Project Type or Context if passed via URL query string (e.g. ?service=UI/UX%20Design)
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const projectParam = params.get('project');

    if (serviceParam && projectTypeSelect) {
      Array.from(projectTypeSelect.options).forEach((opt) => {
        if (opt.value.toLowerCase() === serviceParam.toLowerCase()) {
          projectTypeSelect.value = opt.value;
        }
      });
    }

    if (projectParam && messageInput && !messageInput.value) {
      messageInput.value = `Hi Saurav, I explored your "${projectParam}" project and would love to discuss a similar project.`;
    }

    function setFieldError(inputEl, errorId, hasError, customText) {
      const errEl = document.getElementById(errorId);
      if (!inputEl || !errEl) return;

      if (hasError) {
        inputEl.classList.add('input-error');
        inputEl.setAttribute('aria-invalid', 'true');
        if (customText) errEl.textContent = customText;
        errEl.classList.add('visible');
      } else {
        inputEl.classList.remove('input-error');
        inputEl.setAttribute('aria-invalid', 'false');
        errEl.classList.remove('visible');
      }
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function renderErrorSummary(errors) {
      if (!errorSummaryBox || !errorSummaryList) return;
      if (errors.length === 0) {
        errorSummaryBox.classList.add('hidden');
        errorSummaryList.innerHTML = '';
        return;
      }

      errorSummaryList.innerHTML = errors
        .map((err) => `<li><a href="#${err.fieldId}" data-error-link="${err.fieldId}">${err.message}</a></li>`)
        .join('');
      errorSummaryBox.classList.remove('hidden');

      errorSummaryList.querySelectorAll('[data-error-link]').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('data-error-link');
          const targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.focus();
        });
      });
    }

    function validateForm() {
      const errors = [];

      const nameVal = (fullNameInput.value || '').trim();
      if (nameVal.length < 2) {
        const msg = 'Please enter your full name (at least 2 characters).';
        setFieldError(fullNameInput, 'err-contact-name', true, msg);
        errors.push({ fieldId: 'contact-name', message: msg });
      } else {
        setFieldError(fullNameInput, 'err-contact-name', false);
      }

      const emailVal = (emailInput.value || '').trim();
      if (!validateEmail(emailVal)) {
        const msg = 'Please enter a valid email address.';
        setFieldError(emailInput, 'err-contact-email', true, msg);
        errors.push({ fieldId: 'contact-email', message: msg });
      } else {
        setFieldError(emailInput, 'err-contact-email', false);
      }

      const typeVal = (projectTypeSelect.value || '').trim();
      if (!typeVal) {
        const msg = 'Please select a project category.';
        setFieldError(projectTypeSelect, 'err-contact-type', true, msg);
        errors.push({ fieldId: 'contact-type', message: msg });
      } else {
        setFieldError(projectTypeSelect, 'err-contact-type', false);
      }

      const budgetVal = (budgetSelect.value || '').trim();
      if (!budgetVal) {
        const msg = 'Please select an estimated budget range.';
        setFieldError(budgetSelect, 'err-contact-budget', true, msg);
        errors.push({ fieldId: 'contact-budget', message: msg });
      } else {
        setFieldError(budgetSelect, 'err-contact-budget', false);
      }

      const msgVal = (messageInput.value || '').trim();
      if (msgVal.length < 15) {
        const msg = 'Please share a brief project description (at least 15 characters).';
        setFieldError(messageInput, 'err-contact-message', true, msg);
        errors.push({ fieldId: 'contact-message', message: msg });
      } else {
        setFieldError(messageInput, 'err-contact-message', false);
      }

      renderErrorSummary(errors);
      return errors.length === 0;
    }

    // Clear individual field errors on input
    [fullNameInput, emailInput, projectTypeSelect, budgetSelect, messageInput].forEach((el) => {
      if (!el) return;
      const clearHandler = () => {
        const errId = 'err-' + el.id;
        setFieldError(el, errId, false);
        if (form.querySelectorAll('.input-error').length === 0 && errorSummaryBox) {
          errorSummaryBox.classList.add('hidden');
        }
      };
      el.addEventListener('input', clearHandler);
      el.addEventListener('change', clearHandler);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        if (errorSummaryBox && !errorSummaryBox.classList.contains('hidden')) {
          errorSummaryBox.focus();
        } else {
          const firstInvalid = form.querySelector('.input-error');
          if (firstInvalid) firstInvalid.focus();
        }
        return;
      }

      const payload = {
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        projectType: projectTypeSelect.value.trim(),
        budget: budgetSelect.value.trim(),
        message: messageInput.value.trim()
      };

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Preparing Inquiry...</span>`;

      // Path A: Configured Formspree or Web3Forms API
      if (CONTACT_CONFIG.formspreeEndpoint || CONTACT_CONFIG.web3FormsAccessKey) {
        try {
          let response;
          if (CONTACT_CONFIG.formspreeEndpoint) {
            response = await fetch(CONTACT_CONFIG.formspreeEndpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(payload)
            });
          } else {
            response = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({
                access_key: CONTACT_CONFIG.web3FormsAccessKey,
                subject: `New Portfolio Inquiry: ${payload.projectType} from ${payload.name}`,
                ...payload
              })
            });
          }

          if (response && response.ok) {
            statusBox.className =
              'mt-5 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-sm';
            statusBox.innerHTML = `
              <p class="font-semibold text-emerald-300 mb-1">✓ Message Sent Successfully</p>
              <p>Thank you, <strong>${payload.name}</strong>! Your project inquiry has been delivered. I will respond within 24 hours.</p>
            `;
            statusBox.classList.remove('hidden');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            return;
          }
        } catch (err) {
          // Fall through to direct mailto / copy fallback
        }
      }

      // Path B: Honest, Working Direct Email Fallback + One-Click Copy Brief
      await new Promise((r) => setTimeout(r, 250));

      const subject = encodeURIComponent(`[Portfolio Inquiry] ${payload.projectType} — ${payload.name}`);
      const bodyText =
        `Hello Saurav,\n\n` +
        `Name: ${payload.name}\n` +
        `Email: ${payload.email}\n` +
        `Project Type: ${payload.projectType}\n` +
        `Estimated Budget: ${payload.budget}\n\n` +
        `Project Details:\n${payload.message}\n`;
      const mailtoHref = `mailto:${CONTACT_CONFIG.recipientEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      statusBox.className =
        'mt-5 p-5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-slate-200 text-sm space-y-3';
      statusBox.innerHTML = `
        <div class="flex items-center justify-between gap-2">
          <p class="font-heading font-semibold text-white text-base">
            ✓ Project Brief Validated & Ready
          </p>
          <span class="tech-pill text-cyan-300 border-cyan-500/40">Direct Dispatch</span>
        </div>
        <p class="text-slate-300 text-xs leading-relaxed">
          Your inquiry for <strong>${payload.projectType}</strong> (${payload.budget}) is formatted and ready. Choose your preferred channel below to send immediately:
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <a href="${mailtoHref}" class="btn-primary text-xs py-2.5 px-4">
            <span>Open in Email Client</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button type="button" id="copy-brief-btn" class="btn-secondary text-xs py-2.5 px-4">
            <span>Copy Formatted Brief</span>
          </button>
          <a href="${CONTACT_CONFIG.upworkUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs py-2.5 px-4">
            <span>Message on Upwork ↗</span>
          </a>
        </div>
      `;
      statusBox.classList.remove('hidden');

      const copyBtn = document.getElementById('copy-brief-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(bodyText);
            copyBtn.innerHTML = '<span>✓ Copied to Clipboard!</span>';
          } catch {
            copyBtn.innerHTML = '<span>Select & Copy Brief</span>';
          }
        });
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    });
  }

  function initContactPage() {
    initContactModeTabs();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
  } else {
    initContactPage();
  }
})();
