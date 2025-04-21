// --- START OF FILE components/sections/05_Tokenomics.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"; // Removed unused TableHead, TableHeader
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChartHorizontal, Check, CheckCircle, Circle, Copy, Droplets, ExternalLink, FileText, Gift, GitCommitVertical, Info, Lock, Megaphone, MinusCircle, PieChart as PieChartIcon, Target, Users } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer, Sector } from 'recharts';
import { toast } from "sonner";

// --- Enhanced Data & Constants ---
interface AllocationItem {
    name: string;
    value: number; // Percentage
    color: string; // Light mode color
    darkColor: string; // Dark mode color
    description: string;
    icon: React.ElementType; // Add icon for each category
}

const distributionData: AllocationItem[] = [
    { name: "Liquidity & Public Sale", value: 40, color: "#8b5cf6", darkColor: "#a78bfa", description: "Ensures initial DEX liquidity on Raydium, locked via PinkLock, and funds potential controlled public sale rounds.", icon: Droplets }, // Violet
    { name: "Ecosystem Growth & Marketing", value: 10, color: "#10b981", darkColor: "#34d399", description: "Powers marketing campaigns, strategic partnerships, community initiatives, and future ecosystem development.", icon: Megaphone }, // Green
    { name: "Team Allocation (Vested)", value: 10, color: "#f59e0b", darkColor: "#fcd34d", description: "Subject to a transparent 6-month linear vesting schedule, aligning team incentives with long-term project success.", icon: Users }, // Amber
    { name: "Exchange Listings & Treasury", value: 40, color: "#3b82f6", darkColor: "#60a5fa", description: "Reserved and securely locked for future CEX/DEX listing fees, market making, and strategic treasury use for long-term stability and expansion.", icon: Target }, // Blue
];

const TOTAL_SUPPLY = 1_000_000_000;
const contractAddress = "ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f"; // Ensure this is correct
const explorerBaseUrl = "https://solscan.io/token/";
const explorerLink = `${explorerBaseUrl}${contractAddress}`;
const pinkLockLink = "#"; // REPLACE with actual PinkLock URL
const auditLink = "#"; // REPLACE with actual CertiK URL
const vestingContractLink = "#"; // REPLACE with vesting contract link if applicable


const tokenDetails = [
    { key: "Token Name", value: "$ROACH (Antifragile)", icon: Gift }, // Changed icon
    { key: "Ticker", value: "$ROACH", icon: null },
    { key: "Network", value: "Solana (SPL)", icon: GitCommitVertical }, // Changed icon
    { key: "Total Supply", value: TOTAL_SUPPLY.toLocaleString(), icon: BarChartHorizontal, tooltip: "Fixed supply, ensuring scarcity. Mint authority permanently revoked.", immutable: true },
    { key: "Contract Address", value: contractAddress, icon: FileText, isAddress: true, link: explorerLink, tooltip: "View the verified and immutable contract on Solscan.", immutable: true },
    { key: "Security Audit", value: "CertiK (Passed)", icon: CheckCircle, link: auditLink, tooltip: "Comprehensive security audit completed by CertiK. Click for report.", external: true },
    { key: "Initial Liquidity", value: "Locked (12 Months)", icon: Lock, link: pinkLockLink, tooltip: "Raydium LP tokens locked via PinkLock for 12 months. Click to verify.", external: true },
    { key: "Team Vesting", value: "6 Months Linear", icon: Users, link: vestingContractLink, tooltip: "Team tokens unlock gradually over 6 months via smart contract. Click to view.", external: true }, // Added vesting link
    { key: "Mint Authority", value: "Revoked", icon: MinusCircle, tooltip: "No new tokens can ever be created.", immutable: true }, // Explicitly stated
];
// --------------------

