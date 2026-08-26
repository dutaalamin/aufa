import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { projectsData } from './Projects';

// Define a structured 3D matrix coordinate configuration for the floating cubes.
// This matches the layout of radarchitecture.net, dense at the core and sparser on the edges.
const CUBE_CONFIGS = [
  // Core Dense Layer
  { x: 0, y: 0, z: 0, type: 'wireframe' },
  { x: 1, y: 0, z: 0, type: 'project', projectIndex: 0 }, // Together We Grow
  { x: -1, y: 0, z: 0, type: 'wireframe' },
  { x: 0, y: 1, z: 0, type: 'project', projectIndex: 1 }, // Nest of Renewal
  { x: 0, y: -1, z: 0, type: 'wireframe' },
  { x: 0, y: 0, z: 1, type: 'project', projectIndex: 2 }, // MV House
  { x: 0, y: 0, z: -1, type: 'wireframe' },
  
  // Mid Layer
  { x: 1, y: 1, z: 0, type: 'wireframe' },
  { x: -1, y: -1, z: 0, type: 'wireframe' },
  { x: 1, y: -1, z: 0, type: 'project', projectIndex: 3 }, // MPP Redesign
  { x: -1, y: 1, z: 0, type: 'wireframe' },
  
  { x: 0, y: 1, z: 1, type: 'wireframe' },
  { x: 0, y: -1, z: -1, type: 'wireframe' },
  { x: 0, y: 1, z: -1, type: 'project', projectIndex: 4 }, // Kolelo
  { x: 0, y: -1, z: 1, type: 'wireframe' },
  
  { x: 1, y: 0, z: 1, type: 'wireframe' },
  { x: -1, y: 0, z: -1, type: 'project', projectIndex: 5 }, // Braga Corridor
  { x: 1, y: 0, z: -1, type: 'wireframe' },
  { x: -1, y: 0, z: 1, type: 'wireframe' },
  
  // Outer Cluster
  { x: 2, y: 1, z: -1, type: 'wireframe' },
  { x: -2, y: -1, z: 1, type: 'wireframe' },
  { x: 1, y: 2, z: 1, type: 'wireframe' },
  { x: -1, y: -2, z: -1, type: 'wireframe' },
  { x: -1, y: 1, z: 2, type: 'wireframe' },
  { x: 1, y: -1, z: -2, type: 'wireframe' },
  { x: 2, y: -1, z: 1, type: 'wireframe' },
  { x: -2, y: 1, z: -1, type: 'wireframe' },
  { x: 1, y: -2, z: 1, type: 'wireframe' },
  { x: -1, y: 2, z: -1, type: 'wireframe' },
  
  { x: 2, y: 0, z: 0, type: 'wireframe' },
  { x: -2, y: 0, z: 0, type: 'wireframe' },
  { x: 0, y: 2, z: 0, type: 'wireframe' },
  { x: 0, y: -2, z: 0, type: 'wireframe' },
  { x: 0, y: 0, z: 2, type: 'wireframe' },
  { x: 0, y: 0, z: -2, type: 'wireframe' }
];

