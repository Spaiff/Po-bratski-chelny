"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrthographicCamera, PresentationControls, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// A stylized 3D representation of a straight razor or scissors.
// In a real app we would load a GLTF model, but here we can compose simple geometries to look like a premium tool.
function StylizedRazor() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={meshRef} position={[0, -0.5, 0]} rotation={[0.2, -0.4, 0]} scale={1.2}>
            {/* Handle */}
            <mesh position={[-1.5, 0, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[4, 0.4, 0.2]} />
                <meshStandardMaterial color="#111" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Golden Pivot */}
            <mesh position={[0.4, 0.1, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.3, 32]} />
                <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Blade */}
            <mesh position={[2, 0.3, 0]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[3, 0.6, 0.05]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Decorative details on blade */}
            <mesh position={[1.5, 0.5, 0.03]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[1, 0.1, 0.06]} />
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
            </mesh>
        </group>
    );
}

export function HeroModel() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-transparent">
            <Canvas shadows dpr={[1, 2]}>
                <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={80} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.2, 0.2]}>
                        <StylizedRazor />
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
