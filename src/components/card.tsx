type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      {title ? <h3 style={{ marginBottom: "12px" }}>{title}</h3> : null}
      {children}
    </div>
  );
}