export default function ThreeHero({ onSelectProject }) {
  const mountRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.08);

    // --- 2. Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Position camera far back to encompass the grid
    camera.position.z = 10;

    // --- 3. Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x050505, 1);
    container.appendChild(renderer.domElement);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // --- 5. Textures ---
    const textureLoader = new THREE.TextureLoader();

    // --- 6. Cube Group & Meshes Generation ---
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const cubeSize = 0.95;
    const spacing = 1.6;

    // Geometries
    const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Track meshes for raycasting
    const raycastTargets = [];
    const projectMeshesMap = new Map(); // Mapping meshes back to project data

    CUBE_CONFIGS.forEach((config) => {
      // Calculate position with spacing and a tiny organic noise offset
      const posX = config.x * spacing + (Math.random() - 0.5) * 0.04;
      const posY = config.y * spacing + (Math.random() - 0.5) * 0.04;
      const posZ = config.z * spacing + (Math.random() - 0.5) * 0.04;

      if (config.type === 'project') {
        const project = projectsData[config.projectIndex];
        if (!project) return;

        // Load project cover texture
        const texture = textureLoader.load(project.image);
        texture.colorSpace = THREE.SRGBColorSpace;

        // Apply texture to all faces for a solid 3D photo box appearance
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xffffff,
          transparent: true,
          opacity: 0.95
        });

        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.position.set(posX, posY, posZ);
        
        // Setup initial metadata
        mesh.userData = {
          type: 'project',
          project: project,
          originalScale: 1.0,
          originalPosition: new THREE.Vector3(posX, posY, posZ)
        };

        cubeGroup.add(mesh);
        raycastTargets.push(mesh);
        projectMeshesMap.set(mesh.uuid, mesh);

      } else {
        // Wireframe / outline cube
        // 1. Semi-transparent core fill
        const fillMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.02,
          depthWrite: false
        });
        const fillMesh = new THREE.Mesh(boxGeometry, fillMat);
        
        // 2. Glowing wireframe lines
        const edges = new THREE.EdgesGeometry(boxGeometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.12
        });
        const lineSegments = new THREE.LineSegments(edges, lineMat);
        
        const wireframeGroup = new THREE.Group();
        wireframeGroup.position.set(posX, posY, posZ);
        wireframeGroup.add(fillMesh);
        wireframeGroup.add(lineSegments);

        cubeGroup.add(wireframeGroup);
      }
    });

    // --- 7. Mouse & Drag Interaction States ---
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    let targetRotationX = 0.2;
    let targetRotationY = -0.4;
    
    // Track hovered item locally to prevent duplicate calculations
    let currentHoveredMesh = null;

    // --- 8. Event Handlers ---
    const handlePointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      // Calculate normalized device coordinates for raycasting
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Update tooltip position to follow cursor
      setTooltipPos({ x: e.clientX + 16, y: e.clientY + 16 });

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      if (currentHoveredMesh && currentHoveredMesh.userData.project) {
        onSelectProject(currentHoveredMesh.userData.project);
      }
    };

    // Attach event listeners
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // --- 9. Animation & Render Loop ---
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // 1. Slow, passive self-rotation when user is not actively dragging
      if (!isDragging) {
        targetRotationY += 0.0006;
        targetRotationX += 0.0003;
      }

      // 2. Smoothly damp the rotation (inertia effect)
      cubeGroup.rotation.y += (targetRotationY - cubeGroup.rotation.y) * 0.05;
      cubeGroup.rotation.x += (targetRotationX - cubeGroup.rotation.x) * 0.05;

      // 3. Raycast to detect hover highlights on project cubes
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const intersectedMesh = intersects[0].object;

        if (currentHoveredMesh !== intersectedMesh) {
          // Reset previous hover state
          if (currentHoveredMesh) {
            currentHoveredMesh.scale.set(1, 1, 1);
          }

          // Set new hover state
          currentHoveredMesh = intersectedMesh;
          setHoveredProject(intersectedMesh.userData.project);
          document.body.style.cursor = 'pointer';
        }

        // Scale up animation on hover
        intersectedMesh.scale.x += (1.18 - intersectedMesh.scale.x) * 0.15;
        intersectedMesh.scale.y += (1.18 - intersectedMesh.scale.y) * 0.15;
        intersectedMesh.scale.z += (1.18 - intersectedMesh.scale.z) * 0.15;

      } else {
        if (currentHoveredMesh) {
          // Animate back to original scale
          currentHoveredMesh.scale.x += (1.0 - currentHoveredMesh.scale.x) * 0.15;
          currentHoveredMesh.scale.y += (1.0 - currentHoveredMesh.scale.y) * 0.15;
          currentHoveredMesh.scale.z += (1.0 - currentHoveredMesh.scale.z) * 0.15;

          // If close enough to original scale, reset reference
          if (Math.abs(currentHoveredMesh.scale.x - 1.0) < 0.01) {
            currentHoveredMesh.scale.set(1, 1, 1);
            currentHoveredMesh = null;
            setHoveredProject(null);
            document.body.style.cursor = 'default';
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 10. Responsive Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 11. Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      if (renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose geometry and materials
      boxGeometry.dispose();
      raycastTargets.forEach((mesh) => {
        mesh.material.dispose();
      });
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, [onSelectProject]);

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-charcoal-deep overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Blueprint Grids Overlay (Subtle) */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-[0.03] z-10" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-[0.05] z-10" />

      {/* Floating Tooltip Indicator */}
      {hoveredProject && (
        <div 
          className="fixed pointer-events-none z-40 bg-white/95 backdrop-blur-md text-neutral-900 px-4 py-2 border border-white/20 shadow-xl transition-all duration-75"
          style={{ 
            left: `${tooltipPos.x}px`, 
            top: `${tooltipPos.y}px`,
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          <div className="text-[10px] uppercase tracking-mega font-medium">Explore Project</div>
          <div className="text-sm font-semibold tracking-wide mt-0.5">{hoveredProject.title}</div>
        </div>
      )}

      {/* Bottom Center Hint Info */}
      <div className="absolute bottom-16 md:bottom-24 inset-x-0 mx-auto w-fit z-20 text-center pointer-events-none">
        <p className="font-display text-[9px] uppercase tracking-mega text-white/40">
          Drag to rotate matrix • Click cubes to view details
        </p>
      </div>

    </section>
  );
}
