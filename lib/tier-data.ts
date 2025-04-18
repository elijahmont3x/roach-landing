// --- START OF FILE lib/tier-data.ts ---

// Define the structure for a Tier more formally
export interface DistributionDetail {
  reflection: number; // Percentage
  liquidity: number; // Percentage
  marketing: number; // Percentage (can rename to treasury, dev fund etc.)
}

export interface TierTaxes {
  buy: number; // Percentage
  sell: number; // Percentage
}

export interface Tier {
  id: number; // Unique ID (1-5)
  name: string; // Name of the tier (e.g., "Accumulation")
  condition: string; // The Sell/Buy Ratio condition that triggers this tier
  status: string; // A brief description of the market state this tier represents
  taxes: TierTaxes; // Buy and Sell tax percentages
  distribution: {
    // How taxes are distributed
    buy: DistributionDetail;
    sell: DistributionDetail;
  };
  icon?: React.ElementType; // Optional icon associated with the tier state
  colorClass?: string; // Optional base Tailwind class for styling (e.g., 'text-blue-500')
}

// Tier Data (From Whitepaper V2 - ensure percentages match)
export const tierData: Tier[] = [
  {
    id: 1,
    name: "Accumulation",
    condition: "Sell/Buy Ratio < 0.8",
    status: "Buying pressure outweighs selling; potential growth phase.",
    taxes: { buy: 4, sell: 6 },
    distribution: {
      buy: { reflection: 2.0, liquidity: 1.0, marketing: 1.0 },
      sell: { reflection: 3.0, liquidity: 2.0, marketing: 1.0 }, // Whitepaper: 3.0% Reflections, 2.0% Liq, 1.0% Mark.
    },
    colorClass: "blue", // Example association
  },
  {
    id: 2,
    name: "Equilibrium",
    condition: "Sell/Buy Ratio 0.8 - 1.2",
    status: "Market forces balanced; relative stability.",
    taxes: { buy: 5, sell: 7 },
    distribution: {
      buy: { reflection: 2.0, liquidity: 2.0, marketing: 1.0 }, // Whitepaper: 2.0% Reflect, 2.0% Liq, 1.0% Mark.
      sell: { reflection: 4.0, liquidity: 2.0, marketing: 1.0 }, // Whitepaper: 4.0% Reflections, 2.0% Liq, 1.0% Mark.
    },
    colorClass: "gray",
  },
  {
    id: 3,
    name: "Pressure",
    condition: "Sell/Buy Ratio 1.2 - 2.0",
    status: "Moderate selling pressure detected; defenses initiating.",
    taxes: { buy: 4, sell: 9 },
    distribution: {
      buy: { reflection: 2.0, liquidity: 1.0, marketing: 1.0 }, // Whitepaper: 2.0% Reflect, 1.0% Liq, 1.0% Mark.
      sell: { reflection: 6.0, liquidity: 2.0, marketing: 1.0 }, // Whitepaper: 6.0% Reflections, 2.0% Liq, 1.0% Mark.
    },
    colorClass: "yellow",
  },
  {
    id: 4,
    name: "Defense",
    condition: "Sell/Buy Ratio 2.0 - 3.0",
    status: "Significant selling pressure; stronger holder protection engaged.",
    taxes: { buy: 3, sell: 12 },
    distribution: {
      buy: { reflection: 1.0, liquidity: 1.0, marketing: 1.0 }, // Whitepaper: 1.0% Reflect, 1.0% Liq, 1.0% Mark.
      sell: { reflection: 8.0, liquidity: 2.0, marketing: 2.0 }, // Whitepaper: 8.0% Reflections, 2.0% Liq, 2.0% Mark.
    },
    colorClass: "orange",
  },
  {
    id: 5,
    name: "Recovery",
    condition: "Sell/Buy Ratio > 3.0",
    status: "Extreme selling pressure; maximum antifragile response active.",
    taxes: { buy: 2, sell: 15 },
    distribution: {
      buy: { reflection: 1.0, liquidity: 0.5, marketing: 0.5 }, // Whitepaper: 1.0% Reflect, 0.5% Liq, 0.5% Mark.
      sell: { reflection: 10.0, liquidity: 3.0, marketing: 2.0 }, // Whitepaper: 10.0% Reflections, 3.0% Liq, 2.0% Mark.
    },
    colorClass: "red",
  },
];

// Validate that percentages add up correctly (runtime check during development)
function validateDistribution(
  detail: DistributionDetail,
  totalTax: number,
  type: "Buy" | "Sell",
  tierId: number
) {
  const sum = detail.reflection + detail.liquidity + detail.marketing;
  // Use a small tolerance for floating point issues
  if (Math.abs(sum - totalTax) > 0.01) {
    console.warn(
      `Tier ${tierId} ${type} distribution (${sum}%) does not match total tax (${totalTax}%)`
    );
  }
}

tierData.forEach((tier) => {
  validateDistribution(tier.distribution.buy, tier.taxes.buy, "Buy", tier.id);
  validateDistribution(
    tier.distribution.sell,
    tier.taxes.sell,
    "Sell",
    tier.id
  );
});

// --- END OF FILE lib/tier-data.ts ---
