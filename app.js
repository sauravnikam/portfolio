(function () {
    const gridEls = document.querySelectorAll('.grid-highlight');
    if (!gridEls.length) return;

    gridEls.forEach((gridEl, idx) => {
        // Remove any existing streaks (idempotent)
        gridEl.querySelectorAll('.streak').forEach(n => n.remove());

        // Decide how many streaks per line: 2 or 3
        const count = 2 + Math.floor(Math.random() * 2); // 2 or 3

        // Base duration for this grid line (slight variation per line)
        const baseDur = 8 + Math.random() * 3; // 8..11 seconds

        // Interval between streaks as a fraction of duration
        // e.g., 0.25 means streaks start ~25% of the duration apart
        const intervalFraction = 0.25; // tweak to change spacing

        for (let s = 0; s < count; s++) {
            const streak = document.createElement('div');
            streak.className = 'streak';

            // small per-streak duration variance
            const durVal = baseDur + (Math.random() - 0.5) * 0.6; // +/-0.3s
            const dur = durVal.toFixed(2) + 's';

            // negative delay so it's mid-animation; staggered by intervalFraction
            const delayVal = - (s * intervalFraction * durVal) - Math.random() * 0.15;
            const delay = delayVal.toFixed(2) + 's';

            // small visual variance: slightly different opacity or width
            const opacity = (0.6 + Math.random() * 0.4).toFixed(2); // 0.6..1
            const streakWidth = (0.9 + Math.random() * 0.3).toFixed(2); // 0.9..1.2

            streak.style.setProperty('--streak-duration', dur);
            streak.style.setProperty('--streak-delay', delay);
            streak.style.opacity = opacity;
            streak.style.transform = `scaleX(${streakWidth})`;

            gridEl.appendChild(streak);
        }
    });
})();