/**
 * Generate a 9:16 aspect ratio image of the donor wall
 * @param {Array} donors - Array of donor objects
 * @param {string} highlightedName - Name of the donor to highlight
 * @returns {Promise<string>} - Data URL of the generated image
 */
export async function generateDonorImage(donors, highlightedName) {
  // Create canvas with 9:16 aspect ratio (1080x1920 for Instagram Stories)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 1080;
  canvas.height = 1920;
  
  // Fill with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Enable text rendering quality
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Load fonts
  await document.fonts.ready;
  
  // Configuration
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const lineHeight = 100;
  const nameSpacing = 40;
  const separatorSize = 8;
  
  // Find highlighted donor
  const highlightedIndex = donors.findIndex(
    d => d.name.toLowerCase() === highlightedName.toLowerCase()
  );
  
  if (highlightedIndex === -1) {
    throw new Error('Donor not found');
  }
  
  // Reorder to put highlighted in middle position
  let reorderedDonors = [...donors];
  const targetPosition = Math.floor(donors.length / 2);
  [reorderedDonors[highlightedIndex], reorderedDonors[targetPosition]] =
  [reorderedDonors[targetPosition], reorderedDonors[highlightedIndex]];
  
  // Repeat donors to fill screen
  const extendedDonors = [];
  for (let r = 0; r < 15; r++) {
    extendedDonors.push(...reorderedDonors);
  }
  
  // Find highlighted in extended list (middle repetition)
  const middleRep = Math.floor(15 / 2);
  const highlightedInExtended = (middleRep * reorderedDonors.length) + targetPosition;
  
  // Build lines ensuring highlighted donor is in middle of its line
  const lines = [];
  let currentLine = [];
  
  for (let i = 0; i < extendedDonors.length; i++) {
    const donor = extendedDonors[i];
    const isHighlighted = i === highlightedInExtended;
    
    currentLine.push({ donor, isHighlighted, index: i });
    
    // Force line break after highlighted donor's right neighbor
    if (i === highlightedInExtended + 1) {
      lines.push(currentLine);
      currentLine = [];
    }
    // Normal line breaks for other lines (every 4-6 names)
    else if (!isHighlighted && i !== highlightedInExtended - 1 && i !== highlightedInExtended + 1 && currentLine.length >= 5) {
      lines.push(currentLine);
      currentLine = [];
    }
  }
  
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  // Find highlighted line
  let highlightedLineIdx = lines.findIndex(line =>
    line.some(item => item.isHighlighted)
  );
  
  // Calculate Y offset to center highlighted line
  const highlightedLineY = highlightedLineIdx * lineHeight;
  const offsetY = centerY - highlightedLineY;
  
  // Draw all lines
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const lineY = (lineIdx * lineHeight) + offsetY;
    
    // Skip if outside visible area
    if (lineY < -lineHeight || lineY > canvas.height + lineHeight) continue;
    
    // Calculate line width and positions
    const lineItems = [];
    let totalWidth = 0;
    
    for (let i = 0; i < line.length; i++) {
      const item = line[i];
      ctx.font = item.isHighlighted ? 'bold 80px Inter, sans-serif' : '200 50px "TT Ricks", sans-serif';
      const metrics = ctx.measureText(item.donor.name);
      const textWidth = metrics.width;
      
      lineItems.push({ ...item, textWidth });
      totalWidth += textWidth;
      if (i < line.length - 1) {
        totalWidth += nameSpacing + separatorSize + nameSpacing;
      }
    }
    
    // Start X for center alignment
    let currentX = centerX - (totalWidth / 2);
    
    // Draw each name in the line
    for (let i = 0; i < lineItems.length; i++) {
      const item = lineItems[i];
      
      if (item.isHighlighted) {
        // Highlighted name - bold, red, sharp
        ctx.font = 'bold 80px Inter, sans-serif';
        ctx.fillStyle = '#d81b60';
        ctx.globalAlpha = 1.0;
        ctx.shadowColor = 'rgba(216, 27, 96, 0.3)';
        ctx.shadowBlur = 10;
        ctx.fillText(item.donor.name, currentX + item.textWidth / 2, lineY);
        ctx.shadowBlur = 0;
      } else {
        // Non-highlighted - faded and blurred
        ctx.font = '200 50px "TT Ricks", sans-serif';
        
        // Draw multiple times for blur effect
        const blurPasses = [
          { alpha: 0.15, offset: 0 },
          { alpha: 0.12, offset: 1 },
          { alpha: 0.12, offset: -1 },
          { alpha: 0.08, offset: 1.5 },
          { alpha: 0.08, offset: -1.5 }
        ];
        
        for (const pass of blurPasses) {
          ctx.globalAlpha = pass.alpha;
          ctx.fillStyle = '#B8B8B8';
          ctx.fillText(item.donor.name, currentX + item.textWidth / 2 + pass.offset, lineY);
          ctx.fillText(item.donor.name, currentX + item.textWidth / 2, lineY + pass.offset);
        }
        
        ctx.globalAlpha = 1.0;
      }
      
      currentX += item.textWidth + nameSpacing;
      
      // Draw separator
      if (i < lineItems.length - 1) {
        ctx.fillStyle = '#d0d0d0';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(currentX, lineY, separatorSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        currentX += separatorSize + nameSpacing;
      }
    }
  }
  
  // Return as data URL
  return canvas.toDataURL('image/jpeg', 0.95);
}