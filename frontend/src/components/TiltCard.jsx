// src/components/TiltCard.jsx

import React, { useRef, useState } from 'react';

const TiltCard = ({ children }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  // Nuevo estado para la posición relativa del mouse para el efecto holográfico
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const normalizedX = (mouseX - centerX) / (width / 2); // -1 (izquierda) a 1 (derecha)
    const normalizedY = (mouseY - centerY) / (height / 2); // -1 (arriba) a 1 (abajo)

    // Ajusta tiltAmount para más o menos inclinación
    const tiltAmount = 25; // ¡Aumentado para que sea más notorio!
    const rotateX = normalizedY * -tiltAmount;
    const rotateY = normalizedX * tiltAmount;

    setRotation({ x: rotateX, y: rotateY });

    // Calcular posición del mouse relativa a la tarjeta (0-100%) para el reflejo
    const offsetX = (e.clientX - left) / width * 100;
    const offsetY = (e.clientY - top) / height * 100;
    setMousePosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setMousePosition({ x: 50, y: 50 }); // Vuelve al centro para el reflejo
  };

  // Estilos CSS variables para el reflejo
  const inlineStyles = {
    '--mouse-x': `${mousePosition.x}%`,
    '--mouse-y': `${mousePosition.y}%`,
    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    transition: 'transform 0.2s ease-out',
    // Transición suave para volver a 0 cuando el mouse se va
    ...(rotation.x === 0 && rotation.y === 0 && { transition: 'transform 0.5s ease' }),
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={inlineStyles}
    >
      {children}
    </div>
  );
};

export default TiltCard;