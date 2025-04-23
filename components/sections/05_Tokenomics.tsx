// --- START OF FILE components/sections/05_Tokenomics.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChartHorizontal, Check, CheckCircle, Coins, Construction, Copy, Droplets, ExternalLink, FileText, GitCommitVertical, Info, Lock, Megaphone, MinusCircle, PieChart as PieChartIcon, Sparkles, Target, Users } from "lucide-react"; // Changed Icons
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip as RechartsTooltip } from 'recharts';
import { toast } from "sonner";

// Data & Constants
interface AllocationItem { name: string; value: number; color: string; darkColor: string; description: string; icon: React.ElementType; }
const distributionData: AllocationItem[] = [
    { name: "Liquidity & Public Sale", value: 40, color: "hsl(262, 83%, 69%)", darkColor: "hsl(262, 70%, 72%)", description: "Funds initial Raydium LP (Burned), remaining allocated to potential future strategic public sale phases.", icon: Droplets }, // Violet
    { name: "Ecosystem & Marketing", value: 10, color: "hsl(149, 65%, 53%)", darkColor: "hsl(149, 58%, 60%)", description: "Dedicated to marketing, partnerships, community rewards, and platform development.", icon: Megaphone }, // Green
    { name: "Team (Vested)", value: 10, color: "hsl(38, 92%, 60%)", darkColor: "hsl(40, 88%, 65%)", description: "Transparent 6-month linear vesting via smart contract ensures long-term team alignment.", icon: Users }, // Amber
    { name: "Exchange Listings & Reserve", value: 40, color: "hsl(217, 89%, 61%)", darkColor: "hsl(217, 80%, 65%)", description: "Locked funds reserved for major CEX/DEX listing fees, market making support, and future strategic initiatives.", icon: Target }, // Blue
];
const TOTAL_SUPPLY = 1_000_000_000;
const contractAddress = "Not Yet Available";
const explorerBaseUrl = "https://solscan.io/token/";
const explorerLink = `${explorerBaseUrl}${contractAddress}`;
const pinkLockLink = "#"; // Placeholder: Update post-lock
const auditLink = "#"; // Placeholder: Update post-audit
const vestingContractLink = "#"; // Placeholder: Link to vesting contract page/verifier if available, otherwise #roadmap

const tokenDetails = [
    { key: "Token Name", value: "$ROACH (Antifragile)", icon: Sparkles, immutable: true },
    { key: "Ticker", value: "$ROACH", icon: null, immutable: true },
    { key: "Network", value: "Solana (SPL)", icon: GitCommitVertical, immutable: true },
    { key: "Total Supply", value: TOTAL_SUPPLY.toLocaleString(), icon: BarChartHorizontal, tooltip: "Fixed, non-inflationary supply.", immutable: true },
    { key: "Contract Address", value: contractAddress, icon: FileText, isAddress: true, link: explorerLink, tooltip: "View the verified contract code on Solscan.", immutable: true },
    { key: "Security Audit", value: "CertiK (In Progress)", icon: Construction, link: auditLink, tooltip: "Comprehensive security audit currently underway by CertiK. Click for planned report (placeholder).", external: true, pending: true },
    { key: "Liquidity", value: "To be Burned", icon: Lock, link: pinkLockLink, tooltip: "Raydium LP tokens scheduled for 12-month lock via PinkLock post-launch. Click for details (placeholder).", external: true, pending: true },
    { key: "Team Vesting", value: "6 Months Linear (Post-Launch)", icon: Users, link: vestingContractLink, tooltip: "Team tokens unlock linearly over 6 months via smart contract, starting after launch. Click for vesting schedule info.", external: vestingContractLink !== '#roadmap', pending: true }, // Mark as external if link isn't #roadmap
    { key: "Mint Authority", value: "Revoked Post-Launch", icon: MinusCircle, tooltip: "Minting disabled permanently after initial setup and distribution.", immutable: true, pending: true },
];


