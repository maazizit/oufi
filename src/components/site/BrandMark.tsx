import Image from "next/image";

export function BrandMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={`brand-mark ${className}`.trim()} style={{ width: size, height: size }}>
      <Image
        src="/brand/amanplanet-logo.png"
        alt="AMANPLANET"
        width={size * 2}
        height={size * 2}
        className="brand-mark-img"
        style={{ width: size, height: size }}
        priority
      />
    </span>
  );
}
