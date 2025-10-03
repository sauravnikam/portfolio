const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Optional: expand glow on click
document.addEventListener('mousedown', () => {
    cursor.style.width = '60px';
    cursor.style.height = '60px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
});