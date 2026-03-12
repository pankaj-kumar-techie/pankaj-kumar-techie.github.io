/* ─── PANKAJ.AI 404 ENGINE ─── */
document.addEventListener('DOMContentLoaded', () => {
    // Neural Background
    const canvas = document.getElementById('neural');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let nodes = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createNodes() {
            nodes = [];
            const count = Math.min(40, Math.floor(window.innerWidth / 30));
            for (let i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    let dx = nodes[i].x - nodes[j].x;
                    let dy = nodes[i].y - nodes[j].y;
                    let d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0,255,200,${(1 - d / 150) * 0.1})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,255,200,0.3)';
                ctx.fill();
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            });
            requestAnimationFrame(draw);
        }

        resize();
        createNodes();
        draw();
        window.addEventListener('resize', () => { resize(); createNodes(); });
    }

    // Cursor Trail
    const cur = document.getElementById('cur');
    if (cur) {
        document.addEventListener('mousemove', e => {
            cur.style.left = e.clientX + 'px';
            cur.style.top = e.clientY + 'px';
        });
    }
});
