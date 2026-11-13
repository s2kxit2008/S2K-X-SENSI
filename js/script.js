document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen / Loading Page Handler
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
            }, 600);
        });
        // Fallback in case load event already fired
        setTimeout(() => {
            if (splashScreen && !splashScreen.classList.contains('fade-out')) {
                splashScreen.classList.add('fade-out');
            }
        }, 1200);
    }

    const WHATSAPP_NUMBER = "94761029268";

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    const sensiPresets = {
        android_low: { general: 198, redDot: 188, scope2x: 180, scope4x: 170, sniper: 120, freeLook: 155, fireBtn: "42%", dpi: "Default / 480" },
        android_mid: { general: 185, redDot: 172, scope2x: 165, scope4x: 154, sniper: 110, freeLook: 140, fireBtn: "46%", dpi: "Default / 520" },
        android_flagship: { general: 170, redDot: 158, scope2x: 150, scope4x: 142, sniper: 98, freeLook: 130, fireBtn: "50%", dpi: "Default / 411" },
        iphone: { general: 176, redDot: 164, scope2x: 155, scope4x: 145, sniper: 105, freeLook: 135, fireBtn: "48%", dpi: "Gliding Cursor: 110" },
        ipad: { general: 162, redDot: 150, scope2x: 142, scope4x: 132, sniper: 92, freeLook: 125, fireBtn: "54%", dpi: "Default iPadOS" },
        pc: { general: 85, redDot: 78, scope2x: 72, scope4x: 65, sniper: 45, freeLook: 60, fireBtn: "38%", dpi: "800 - 1000 Mouse DPI" }
    };

    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function sendToWhatsApp(messageText) {
        const encodedText = encodeURIComponent(messageText);
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
        window.open(waUrl, '_blank');
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const device = document.getElementById('deviceType').value;
            const style = document.getElementById('playStyle').value;
            const dpi = document.getElementById('dpiSetting').value;

            let base = { ...sensiPresets[device] };

            if (style === 'one_tap') {
                base.general = Math.min(200, base.general + 8);
                base.redDot = Math.min(200, base.redDot + 10);
            } else if (style === 'sniper') {
                base.sniper = Math.min(200, base.sniper + 25);
                base.scope4x = Math.min(200, base.scope4x + 8);
            } else if (style === 'all_rounder') {
                base.scope2x = Math.min(200, base.scope2x + 6);
                base.scope4x = Math.min(200, base.scope4x + 6);
            }

            if (dpi === 'medium') {
                base.general = Math.max(50, base.general - 10);
                base.dpi = "550 DPI";
            } else if (dpi === 'high') {
                base.general = Math.max(50, base.general - 20);
                base.dpi = "750 DPI";
            }

            const fields = [
                { id: 'General', val: base.general },
                { id: 'RedDot', val: base.redDot },
                { id: '2x', val: base.scope2x },
                { id: '4x', val: base.scope4x },
                { id: 'Sniper', val: base.sniper },
                { id: 'FreeLook', val: base.freeLook }
            ];

            fields.forEach(item => {
                const valEl = document.getElementById(`val${item.id}`);
                const barEl = document.getElementById(`bar${item.id}`);
                if (valEl) valEl.textContent = item.val;
                if (barEl) barEl.style.width = `${Math.min(100, (item.val / 200) * 100)}%`;
            });

            const fireBtnEl = document.getElementById('valFireBtn');
            const dpiEl = document.getElementById('valDpi');
            const tagEl = document.getElementById('selectedTag');

            if (fireBtnEl) fireBtnEl.textContent = base.fireBtn;
            if (dpiEl) dpiEl.textContent = base.dpi;

            if (tagEl) {
                const deviceSelect = document.getElementById('deviceType');
                const styleSelect = document.getElementById('playStyle');
                const deviceText = deviceSelect.options[deviceSelect.selectedIndex].text.split('(')[0].trim();
                const styleText = styleSelect.options[styleSelect.selectedIndex].text.split('/')[0].trim();
                tagEl.textContent = `${deviceText} • ${styleText}`;
            }

            showToast("New S2K X SENSI Profile Generated!");
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const tagEl = document.getElementById('selectedTag');
            const summary = `🔥 S2K X SENSI PROFILE (${tagEl ? tagEl.textContent : ''}) 🔥\n• General: ${document.getElementById('valGeneral')?.textContent}\n• Red Dot: ${document.getElementById('valRedDot')?.textContent}\n• 2x Scope: ${document.getElementById('val2x')?.textContent}\n• 4x Scope: ${document.getElementById('val4x')?.textContent}\n• Sniper Scope: ${document.getElementById('valSniper')?.textContent}\n• Free Look: ${document.getElementById('valFreeLook')?.textContent}\n• Fire Button: ${document.getElementById('valFireBtn')?.textContent}\n• DPI: ${document.getElementById('valDpi')?.textContent}`;

            navigator.clipboard.writeText(summary).then(() => {
                showToast("Sensi settings copied to clipboard!");
            });
        });
    }

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const packName = btn.getAttribute('data-pack');
            const autoMsg = `🔥 *S2K X SENSI - ORDER VIP PACK* 🔥\n\nI want to buy: *${packName}*. Please guide me through the payment and setup!`;
            sendToWhatsApp(autoMsg);
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('userName').value.trim();
            const device = document.getElementById('userDevice').value.trim();
            const message = document.getElementById('userMessage').value.trim();

            const autoMsg = `🔥 *S2K X SENSI - CUSTOM REQUEST* 🔥\n\n👤 *Gamer Name:* ${name}\n📱 *Device Model:* ${device}\n💬 *Request:* ${message}`;
            
            showToast("Opening WhatsApp...");
            sendToWhatsApp(autoMsg);
            contactForm.reset();
        });
    }
});
