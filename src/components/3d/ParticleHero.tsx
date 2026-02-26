"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GyroState = { x: number; y: number };

function LogosInstanced({
    count = 80,
    mobileScale = false,
    gyroRef,
}: {
    count?: number;
    mobileScale?: boolean;
    gyroRef?: React.MutableRefObject<GyroState>;
}) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dirLightRef = useRef<THREE.DirectionalLight>(null);
    const pointLightRef = useRef<THREE.PointLight>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    // Smoothed light position (internal)
    const smoothLight = useRef<GyroState>({ x: 10, y: 20 });

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            "/logo.svg",
            (t) => {
                t.colorSpace = THREE.SRGBColorSpace;
                t.minFilter = THREE.LinearFilter;
                t.magFilter = THREE.LinearFilter;
                t.generateMipmaps = false;
                setTexture(t);
            },
            undefined,
            () => {
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
        if (!texture) return;

        // --- Light & parallax source: gyro on mobile, mouse on desktop ---
        const isGyro = !!gyroRef;
        const rawX = isGyro ? gyroRef!.current.x : state.pointer.x;
        const rawY = isGyro ? gyroRef!.current.y : state.pointer.y;

        // Smooth light position
        const targetLightX = rawX * 20;
        const targetLightY = rawY * 20;
        smoothLight.current.x = THREE.MathUtils.lerp(smoothLight.current.x, targetLightX, 0.04);
        smoothLight.current.y = THREE.MathUtils.lerp(smoothLight.current.y, targetLightY, 0.04);

        if (dirLightRef.current) {
            dirLightRef.current.position.set(smoothLight.current.x, smoothLight.current.y, 12);
        }
        if (pointLightRef.current) {
            pointLightRef.current.position.set(-smoothLight.current.x * 0.5, -smoothLight.current.y * 0.5, -10);
        }

        // --- Group parallax ---
        if (group.current) {
            group.current.rotation.x = THREE.MathUtils.lerp(
                group.current.rotation.x,
                (-rawY * Math.PI) / 10,
                0.05
            );
            group.current.rotation.y = THREE.MathUtils.lerp(
                group.current.rotation.y,
                (rawX * Math.PI) / 10,
                0.05
            );
            group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, rawX * 2, 0.05);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, rawY * 2, 0.05);
        }

        // --- Particle animation ---
        particles.forEach((particle, i) => {
            let { time, factor, speed, x, y, z, scale } = particle;
            time += speed;
            particle.time = time;

            const posX = x + Math.cos((time / 30) * factor) + (Math.sin(time * 0.5) * factor) / 20;
            const posY = y + Math.sin((time / 30) * factor) + (Math.cos(time * 1) * factor) / 20;
            const posZ = z + Math.cos((time / 30) * factor) + (Math.sin(time * 1.5) * factor) / 20;

            dummy.position.set(posX, posY, posZ);
            dummy.scale.set(scale, scale, scale);
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
            <ambientLight intensity={3.5} />
            <directionalLight ref={dirLightRef} position={[10, 20, 12]} intensity={5} color="#ffffff" />
            <pointLight ref={pointLightRef} position={[-10, -10, -10]} intensity={3} color="#f97316" />

            <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
                <meshStandardMaterial attach="material-0" color="#ffffff" roughness={0.1} metalness={0.8} />
                <meshStandardMaterial attach="material-1" map={texture} transparent={true} roughness={0.1} metalness={0.9} />
                <meshStandardMaterial attach="material-2" map={texture} transparent={true} roughness={0.1} metalness={0.9} />
            </instancedMesh>
        </group>
    );
}

export function ParticleHero() {
    const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Gyroscope state (normalized -1..1, like Three.js pointer)
    const gyroRef = useRef<GyroState>({ x: 0, y: 0 });
    const gyroActive = useRef(false);

    useEffect(() => {
        setEventSource(document.body);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // --- DeviceOrientation (gyroscope) ---
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.gamma === null || e.beta === null) return;
            gyroActive.current = true;
            // gamma: left-right tilt (-90..90) → normalize to -1..1
            // beta:  front-back tilt (0..90 typical when holding phone) → normalize & center
            gyroRef.current.x = Math.max(-1, Math.min(1, e.gamma / 45));
            gyroRef.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
        };

        const addListener = () => {
            window.addEventListener("deviceorientation", handleOrientation, true);
        };

        // iOS 13+ requires explicit permission via a user gesture
        if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function") {
            // We listen for any touch to request permission
            const requestOnTouch = () => {
                (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
                    .requestPermission()
                    .then((permission: string) => {
                        if (permission === "granted") addListener();
                    })
                    .catch(console.error);
                document.removeEventListener("touchstart", requestOnTouch);
            };
            document.addEventListener("touchstart", requestOnTouch, { once: true });
        } else {
            addListener();
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("deviceorientation", handleOrientation, true);
        };
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
                        <LogosInstanced
                            count={isMobile ? 40 : 78}
                            mobileScale={isMobile}
                            gyroRef={isMobile ? gyroRef : undefined}
                        />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
