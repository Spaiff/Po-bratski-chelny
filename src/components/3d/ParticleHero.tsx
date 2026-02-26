"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LogosInstanced({ count = 80, mobileScale = false }: { count?: number; mobileScale?: boolean }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
        // Safely load the texture to avoid crashing if the user hasn't added the file yet
        const loader = new THREE.TextureLoader();
        loader.load(
            "/logo.svg",
            (t) => {
                t.colorSpace = THREE.SRGBColorSpace;
                // Improve SVG crispness
                t.minFilter = THREE.LinearFilter;
                t.magFilter = THREE.LinearFilter;
                t.generateMipmaps = false;
                setTexture(t);
            },
            undefined,
            (err) => {
                console.error("Image /logo.svg not found. Please place logo.svg in the public folder.");
            }
        );
    }, []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = 10 + Math.random() * 50;
            const speed = 0.002 + Math.random() / 1000;
            const x = Math.random() * 60 - 30;
            const y = Math.random() * 60 - 30;
            const z = Math.random() * 60 - 30;
            // Moderate size, prominent but not overwhelming
            const scale = mobileScale
                ? 1.2 + Math.random() * 1.0
                : 0.5 + Math.random() * 0.5;

            temp.push({ time, factor, speed, x, y, z, scale });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!texture) return; // Wait until texture is loaded

        // Interactive Parallax: smoothly rotate the whole group slightly based on mouse
        if (group.current) {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.05);
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.05);
            // Optional: slight shift in position
            group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.pointer.x * 2, 0.05);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, state.pointer.y * 2, 0.05);
        }

        particles.forEach((particle, i) => {
            let { time, factor, speed, x, y, z, scale } = particle;

            time += speed;
            particle.time = time;

            const posX = x + Math.cos((time / 30) * factor) + (Math.sin(time * 0.5) * factor) / 20;
            const posY = y + Math.sin((time / 30) * factor) + (Math.cos(time * 1) * factor) / 20;
            const posZ = z + Math.cos((time / 30) * factor) + (Math.sin(time * 1.5) * factor) / 20;

            dummy.position.set(posX, posY, posZ);

            // Remove the billboard effect so they can freely tumble in 3D
            // dummy.lookAt(state.camera.position);

            dummy.scale.set(scale, scale, scale);

            // Add a continuous spinning/tumbling animation
            dummy.rotation.x = time * 2;
            dummy.rotation.y = time * 2.5;

            dummy.updateMatrix();
            mesh.current?.setMatrixAt(i, dummy.matrix);
        });

        if (mesh.current) {
            mesh.current.instanceMatrix.needsUpdate = true;
        }
    });

    if (!texture) return null;

    return (
        <group ref={group}>
            {/* Brighten the scene significantly so 3D objects aren't lost in the dark */}
            <ambientLight intensity={3.5} />
            <directionalLight position={[10, 20, 10]} intensity={4} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#f97316" />

            <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[0, 0, 0]}>
                {/* 32 segments is enough. Index 0: side, Index 1: top cap, Index 2: bottom cap */}
                <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />

                {/* Material 0: Side (Shiny White Edge) */}
                <meshStandardMaterial
                    attach="material-0"
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.8}
                />

                {/* Material 1: Top Face (Logo) */}
                <meshStandardMaterial
                    attach="material-1"
                    map={texture}
                    transparent={true}
                    roughness={0.1}
                    metalness={0.9}
                />

                {/* Material 2: Bottom Face (Logo) */}
                <meshStandardMaterial
                    attach="material-2"
                    map={texture}
                    transparent={true}
                    roughness={0.1}
                    metalness={0.9}
                />
            </instancedMesh>
        </group>
    );
}

export function ParticleHero() {
    // Use document.body as the event source so pointer tracking works even over UI elements
    const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setEventSource(document.body);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none">
            {eventSource && (
                <Canvas
                    camera={{ position: [0, 0, isMobile ? 18 : 25], fov: 60 }}
                    dpr={[1, 2]}
                    eventSource={eventSource}
                    eventPrefix="client"
                >
                    <fog attach="fog" args={["#000", isMobile ? 10 : 15, isMobile ? 55 : 45]} />
                    <Suspense fallback={null}>
                        <LogosInstanced count={isMobile ? 40 : 78} mobileScale={isMobile} />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
