(function () {
    if (localStorage.getItem('nationdex_cookie_consent')) return;

    function isUKRegion() {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const lang = (navigator.language || '').toLowerCase();
            return tz.includes('London') || tz.includes('Belfast') || lang === 'en-gb';
        } catch (e) {
            return false;
        }
    }

    const isUK = isUKRegion();
    const termSingular = isUK ? 'biscuit' : 'cookie';
    const termPlural = isUK ? 'biscuits' : 'cookies';
    const termCapSingular = isUK ? 'Biscuit' : 'Cookie';
    const termCapPlural = isUK ? 'Biscuits' : 'Cookies';

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'fixed bottom-5 left-5 z-[9990] max-w-sm w-[calc(100%-2.5rem)] bg-white dark:bg-[#152033] text-gray-900 dark:text-white rounded-2xl p-6 shadow-2xl flex flex-col gap-3 select-none transition-all duration-300 transform translate-y-8 opacity-0';

    banner.innerHTML = `
        <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">I use ${termPlural}
        </h3>
        <p class="text-xs font-normal text-gray-600 dark:text-[#94a3b8] leading-relaxed">
            Hi, this website uses essential ${termPlural} to ensure its proper operation and tracking ${termPlural} to understand how you interact with it. The latter will be set only upon approval. 
            <a href="/privacy" class="font-bold underline hover:text-[#8B5CF6] transition-colors">Read ${termSingular} policy</a>.
        </p>
        <div class="grid grid-cols-2 gap-2.5 mt-2">
            <button id="cookie-accept-btn" class="w-full bg-[#182234] dark:bg-[#8B5CF6] hover:opacity-90 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center">
                Accept
            </button>
            <button id="cookie-settings-btn" class="w-full bg-[#e2e8f0] dark:bg-[#253248] hover:bg-gray-300 dark:hover:bg-[#32435f] text-gray-800 dark:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center">
                Settings
            </button>
        </div>
    `;

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'cookie-settings-modal';
    modalOverlay.className = 'fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm hidden items-center justify-center p-4 select-none transition-opacity duration-300 opacity-0';

    modalOverlay.innerHTML = `
        <div class="bg-white dark:bg-[#152033] text-gray-900 dark:text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-5 relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">${termCapSingular} settings</h3>
                </div>
                <button id="cookie-modal-close" class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#253248] text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                    <i class="ri-close-line text-lg"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-1">${termCapSingular} usage</h4>
                    <p class="text-xs font-normal text-gray-600 dark:text-[#94a3b8] leading-relaxed">
                        I use ${termPlural} to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details about ${termPlural} and how I use them, read the full <a href="/privacy" class="font-bold underline hover:text-[#8B5CF6]">privacy policy</a>.
                    </p>
                </div>

                <div class="space-y-3 pt-2">
                    <div class="bg-gray-50 dark:bg-[#1a273e] p-4 rounded-xl flex items-center justify-between">
                        <span class="text-xs font-bold text-gray-900 dark:text-white">Strictly necessary ${termPlural}</span>
                        <div class="w-11 h-6 bg-[#8B5CF6] rounded-full p-[2px] opacity-60 cursor-not-allowed flex items-center justify-end">
                            <div class="w-5 h-5 rounded-full bg-white"></div>
                        </div>
                    </div>

                    <div class="bg-gray-50 dark:bg-[#1a273e] p-4 rounded-xl flex items-center justify-between">
                        <span class="text-xs font-bold text-gray-900 dark:text-white">Preferences ${termPlural}</span>
                        <label class="relative inline-flex items-center cursor-pointer select-none">
                            <input type="checkbox" id="pref-cookies-toggle" checked class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:bg-[#8B5CF6]"></div>
                        </label>
                    </div>

                    <div class="bg-gray-50 dark:bg-[#1a273e] p-4 rounded-xl flex items-center justify-between">
                        <span class="text-xs font-bold text-gray-900 dark:text-white">Analytics ${termPlural}</span>
                        <label class="relative inline-flex items-center cursor-pointer select-none">
                            <input type="checkbox" id="analytics-cookies-toggle" checked class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:bg-[#8B5CF6]"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-white/10">
                <button id="cookie-accept-all-btn" class="bg-[#182234] dark:bg-[#8B5CF6] hover:opacity-90 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer">
                    Accept all
                </button>
                <button id="cookie-save-settings-btn" class="bg-[#e2e8f0] dark:bg-[#253248] hover:bg-gray-300 dark:hover:bg-[#32435f] text-gray-800 dark:text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer">
                    Save settings
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);
    document.body.appendChild(modalOverlay);

    requestAnimationFrame(() => {
        banner.classList.remove('translate-y-8', 'opacity-0');
    });

    function dismissAll(consentValue) {
        localStorage.setItem('nationdex_cookie_consent', consentValue);
        banner.classList.add('translate-y-8', 'opacity-0');
        modalOverlay.classList.add('opacity-0');
        setTimeout(() => {
            if (banner.parentNode) banner.parentNode.removeChild(banner);
            if (modalOverlay.parentNode) modalOverlay.parentNode.removeChild(modalOverlay);
        }, 300);
    }

    function openModal() {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('flex');
        requestAnimationFrame(() => {
            modalOverlay.classList.remove('opacity-0');
        });
    }

    function closeModal() {
        modalOverlay.classList.add('opacity-0');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
            modalOverlay.classList.remove('flex');
        }, 300);
    }

    document.getElementById('cookie-accept-btn').addEventListener('click', () => dismissAll('accepted'));
    document.getElementById('cookie-settings-btn').addEventListener('click', openModal);
    document.getElementById('cookie-modal-close').addEventListener('click', closeModal);
    document.getElementById('cookie-accept-all-btn').addEventListener('click', () => dismissAll('accepted_all'));
    document.getElementById('cookie-save-settings-btn').addEventListener('click', () => dismissAll('custom_settings'));
})();