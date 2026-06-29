type AlertProps = {
  type: "error" | "success";
  children: React.ReactNode;
};

export function Alert({ type, children }: AlertProps) {
  return (
    <div className={`alert alert-${type}`} role={type === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}
