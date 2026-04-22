type TableProps = {
  children: React.ReactNode;
};

export default function Table({ children }: TableProps) {
  return (
    <div
      style={{
        overflowX: "auto",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        {children}
      </table>
    </div>
  );
}