// Recharts Customizations (More polished active shape)
const renderActiveShape = (props: any) => { /* ... implementation remains largely the same ... */
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const Icon = payload.icon || PieChartIcon;

    return (
        <g style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }}>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} stroke="var(--card)" strokeWidth={2} />
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 4} outerRadius={outerRadius + 8} fill={fill} opacity={0.8} />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
            <circle cx={ex} cy={ey} r={4} fill={fill} stroke="var(--card)" strokeWidth={2} />
            {/* Label Content */}
             <foreignObject x={ex + (cos >= 0 ? 1 : -1) * 10 - (cos >= 0 ? 0 : 60)} y={ey - 20} width={70} height={40}>
                <div className={cn("flex flex-col items-center justify-center w-full h-full", textAnchor === 'start' ? 'items-start' : 'items-end')}>
                  <span className="text-xs font-semibold text-foreground block truncate max-w-full" style={{ textAnchor: textAnchor }}>{payload.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground block truncate max-w-full" style={{ textAnchor: textAnchor }}>{(percent * 100).toFixed(0)}%</span>
                </div>
              </foreignObject>

              {/* Central Icon (adjusted size/opacity) */}
              {Icon && (
                 // Center the icon better
                  <g transform={`translate(${cx - 12}, ${cy - 12})`}>
                       <Icon height="24" width="24" fill={fill} opacity={0.25} />
                 </g>
             )}
         </g>
     );
};


// Tooltip Remains similar
const CustomTooltip = ({ active, payload, theme }: { active?: boolean; payload?: any[]; theme: 'light' | 'dark' }) => { /* ... */
    if (active && payload && payload.length) {
        const data = payload[0].payload as AllocationItem;
        const color = theme === 'dark' ? data.darkColor || data.color : data.color;
        const Icon = data.icon;
        return (
            <div className="bg-popover/90 text-popover-foreground border border-border rounded-lg shadow-xl p-3 text-xs max-w-[240px] backdrop-blur-sm">
                <div className="flex items-center gap-2 font-semibold mb-1.5 border-b border-border/30 pb-1">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    {data.name} ({data.value}%)
                 </div>
                <p className="text-muted-foreground mb-1.5"><strong className="text-foreground font-mono">~{(data.value / 100 * TOTAL_SUPPLY).toLocaleString()}</strong> Tokens</p>
                {data.description && <p className="text-muted-foreground text-balance leading-snug">{data.description}</p>}
            </div>
        );
     }
     return null;
};


const renderLegend = ({ payload, theme, onMouseEnter, onMouseLeave, activeIndex }: { payload?: any[], theme: 'light' | 'dark', onMouseEnter: Function, onMouseLeave: Function, activeIndex: number | null }) => { /* ... */
    if (!payload) return null;
    return (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3 px-2">
             {payload.map((entry: any, index: number) => {
                const data = entry.payload as AllocationItem;
                const color = theme === 'dark' ? data.darkColor || data.color : data.color;
                const Icon = data.icon || Coins;
                const isActive = index === activeIndex;
                return (
                    <li key={`item-${index}`}
                        className={cn(
                            "flex items-center cursor-pointer transition-all duration-200 ease-out transform hover:scale-[1.03]",
                             isActive ? "opacity-100 scale-[1.03] font-medium text-foreground" : "opacity-75 hover:opacity-100 text-muted-foreground"
                        )}
                        onMouseEnter={() => onMouseEnter(data, index)}
                        onMouseLeave={() => onMouseLeave()}
                     >
                        <Icon className="h-3 w-3 mr-1 shrink-0" style={{ color }} />
                        <span className="text-xs">{data.name} ({data.value}%)</span>
                     </li>
                );
            })}
        </ul>
    );
};

