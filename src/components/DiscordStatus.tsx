"use client";

import React, { useEffect, useState } from "react";
import { Music, Radio, Disc, Code, Monitor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface LanyardSpotify {
  track_id: string;
  timestamps: { start: number; end: number };
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
}

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  timestamps?: {
    start?: number;
    end?: number;
  };
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    display_name?: string;
    global_name?: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_web?: boolean;
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  spotify: LanyardSpotify | null;
  activities: LanyardActivity[];
}

const DISCORD_USER_ID = "1462496241693753558";

export function DiscordStatus() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Initial fetch via REST
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch {
        // Silently fallback
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Setup WebSocket subscription for real-time presence changes
    let socket: WebSocket | null = null;
    let heartbeatInterval: NodeJS.Timeout | null = null;

    try {
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onopen = () => {
        socket?.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: DISCORD_USER_ID,
            },
          })
        );
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { op, t: eventType, d } = message;

          if (op === 1) {
            const heartbeatMs = d.heartbeat_interval;
            heartbeatInterval = setInterval(() => {
              try {
                if (socket?.readyState === WebSocket.OPEN) {
                  socket.send(JSON.stringify({ op: 3 }));
                }
              } catch {
                // Silent catch
              }
            }, heartbeatMs);
          } else if (eventType === "INIT_STATE" || eventType === "PRESENCE_UPDATE") {
            if (d) {
              setData(d);
            }
          }
        } catch {
          // Silent catch
        }
      };

      socket.onerror = () => {
        // Handle socket errors silently without throwing noisy console error overlays
      };
    } catch {
      // Silent catch
    }

    const pollInterval = setInterval(fetchStatus, 15000);

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (pollInterval) clearInterval(pollInterval);
      if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, []);

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 animate-pulse flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-500/20"></div>
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 w-28 bg-purple-500/20 rounded"></div>
          <div className="h-2.5 w-40 bg-purple-500/10 rounded"></div>
        </div>
      </div>
    );
  }

  const user = data?.discord_user;
  const status = data?.discord_status || "offline";
  const spotify = data?.spotify;
  const customActivity = data?.activities?.find((a) => a.type === 4);
  const codingActivity = data?.activities?.find((a) => a.name !== "Custom Status" && a.type !== 2);

  const statusColors = {
    online: {
      dot: "bg-emerald-500",
      ping: "bg-emerald-400",
      badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
      label: t("online_discord"),
    },
    idle: {
      dot: "bg-amber-500",
      ping: "bg-amber-400",
      badge: "bg-amber-500/10 border-amber-500/20 text-amber-300",
      label: t("away_idle"),
    },
    dnd: {
      dot: "bg-rose-500",
      ping: "bg-rose-400",
      badge: "bg-rose-500/10 border-rose-500/20 text-rose-300",
      label: t("dnd_status"),
    },
    offline: {
      dot: "bg-purple-500/60",
      ping: "bg-purple-400/40",
      badge: "bg-purple-500/10 border-purple-500/20 text-purple-300",
      label: t("offline_status"),
    },
  };

  const statusConfig = statusColors[status];
  const avatarUrl = "/profile/avatar.jpg";

  // Process Spotify Album Art URL format
  let spotifyArtUrl = spotify?.album_art_url || "";
  if (spotifyArtUrl.startsWith("//")) {
    spotifyArtUrl = `https:${spotifyArtUrl}`;
  }

  return (
    <div className="w-full space-y-3.5 p-4 sm:p-5 rounded-xl bg-purple-950/30 backdrop-blur-md border border-purple-500/20 shadow-lg shadow-purple-950/20">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-purple-500/10 pb-3">
        <div className="flex items-center gap-3">
          {/* Avatar with live status indicator ring */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-purple-500/40 flex-shrink-0 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt={user?.username || "henox"} className="w-full h-full object-cover" />
            <span
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-black ${statusConfig.dot}`}
              title={statusConfig.label}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-sm text-ink">
                {user?.global_name || user?.display_name || "henox"}
              </span>
              <span className="font-mono text-[11px] text-purple-300/70">
                @{user?.username || "henox"}
              </span>
            </div>
            {customActivity?.state && (
              <p className="font-sans text-xs text-purple-200/80 mt-0.5 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
                <span>{customActivity.state}</span>
              </p>
            )}
          </div>
        </div>

        {/* Live Status Badge */}
        <div className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-medium flex items-center gap-1.5 ${statusConfig.badge}`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.ping}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.dot}`} />
          </span>
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Live Spotify Music Player */}
      {spotify ? (
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/25 flex items-center gap-3">
          {/* Album Cover Art */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-purple-400/30 shadow-lg bg-purple-950">
            {spotifyArtUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={spotifyArtUrl}
                alt={spotify.album || spotify.song}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-900/40">
                <Disc className="w-6 h-6 text-purple-300 animate-spin" />
              </div>
            )}
            <div className="absolute bottom-0.5 right-0.5 p-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-purple-500/40">
              <Disc className="w-3 h-3 text-purple-300 animate-spin" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300 font-semibold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
              <span>{t("listening_spotify")}</span>
            </div>
            <p className="font-sans text-xs font-semibold text-ink truncate mt-0.5">
              {spotify.song}
            </p>
            <p className="font-sans text-[11px] text-purple-200/70 truncate">
              {t("by_artist")} {spotify.artist}
            </p>
          </div>
        </div>
      ) : codingActivity ? (
        /* Active Activity / Coding Status */
        <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/15 flex items-center gap-3">
          <div className="p-2 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Code className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[11px] font-medium text-purple-300 uppercase tracking-wider">
              {t("active_activity")}
            </span>
            <p className="font-sans text-xs font-semibold text-ink truncate">
              {codingActivity.name}
            </p>
            {codingActivity.details && (
              <p className="font-sans text-[11px] text-purple-200/70 truncate">
                {codingActivity.details}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs font-mono text-purple-300/70 pt-0.5">
          <Monitor className="w-3.5 h-3.5 text-purple-400/80" />
          <span>{t("active_dev")}</span>
        </div>
      )}
    </div>
  );
}

export default DiscordStatus;