// --- Recharts Customizations ---
// OK: Styling props passed to low-level charting elements
const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 6) * cos; // Line start point
    const sy = cy + (outerRadius + 6) * sin;
    const mx = cx + (outerRadius + 18) * cos; // Line mid point
    const my = cy + (outerRadius + 18) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 15; // Line end point
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const Icon = payload.icon || PieChartIcon; // Use provided icon or fallback

    return (
        <g className="transition-transform duration-300 ease-out" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}> {/* Use style for filter */}
            {/* Main Sector */}
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} stroke="var(--color-background)" strokeWidth={2} />
            {/* Active Outer Ring */}
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 2} outerRadius={outerRadius + 6} fill={fill} opacity={0.7} />
            {/* Label Line */}
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={1.5} />
            <circle cx={ex} cy={ey} r={3} fill={fill} stroke="var(--color-background)" strokeWidth={1} />
            {/* Text Label */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="var(--color-foreground)" dy={-8} className="text-xs font-semibold">{`${payload.name}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="var(--color-muted-foreground)" dy={8} className="text-xs font-mono">{`${(percent * 100).toFixed(0)}% (${(value / 100 * TOTAL_SUPPLY).toLocaleString()})`}</text>
            {/* Icon near center */}
            {Icon && <Icon x={cx - 10} y={cy - 10} height="20" width="20" fill={fill} opacity={0.5} />}
        </g>
    );
};

// OK: Tooltip content styling is specific to the tooltip
const CustomTooltip = ({ active, payload, theme }: { active?: boolean; payload?: any[]; theme: 'light' | 'dark' }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as AllocationItem; // Type assertion
        const color = theme === 'dark' ? data.darkColor || data.color : data.color;
        const Icon = data.icon;
        return (
            <div className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-3 text-xs max-w-[220px] backdrop-blur-sm">
                <div className="flex items-center gap-2 font-bold mb-1.5 border-b border-border/30 pb-1">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    {data.name} ({data.value}%)
                </div>
                <p className="text-muted-foreground mb-1.5"><strong className="text-foreground">Tokens:</strong> {(data.value / 100 * TOTAL_SUPPLY).toLocaleString()}</p>
                {data.description && <p className="text-muted-foreground text-balance leading-snug">{data.description}</p>}
            </div>
        );
    }
    return null;
};

// OK: Legend content styling is specific to the legend
const renderLegend = ({ payload, theme, onMouseEnter, onMouseLeave, activeIndex }: { payload?: any[], theme: 'light' | 'dark', onMouseEnter: Function, onMouseLeave: Function, activeIndex: number | null }) => {
    if (!payload) return null;
    return (
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 text-xs px-2">
            {payload.map((entry: any, index: number) => {
                const data = entry.payload as AllocationItem;
                const color = theme === 'dark' ? data.darkColor || data.color : data.color;
                const Icon = data.icon || Circle; // Fallback icon
                const isActive = index === activeIndex;
                return (
                     // OK: Interaction/state styles
                    <li key={`item-${index}`}
                        className={cn("flex items-center cursor-pointer transition-all duration-200 transform hover:scale-105", isActive ? "opacity-100 scale-105" : "opacity-70 hover:opacity-100")}
                        onMouseEnter={() => onMouseEnter(data, index)}
                        onMouseLeave={() => onMouseLeave()}
                    >
                         {/* OK: Inline style for dynamic color */}
                        <Icon className="h-3.5 w-3.5 mr-1.5 shrink-0" style={{ color }} />
                        <span className="text-muted-foreground">{data.name} ({data.value}%)</span>
                    </li>
                );
            })}
        </ul>
    );
};
// ---------------------------


export function Tokenomics() {
    const [copied, setCopied] = useState<Record<string, boolean>>({}); // Track copied state per item
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Theme Detection Effect
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    setTheme(isDark ? 'dark' : 'light');
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        // Initial check
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        return () => observer.disconnect();
    }, []);


    // --- Copy Handler ---
    const handleCopy = useCallback((textToCopy: string, key: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied({ [key]: true }); // Set copied state for this specific item
            toast.success(`${key} copied to clipboard!`);
            setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2500); // Reset after timeout
        }).catch(err => {
            console.error("Copy failed:", err);
            toast.error(`Failed to copy ${key}.`);
        });
    }, []); // Empty dependency array


    // --- Pie Chart Interaction Handlers ---
    const onPieEnter = useCallback((_: any, index: number) => setActiveIndex(index), []);
    const onPieLeave = useCallback(() => setActiveIndex(null), []); // Clear active index on leave

    // Animation Variants
    const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
    const tableRowVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } };

    return (
        <TooltipProvider>
            {/* OK: Layout background gradient */}
            <Section id="tokenomics" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/15 to-background dark:from-background/15 dark:to-background">
                <SectionHeader
                    title="Tokenomics: Architected for Antifragility"
                    description="A meticulously planned, fixed-supply structure underpins the $ROACH ecosystem. Allocation balances initial needs with long-term resources for growth, stability, and community benefit."
                    subtitle={<><PieChartIcon className="inline h-4 w-4 mr-1.5" /> Supply & Allocation </>}
                    alignment="center" className="mb-16" // OK: Layout margin
                />

                 {/* OK: Layout grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto items-stretch">
                    {/* --- Distribution Chart Card (Span 3 columns) --- */}
                    <motion.div className="lg:col-span-3" variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                         {/* Card: Removed shadow-lg, hover:shadow-xl, border overrides. Added h-full for layout. */}
                        <Card className="h-full flex flex-col">
                             {/* CardHeader relies on Card gap. */}
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl font-semibold">Token Allocation Breakdown</CardTitle> {/* OK: Text style */}
                                <CardDescription>Total Fixed Supply: <strong className="text-foreground font-mono">1,000,000,000</strong> $ROACH (Mint Revoked)</CardDescription> {/* OK: Text style */}
                            </CardHeader>
                            {/* CardContent relies on Card gap. */}
                            <CardContent className="flex-grow flex flex-col justify-center"> {/* OK: Layout */}
                                 {/* AspectRatio OK */}
                                <AspectRatio ratio={16 / 11} className="w-full min-h-[350px] md:min-h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {/* PieChart styling handled internally by recharts/chart.tsx */}
                                        <PieChart>
                                            {/* ... defs, tooltip, pie, legend */}
                                            <defs>
                                                <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                                                </linearGradient>
                                            </defs>
                                            <RechartsTooltip
                                                content={<CustomTooltip theme={theme} />}
                                                cursor={{ fill: 'hsl(var(--accent) / 0.2)', stroke: 'hsl(var(--border) / 0.5)', strokeWidth: 1 }}
                                                wrapperStyle={{ zIndex: 50 }}
                                            />
                                            <Pie
                                                activeIndex={activeIndex ?? -1}
                                                activeShape={renderActiveShape}
                                                data={distributionData}
                                                cx="50%" cy="45%"
                                                labelLine={false}
                                                outerRadius="75%" innerRadius="50%"
                                                fill="#8884d8" paddingAngle={2} dataKey="value"
                                                stroke="var(--color-card)" strokeWidth={3}
                                                onMouseEnter={onPieEnter}
                                                onMouseLeave={onPieLeave}
                                            >
                                                {distributionData.map((entry, index) => (
                                                     // OK: Dynamic fill based on state
                                                    <Cell key={`cell-${index}`} fill={theme === 'dark' ? entry.darkColor || entry.color : entry.color} />
                                                ))}
                                            </Pie>
                                            <Legend
                                                content={(props) => renderLegend({ ...props, theme: theme, onMouseEnter: onPieEnter, onMouseLeave: onPieLeave, activeIndex: activeIndex })}
                                                verticalAlign="bottom"
                                                wrapperStyle={{ paddingTop: '15px' }} // OK: Specific style for chart element
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </AspectRatio>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* --- Token Details Card (Span 2 columns) --- */}
                    <motion.div className="lg:col-span-2" variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 }}>
                        {/* Card: Removed shadow-lg, hover:shadow-xl, border overrides. Added h-full. */}
                        <Card className="h-full flex flex-col">
                             {/* CardHeader relies on Card gap. */}
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl font-semibold">Core Token Attributes</CardTitle> {/* OK: Text style */}
                                <CardDescription>Immutable properties and security verifications.</CardDescription> {/* OK: Text style */}
                            </CardHeader>
                             {/* CardContent relies on Card gap. */}
                            <CardContent className="flex-grow flex flex-col">
                                <div className="flex-grow"> {/* OK: Layout */}
                                     {/* Table uses base component. */}
                                    <Table>
                                         {/* TableBody uses base component. */}
                                        <TableBody>
                                            {tokenDetails.map((item, index) => (
                                                //  {/* TableRow uses base component. className for hover/state/layout OK */}
                                                <motion.tr
                                                    key={item.key}
                                                    className="border-b last:border-b-0 hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors align-top h-[50px]" // OK: Specific row height/align/hover for this context
                                                    variants={tableRowVariants}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true, amount: 0.8 }}
                                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                                >
                                                     {/* TableCell uses base component. className for text/layout/contextual styles OK */}
                                                    <TableCell className="font-medium text-muted-foreground text-xs align-middle py-2 pr-2 w-[120px] whitespace-nowrap">
                                                        <div className="flex items-center gap-1.5"> {/* OK: Layout */}
                                                             {/* OK: Contextual icon color */}
                                                            {item.icon && <item.icon className={cn("h-4 w-4 shrink-0", item.immutable ? "text-primary opacity-90" : "opacity-70")} />}
                                                            {item.key}
                                                            {item.tooltip && (
                                                                <Tooltip delayDuration={100}>
                                                                    <TooltipTrigger className="cursor-help flex items-center ml-auto"><Info className="h-3 w-3 text-muted-foreground/60" /></TooltipTrigger> {/* OK: Trigger style */}
                                                                    <TooltipContent side="left" align="start"><p className="max-w-[200px] text-xs">{item.tooltip}</p></TooltipContent>
                                                                </Tooltip>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    {/* TableCell: Styling for layout and text OK */}
                                                    <TableCell className="text-sm font-medium py-2 align-middle">
                                                        <div className="flex items-center gap-1"> {/* OK: Layout */}
                                                            {item.link && item.link !== '#' && item.link !== "#roadmap" ? (
                                                                // Link styling OK here as it's a specific link usage
                                                                <Link href={item.link} target={item.external || item.isAddress ? "_blank" : "_self"} rel={item.external || item.isAddress ? "noopener noreferrer" : undefined} className="hover:text-primary hover:underline transition-colors duration-200 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm" title={item.tooltip || `View ${item.key}`}>
                                                                    {/* OK: Specific text styles for address display */}
                                                                    <span className={item.isAddress ? "font-mono text-xs block truncate max-w-[120px] sm:max-w-[150px]" : ""}>{item.value}</span>
                                                                    {/* OK: Group interaction style */}
                                                                    {(item.external || item.isAddress) && <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-200 shrink-0" />}
                                                                </Link>
                                                            ) : item.link === "#roadmap" ? ( // Special case for internal roadmap link
                                                                // Internal Link uses same styling approach
                                                                <Link href="#roadmap" className="hover:text-primary hover:underline transition-colors duration-200 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm" title={item.tooltip || `View ${item.key}`}>
                                                                    {item.value}
                                                                </Link>
                                                            ) : (
                                                                // OK: Specific text styles for address display
                                                                <span className={item.isAddress ? "font-mono text-xs block truncate max-w-[120px] sm:max-w-[150px]" : ""}>{item.value}</span>
                                                            )}
                                                            {item.isAddress && (
                                                                <Tooltip delayDuration={100}>
                                                                    <TooltipTrigger asChild>
                                                                        {/* Button uses base. Specific size/color OK for context */}
                                                                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => handleCopy(item.value, item.key)} aria-label={`Copy ${item.key}`}>
                                                                             {/* OK: State-based icon/color */}
                                                                            {copied[item.key] ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
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

                                {/* Immutable Properties Visual Placeholder */}
                                 {/* OK: Layout and placeholder styling */}
                                <div className="mt-auto pt-4 border-t border-border/10 dark:border-border/20 px-1">
                                    <div className="relative bg-muted/30 dark:bg-muted/10 border border-dashed border-primary/30 rounded-md p-3 flex items-center justify-center gap-4 min-h-[60px]">
                                        <FileText className="h-5 w-5 text-primary opacity-70" />
                                        <MinusCircle className="h-5 w-5 text-primary opacity-70" />
                                        <BarChartHorizontal className="h-5 w-5 text-primary opacity-70" />
                                        <p className="text-xs text-muted-foreground/80 italic text-center flex-1">
                                            Illustrating immutability: Fixed Supply, Revoked Mint, Verified Code.
                                            <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                                Research: Trust Signals...
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

// --- END OF FILE components/sections/Tokenomics.tsx ---