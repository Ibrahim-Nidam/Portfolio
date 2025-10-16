/**
 * Particle Animation Module
 * Creates an animated particle background
 */

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

class ParticleSystem {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private particleCount: number = 50;
    private maxDistance: number = 150;
    private animationId: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('Could not get canvas context');
        }

        this.ctx = context;
        this.resize();
        this.createParticles();

        // Setup resize listener
        window.addEventListener('resize', () => this.resize());

        // Start animation
        this.animate();
    }

    /**
     * Resize canvas to fill window
     */
    private resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Create initial particles
     */
    private createParticles(): void {
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    /**
     * Update particle positions
     */
    private updateParticles(): void {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    /**
     * Draw particles and connections
     */
    private draw(): void {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Get theme color
        const isDark = document.documentElement.classList.contains('dark');
        const particleColor = isDark ? '255, 215, 0' : '202, 138, 4'; // Gold colors

        // Draw connections between nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.2;
                    this.ctx.strokeStyle = `rgba(${particleColor}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    /**
     * Animation loop
     */
    private animate = (): void => {
        this.updateParticles();
        this.draw();
        this.animationId = requestAnimationFrame(this.animate);
    }

    /**
     * Stop animation
     */
    public destroy(): void {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', () => this.resize());
    }
}

/**
 * Initialize particle system
 */
export function initParticles(): void {
    console.log('✨ Initializing particle system...');

    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;

    if (!canvas) {
        console.warn('Particles canvas not found');
        return;
    }

    try {
        new ParticleSystem(canvas);
        console.log('✅ Particle system initialized');
    } catch (error) {
        console.error('Failed to initialize particle system:', error);
    }
}