import React, { useEffect } from 'react';

const PieChart = ({ data, canvasId }) => {
  useEffect(() => {
    const drawPieChart = () => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;

      const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);

      let startAngle = 0;

      if (totalPercentage === 0) {
        // Add a default slice when there is no data
        ctx.fillStyle = 'lightgray';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.fill();
      }

      data.forEach((item, index) => {
        const sliceAngle = (item.percentage / totalPercentage) * Math.PI * 2;

        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle, false);
        ctx.fill();

        // Calculate label position
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius / 1.5); // Adjust label position
        const labelY = centerY + Math.sin(labelAngle) * (radius / 1.5);

        ctx.font = '14px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center'; // Center the text
        ctx.fillText(item.label, labelX, labelY);

        startAngle += sliceAngle;
      });
    };

    drawPieChart(); // Call the function when the component is mounted
  }, [data, canvasId]);

  return <canvas id={canvasId} width="600" height="600" />; // Increase canvas size for a larger chart
};

export default PieChart;
