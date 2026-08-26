import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from './Projects';

// Define a structured 3D matrix coordinate configuration for the floating cubes.
// RESTORED: Original cube configs from when the web was first created.
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
  { x: -1, y: 1, z: 0, type: 'project', projectIndex: 4 }, // Kolelo (moved here to not block Nest of Renewal)
  
  { x: 0, y: 1, z: 1, type: 'wireframe' },
  { x: 0, y: -1, z: -1, type: 'wireframe' },
  { x: 0, y: 1, z: -1, type: 'wireframe' },
  { x: 0, y: -1, z: 1, type: 'wireframe' },
  
  { x: 1, y: 0, z: 1, type: 'wireframe' },
  { x: -1, y: 0, z: -1, type: 'project', projectIndex: 5 }, // Braga Corridor (Left)
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

export default function ThreeHero({ onSelectProject, selectedProject }) {
  const mountRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const selectedProjectRef = useRef(selectedProject);
  const onSelectProjectRef = useRef(onSelectProject);
  const targetCameraZRef = useRef(11.2);
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0);
  const cubeGroupRef = useRef(null);

  const targetCameraPosRef = useRef(new THREE.Vector3(0, 0, 11.2));
  const targetCameraQuatRef = useRef(new THREE.Quaternion());
  const projectMeshesMapRef = useRef(new Map());

  useEffect(() => {
    selectedProjectRef.current = selectedProject;

    if (selectedProject && cubeGroupRef.current) {
      const mesh = projectMeshesMapRef.current.get(selectedProject.id);
      if (mesh) {
        // Read local position from original position (un-rotated space)
        const localPos = mesh.userData.originalPosition;
        if (!localPos) return;

        // Smoothly rotate the group to the nearest multiple of 2 * Math.PI (perfectly flat and upright)
        const targetY = Math.round(cubeGroupRef.current.rotation.y / (2 * Math.PI)) * (2 * Math.PI);
        const targetX = Math.round(cubeGroupRef.current.rotation.x / (2 * Math.PI)) * (2 * Math.PI);
        
        targetRotationYRef.current = targetY;
        targetRotationXRef.current = targetX;
        
        // Place camera exactly 2.25 units in Z in front of the local position
        const targetPos = new THREE.Vector3(localPos.x, localPos.y, localPos.z + 2.25);
        
        // Target lookAt is exactly the center of the cube (keeping it perfectly centered)
        const targetLookAt = new THREE.Vector3(localPos.x, localPos.y, localPos.z);
        
        // Calculate the target rotation matrix and quaternion
        const tempMatrix = new THREE.Matrix4();
        tempMatrix.lookAt(targetPos, targetLookAt, new THREE.Vector3(0, 1, 0));
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(tempMatrix);
        
        targetCameraPosRef.current.copy(targetPos);
        targetCameraQuatRef.current.copy(targetQuat);
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    onSelectProjectRef.current = onSelectProject;
  }, [onSelectProject]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();
    // Fog is removed so cubes remain perfectly sharp and clear, even when zooming out

    // --- 2. Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Camera position starts at overview
    camera.position.set(0, 0, targetCameraZRef.current);

    // --- 3. Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // --- 5. Textures ---
    let isMounted = true;
    let isThreeLoaded = false;
    let simulatedProgress = 0;

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
      isThreeLoaded = true;
      if (isMounted && simulatedProgress >= 100) {
        setTimeout(() => {
          if (isMounted) setIsLoading(false);
        }, 200);
      }
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // Simulate organic progress in parallel, matching the main preloader speed (~1.2s)
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          simulatedProgress = 100;
          if (isMounted && isThreeLoaded) {
            setTimeout(() => {
              if (isMounted) setIsLoading(false);
            }, 200);
          }
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 5;
        const next = Math.min(prev + increment, 100);
        simulatedProgress = next;
        return next;
      });
    }, 45);

    // --- 6. Cube Group & Meshes Generation ---
    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;
    scene.add(cubeGroup);

    // RESTORED: original cubeSize and spacing
    const cubeSize = 0.95;
    const spacing = 1.6;

    // Geometries
    const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Track meshes for raycasting
    const raycastTargets = [];
    const projectMeshesMap = projectMeshesMapRef.current;

    CUBE_CONFIGS.forEach((config) => {
      // RESTORED: original position calculation with organic random noise offset
      const posX = config.x * spacing + (Math.random() - 0.5) * 0.04;
      const posY = config.y * spacing + (Math.random() - 0.5) * 0.04;
      const posZ = config.z * spacing + (Math.random() - 0.5) * 0.04;

      if (config.type === 'project') {
        const project = projectsData[config.projectIndex];
        if (!project) return;

        // Load project cover texture
        const texture = textureLoader.load(project.image);
        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xffffff,
          transparent: true,
          opacity: 0.95
        });

        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.position.set(posX, posY, posZ);
        
        mesh.userData = {
          type: 'project',
          project: project,
          originalScale: 1.0,
          originalPosition: new THREE.Vector3(posX, posY, posZ)
        };

        cubeGroup.add(mesh);
        raycastTargets.push(mesh);
        projectMeshesMap.set(project.id, mesh);
      } else {
        // Wireframe placeholders
        const wireframeGeom = new THREE.EdgesGeometry(boxGeometry);
        const wireframeMat = new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.08
        });
        const line = new THREE.LineSegments(wireframeGeom, wireframeMat);
        line.position.set(posX, posY, posZ);
        
        line.userData = {
          type: 'wireframe',
          originalScale: 1.0,
          originalPosition: new THREE.Vector3(posX, posY, posZ)
        };

        cubeGroup.add(line);
      }
    });

    // --- 7. Raycasting & Hover State ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    let currentHoveredMesh = null;

    // --- 8. Event Handlers ---
    const handlePointerDown = (e) => {
      if (selectedProjectRef.current) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (selectedProjectRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPos({ x: e.clientX + 16, y: e.clientY + 16 });

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationYRef.current += deltaX * 0.012;
        targetRotationXRef.current += deltaY * 0.012;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      if (selectedProjectRef.current) return;
      if (currentHoveredMesh && currentHoveredMesh.userData.project) {
        if (onSelectProjectRef.current) {
          onSelectProjectRef.current(currentHoveredMesh.userData.project);
        }
      }
    };

    // Zoom camera in/out on scroll wheel when on home screen
    const handleWheelZoom = (e) => {
      if (selectedProjectRef.current) return;
      
      const zoomSpeed = 0.005;
      targetCameraZRef.current += e.deltaY * zoomSpeed;
      
      // Keep targetCameraZ constrained between 4.5 (zoom in) and 20.0 (zoom out)
      targetCameraZRef.current = Math.max(4.5, Math.min(targetCameraZRef.current, 20.0));
    };

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    targetRotationYRef.current = 0;
    targetRotationXRef.current = 0;

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);
    window.addEventListener('wheel', handleWheelZoom, { passive: true });

    // --- 9. Animation & Render Loop ---
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Disable rotation increment when dragging or when selectedProject is active
      if (!isDragging && !selectedProjectRef.current) {
        targetRotationYRef.current += 0.0025;
        targetRotationXRef.current += 0.0012;
      }

      cubeGroup.rotation.y += (targetRotationYRef.current - cubeGroup.rotation.y) * 0.15;
      cubeGroup.rotation.x += (targetRotationXRef.current - cubeGroup.rotation.x) * 0.15;

      // Smoothly interpolate camera position and rotation depending on state
      if (selectedProjectRef.current) {
        // Zoom camera in to face the selected project's cube with calculated upright quaternion
        camera.position.lerp(targetCameraPosRef.current, 0.06);
        camera.quaternion.slerp(targetCameraQuatRef.current, 0.06);
      } else {
        // Zoom camera back out to overview position, dynamically incorporating scroll-wheel Z changes
        const homePos = new THREE.Vector3(0, 0, targetCameraZRef.current);
        const tempMatrix = new THREE.Matrix4();
        tempMatrix.lookAt(homePos, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));
        const homeQuat = new THREE.Quaternion().setFromRotationMatrix(tempMatrix);

        camera.position.lerp(homePos, 0.06);
        camera.quaternion.slerp(homeQuat, 0.06);
      }

      // Disable raycasting if a project is selected
      if (selectedProjectRef.current) {
        if (currentHoveredMesh) {
          currentHoveredMesh.scale.set(1, 1, 1);
          currentHoveredMesh = null;
          setHoveredProject(null);
          document.body.style.cursor = 'default';
        }

        renderer.render(scene, camera);
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const intersectedMesh = intersects[0].object;

        if (currentHoveredMesh !== intersectedMesh) {
          if (currentHoveredMesh) {
            currentHoveredMesh.scale.set(1, 1, 1);
          }
          currentHoveredMesh = intersectedMesh;
          setHoveredProject(intersectedMesh.userData.project);
          document.body.style.cursor = 'pointer';
        }

        intersectedMesh.scale.x += (1.18 - intersectedMesh.scale.x) * 0.15;
        intersectedMesh.scale.y += (1.18 - intersectedMesh.scale.y) * 0.15;
        intersectedMesh.scale.z += (1.18 - intersectedMesh.scale.z) * 0.15;

      } else {
        if (currentHoveredMesh) {
          currentHoveredMesh.scale.x += (1.0 - currentHoveredMesh.scale.x) * 0.15;
          currentHoveredMesh.scale.y += (1.0 - currentHoveredMesh.scale.y) * 0.15;
          currentHoveredMesh.scale.z += (1.0 - currentHoveredMesh.scale.z) * 0.15;

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

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(progressInterval);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheelZoom);
      isMounted = false;
      if (renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      boxGeometry.dispose();
      raycastTargets.forEach((mesh) => {
        mesh.material.dispose();
      });
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden select-none">
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Modern minimal loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50 pointer-events-auto select-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-8"
            >
              <h1 className="font-display font-light text-3xl sm:text-4xl tracking-[0.35em] text-neutral-900 uppercase pl-[0.35em]">
                AUFA
              </h1>

              {/* Subtle Progress Bar */}
              <div className="w-28 sm:w-36 h-[1.5px] bg-neutral-900/10 overflow-hidden relative rounded-full">
                <motion.div
                  className="h-full bg-neutral-900 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tooltip Indicator - Dark premium tooltip on light theme */}
      {hoveredProject && !selectedProject && (
        <div 
          className="fixed pointer-events-none z-40 bg-neutral-950/95 backdrop-blur-md text-white px-4 py-2.5 border border-neutral-800 shadow-xl"
          style={{ 
            left: `${tooltipPos.x}px`, 
            top: `${tooltipPos.y}px`,
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          <div className="text-xs font-semibold tracking-wider">{hoveredProject.title}</div>
        </div>
      )}
    </div>
  );
}
