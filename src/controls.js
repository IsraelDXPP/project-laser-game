// Create on-screen controls for mobile devices
document.addEventListener("DOMContentLoaded", () => {
    // Only show controls if on a touch device
    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
        return;
    }

    const controlsHTML = `
        <div id="mobile-controls" style="position: absolute; bottom: 20px; left: 0; right: 0; z-index: 9999; display: flex; justify-content: space-between; padding: 0 20px; pointer-events: none;">
            <div id="dpad" style="display: grid; grid-template-columns: 60px 60px 60px; grid-template-rows: 60px 60px 60px; gap: 5px; pointer-events: auto;">
                <div></div>
                <button id="btn-up" class="ctrl-btn" data-key="ArrowUp" data-code="38" style="background: rgba(255,255,255,0.3); border: 2px solid white; border-radius: 10px; color: white; font-size: 24px; font-weight: bold;">^</button>
                <div></div>
                <button id="btn-left" class="ctrl-btn" data-key="ArrowLeft" data-code="37" style="background: rgba(255,255,255,0.3); border: 2px solid white; border-radius: 10px; color: white; font-size: 24px; font-weight: bold;">&lt;</button>
                <button id="btn-down" class="ctrl-btn" data-key="ArrowDown" data-code="40" style="background: rgba(255,255,255,0.3); border: 2px solid white; border-radius: 10px; color: white; font-size: 24px; font-weight: bold;">v</button>
                <button id="btn-right" class="ctrl-btn" data-key="ArrowRight" data-code="39" style="background: rgba(255,255,255,0.3); border: 2px solid white; border-radius: 10px; color: white; font-size: 24px; font-weight: bold;">&gt;</button>
            </div>
            <div id="action-buttons" style="display: flex; align-items: flex-end; pointer-events: auto;">
                <button id="btn-shoot" class="ctrl-btn" data-key=" " data-code="32" style="background: rgba(255,50,50,0.5); border: 2px solid white; border-radius: 50%; width: 80px; height: 80px; color: white; font-size: 16px; font-weight: bold; margin-bottom: 20px;">SHOOT</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlsHTML);

    const triggerKeyEvent = (element, eventType) => {
        const keyCode = parseInt(element.getAttribute('data-code'));
        const key = element.getAttribute('data-key');
        const eventObj = new KeyboardEvent(eventType, {
            bubbles: true,
            cancelable: true,
            keyCode: keyCode,
            which: keyCode,
            key: key,
            code: key === ' ' ? 'Space' : key
        });
        document.dispatchEvent(eventObj);
    };

    document.querySelectorAll('.ctrl-btn').forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.style.background = 'rgba(255,255,255,0.7)';
            triggerKeyEvent(btn, 'keydown');
        }, {passive: false});

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (btn.id === 'btn-shoot') {
                btn.style.background = 'rgba(255,50,50,0.5)';
            } else {
                btn.style.background = 'rgba(255,255,255,0.3)';
            }
            triggerKeyEvent(btn, 'keyup');
        }, {passive: false});
    });
});
