import { SwiggyIcon, ZomatoWordmark } from "@/components/icons";
import { site } from "@/lib/site";

const SWIGGY = "#FC8019";
const ZOMATO = "#E23744";

type Props = {
  /** "light": white buttons with coloured logos. "solid": buttons filled with each brand's colour. */
  variant?: "light" | "solid";
  size?: "sm" | "md";
  className?: string;
};

/** "Order on Swiggy / Zomato" buttons with the real logos. */
export function DeliveryLinks({ variant = "light", size = "sm", className }: Props) {
  const box = size === "md" ? "h-11 px-5 gap-2 text-base" : "h-9 px-3.5 gap-1.5 text-sm";
  const pin = size === "md" ? "h-5" : "h-4";
  const word = size === "md" ? "h-[18px]" : "h-[15px]";
  const base = `inline-flex items-center rounded-full font-bold tracking-tight transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${box}`;
  const light = "bg-white ring-1 ring-cocoa-900/10 shadow-sm";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      <a
        href={site.swiggyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on Swiggy"
        className={`${base} ${variant === "solid" ? "text-white" : light}`}
        style={variant === "solid" ? { backgroundColor: SWIGGY } : { color: SWIGGY }}
      >
        <SwiggyIcon className={`${pin} w-auto`} />
        Swiggy
      </a>
      <a
        href={site.zomatoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on Zomato"
        className={`${base} ${variant === "solid" ? "text-white" : light}`}
        style={variant === "solid" ? { backgroundColor: ZOMATO } : { color: ZOMATO }}
      >
        <ZomatoWordmark className={`${word} w-auto`} />
      </a>
    </div>
  );
}
