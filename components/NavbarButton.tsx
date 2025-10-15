"use client";

export default function NavbarButton({ label, targetId }: { label: string; targetId: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = document.querySelector("#fullpage");
    const target = document.querySelector(`#${targetId}`);
    if (container && target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 hover:opacity-80 transition"
    >
      {label}
    </button>
  );
}
