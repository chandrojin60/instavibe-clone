interface ConnectionStatusProps {
  status: "connecting" | "connected" | "disconnected" | "reconnecting";
}

export default function ConnectionStatus({ status }: ConnectionStatusProps) {
  if (status === "connected") return null;

  const config = {
    connecting: { color: "bg-yellow-500", text: "Connecting..." },
    reconnecting: { color: "bg-yellow-500", text: "Reconnecting..." },
    disconnected: { color: "bg-destructive", text: "Disconnected" },
  };

  const { color, text } = config[status];

  return (
    <div className={`flex items-center justify-center gap-2 py-1 text-xs text-white ${color}`}>
      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      {text}
    </div>
  );
}
