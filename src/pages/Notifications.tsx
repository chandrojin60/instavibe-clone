import { mockNotifications } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const today = mockNotifications.filter((n) => ["2m", "15m", "1h", "3h", "5h"].includes(n.time));
  const earlier = mockNotifications.filter((n) => ["1d", "2d"].includes(n.time));

  return (
    <div className="px-4">
      <h1 className="text-lg font-semibold py-3">Notifications</h1>

      {today.length > 0 && (
        <>
          <h2 className="font-semibold text-sm py-2">Today</h2>
          {today.map((n) => (
            <NotificationItem key={n.id} {...n} />
          ))}
        </>
      )}

      {earlier.length > 0 && (
        <>
          <h2 className="font-semibold text-sm py-2 mt-2">Earlier</h2>
          {earlier.map((n) => (
            <NotificationItem key={n.id} {...n} />
          ))}
        </>
      )}
    </div>
  );
}

function NotificationItem({ avatar, username, text, time, type, postThumb, isFollowing }: typeof mockNotifications[0]) {
  return (
    <div className="flex items-center gap-3 py-2">
      <img src={avatar} alt={username} className="h-11 w-11 rounded-full" />
      <div className="flex-1 text-sm min-w-0">
        <span className="font-semibold">{username}</span>{" "}
        <span className="text-foreground">{text}</span>{" "}
        <span className="text-muted-foreground">{time}</span>
      </div>
      {postThumb && <img src={postThumb} alt="" className="h-11 w-11 object-cover" />}
      {type === "follow" && (
        <Button size="sm" variant={isFollowing ? "secondary" : "default"} className="h-8 text-xs font-semibold">
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  );
}
