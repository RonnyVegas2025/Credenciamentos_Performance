type FilterProps = {
  label: string;
  children: React.ReactNode;
};

export default function Filter({ label, children }: FilterProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  );
}
