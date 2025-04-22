"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface MermaidChartProps {
  chart: string;
  config?: any;
  className?: string;
}

export function MermaidChart({ chart, config, className }: MermaidChartProps) {
  const [svg, setSvg] = useState<string>('');
  const [id] = useState(`mermaid-${Math.random().toString(36).substring(2, 11)}`);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: theme === 'dark' ? 'dark' : 'neutral',
      ...config,
    });

    // Render the chart
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Error rendering mermaid chart:', error);
        setSvg(`<div>Error rendering chart</div>`);
      }
    };
    
    renderChart();
  }, [chart, theme, id, config]);

  return (
    <div 
      ref={containerRef}
      className={cn("mermaid-chart flex justify-center", className)}
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