export function Tokenomics() {
    const [copied, setCopied] = useState<Record<string, boolean>>({});
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light, detect on mount

    useEffect(() => { // Safe theme detection for SSR/hydration mismatch
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const handleCopy = useCallback((textToCopy: string, key: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied({ [key]: true });
            toast.success(`${key} copied to clipboard!`, { duration: 2500 });
            setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2500);
        }).catch(err => {
            console.error("Copy failed:", err);
            toast.error(`Failed to copy ${key}.`);
        });
    }, []);

    const onPieEnter = useCallback((_: any, index: number) => setActiveIndex(index), []);
    const onPieLeave = useCallback(() => setActiveIndex(null), []);

    const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
    const tableRowVariants = { hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } };

    return (
        <TooltipProvider>
             <Section id="tokenomics" align="center" useSuspense className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/10 via-background to-muted/5 dark:from-background/10 dark:via-background dark:to-background/5">
                <SectionHeader
                    title="Tokenomics: Engineered for Longevity"
                    description="A fixed-supply framework ensures scarcity, while strategic allocation supports initial stability, growth initiatives, and long-term ecosystem health."
                    subtitle={<><PieChartIcon className="inline h-4 w-4 mr-1.5" /> Supply & Allocation Strategy </>}
                    align="inherit"
                />

                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:gap-8 max-w-7xl mx-auto items-stretch">
                     {/* Distribution Chart Card (Span 3) */}
                    <motion.div className="lg:col-span-3" variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <Card className="h-full flex flex-col border shadow-lg shadow-primary/5 dark:shadow-black/20 dark:bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl font-semibold">Token Allocation Overview</CardTitle>
                                <CardDescription>Fixed Supply: <strong className="text-foreground font-mono tracking-tight">1,000,000,000 $ROACH</strong> (Non-inflationary)</CardDescription>
                             </CardHeader>
                             <CardContent className="flex-grow flex flex-col justify-center items-center">
                                 <AspectRatio ratio={16 / 12} className="w-full max-w-[550px] min-h-[380px] md:min-h-[420px]"> {/* Adjusted aspect ratio and min-height */}
                                     <ResponsiveContainer width="100%" height="100%">
                                         <PieChart margin={{ top: 0, right: 10, bottom: 0, left: 10 }}> {/* Added slight margin */}
                                             <defs>
                                                 {/* Removed unused gradient */}
                                            </defs>
                                             <RechartsTooltip
                                                 content={<CustomTooltip theme={theme} />}
                                                 cursor={{ fill: 'hsl(var(--accent) / 0.15)', stroke: 'hsl(var(--border) / 0.3)', strokeWidth: 1 }}
                                                 wrapperStyle={{ zIndex: 50 }}
                                             />
                                             <Pie
                                                 activeIndex={activeIndex ?? -1} // Use -1 when null
                                                activeShape={renderActiveShape}
                                                 data={distributionData}
                                                 cx="50%" cy="45%" // Slightly adjusted center
                                                 labelLine={false}
                                                 outerRadius="80%" innerRadius="55%" // Adjusted radii for donut look
                                                fill="#8884d8" paddingAngle={2} dataKey="value"
                                                 stroke="var(--card)" strokeWidth={2}
                                                 onMouseEnter={onPieEnter}
                                                 onMouseLeave={onPieLeave}
                                                >
                                                 {distributionData.map((entry, index) => (
                                                     <Cell key={`cell-${index}`} fill={theme === 'dark' ? entry.darkColor || entry.color : entry.color} className="transition-opacity duration-200 ease-out outline-none" />
                                                 ))}
                                             </Pie>
                                            <Legend
                                                 content={(props) => renderLegend({ ...props, theme: theme, onMouseEnter: onPieEnter, onMouseLeave: onPieLeave, activeIndex: activeIndex })}
                                                verticalAlign="bottom" iconSize={10}
                                                 wrapperStyle={{ paddingTop: '10px', paddingBottom: '5px' }} // Adjusted padding
                                             />
                                         </PieChart>
                                     </ResponsiveContainer>
                                </AspectRatio>
                            </CardContent>
                         </Card>
                    </motion.div>

                     {/* Token Details Card (Span 2) */}
                    <motion.div className="lg:col-span-2" variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 }}>
                        <Card className="h-full flex flex-col border shadow-lg shadow-primary/5 dark:shadow-black/20 dark:bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl font-semibold">Core Token Attributes</CardTitle>
                                 <CardDescription>Key properties, security measures, and verification links.</CardDescription>
                             </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                                <div className="flex-grow overflow-x-auto">
                                     <Table>
                                         <TableBody>
                                            {tokenDetails.map((item, index) => (
                                                 <motion.tr
                                                    key={item.key}
                                                     className="border-b last:border-b-0 hover:bg-muted/20 dark:hover:bg-muted/10 transition-colors align-top min-h-[52px] group" // Use group for hover state
                                                    variants={tableRowVariants} initial="hidden" whileInView="visible"
                                                     viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.35, delay: index * 0.06 }}
                                                >
                                                    <TableCell className="font-medium text-muted-foreground text-xs align-middle py-2.5 pr-2 w-[125px] whitespace-nowrap">
                                                         <div className="flex items-center gap-1.5">
                                                             {item.icon && <item.icon className={cn("h-4 w-4 shrink-0", item.immutable ? "text-primary opacity-90" : "opacity-70", item.pending && "text-amber-500")} />}
                                                            {item.key}
                                                             {item.tooltip && (
                                                                 <Tooltip delayDuration={100}>
                                                                     <TooltipTrigger className="cursor-help flex items-center ml-auto"><Info className="h-3 w-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" /></TooltipTrigger>
                                                                     <TooltipContent side="left" align="start" className="max-w-[220px]"><p className="text-xs">{item.tooltip}</p></TooltipContent>
                                                                </Tooltip>
                                                             )}
                                                         </div>
                                                     </TableCell>
                                                    <TableCell className="text-sm font-medium py-2.5 align-middle">
                                                        <div className="flex items-center gap-1">
                                                            {item.link && item.link !== '#' && item.link !== "#roadmap" && !item.pending ? (
                                                                 <Link href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-colors inline-flex items-center gap-1 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm py-0.5" title={item.tooltip || `View ${item.key}`}>
                                                                     <span className={cn(item.isAddress && "font-mono text-xs block truncate max-w-[120px] sm:max-w-[150px]")}>{item.value}</span>
                                                                     <ExternalLink className="h-3 w-3 text-muted-foreground group-hover/link:text-primary transition-colors shrink-0 opacity-60" />
                                                                 </Link>
                                                             ) : item.link === "#roadmap" ? ( // Special case for internal roadmap link
                                                                 <Link href="#roadmap" className="hover:text-primary hover:underline transition-colors inline-flex items-center gap-1 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm py-0.5" title={item.tooltip || `View ${item.key}`}>
                                                                    {item.value}
                                                                </Link>
                                                            ) : ( // Non-linkable or pending value
                                                                <span className={cn(item.isAddress && "font-mono text-xs block truncate max-w-[120px] sm:max-w-[150px]", item.pending && "italic text-muted-foreground/80")}>{item.value}</span>
                                                            )}
                                                             {item.isAddress && (
                                                                <Tooltip delayDuration={100}>
                                                                     <TooltipTrigger asChild>
                                                                         <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => handleCopy(item.value, item.key)} aria-label={`Copy ${item.key}`}>
                                                                             {copied[item.key] ? <Check className="h-4 w-4 text-green-500 animate-in fade-in duration-300" /> : <Copy className="h-3.5 w-3.5" />}
                                                                        </Button>
                                                                     </TooltipTrigger>
                                                                    <TooltipContent side="top"><p>Copy Address</p></TooltipContent>
                                                                 </Tooltip>
                                                            )}
                                                         </div>
                                                     </TableCell>
                                                 </motion.tr>
                                             ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="mt-auto pt-4 border-t border-border/15 dark:border-border/20 px-1">
                                      {/* Visual Placeholder: Immutable Properties */}
                                     <div className="relative bg-gradient-to-br from-muted/10 via-transparent to-muted/10 border border-dashed border-primary/20 rounded-md p-3 flex items-center justify-center gap-4 min-h-[65px] overflow-hidden">
                                         {/* Subtle icons */}
                                        <FileText className="h-5 w-5 text-primary opacity-40 absolute top-2 left-2 rotate-[-10deg]" />
                                        <MinusCircle className="h-5 w-5 text-primary opacity-40 absolute bottom-2 right-2 rotate-[10deg]" />
                                         <BarChartHorizontal className="h-5 w-5 text-primary opacity-40 absolute top-1/2 left-1/2 -translate-x-[80px] -translate-y-1/2 "/>
                                        <p className="text-xs text-muted-foreground/80 italic text-center flex-1 z-10 text-balance">
                                             Illustrating Key Immutable Attributes: Verified Code, Fixed Supply, Revoked Mint.
                                             <span className="block mt-1 text-[9px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                                  Research: Trust Signals & Cognitive Anchoring
                                              </span>
                                         </p>
                                     </div>
                                 </div>
                            </CardContent>
                         </Card>
                    </motion.div>
                </div>
            </Section>
         </TooltipProvider>
    );
}
// --- END OF FILE components/sections/05_Tokenomics.tsx ---