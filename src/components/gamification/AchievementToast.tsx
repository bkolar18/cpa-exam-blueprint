"use client";

import { useEffect, useState } from "react";
import { TIER_CONFIG, type AchievementNotification } from "@/lib/gamification/types";

interface AchievementToastProps {
  notification: AchievementNotification;
  onClose: () => void;
  duration?: number;
}

export function AchievementToast({
  notification,
  onClose,
  duration = 5000,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const tierConfig = TIER_CONFIG[notification.item.tier];
  const isAchievement = notification.type === "achievement";
  const title = isAchievement ? "Achievement Unlocked!" : "Badge Earned!";

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    // Close after animation
    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div
        className="rounded-xl p-4 shadow-2xl border-2 bg-white"
        style={{
          backgroundImage: `linear-gradient(135deg, ${tierConfig.bgColor} 0%, rgba(255,255,255,1) 100%)`,
          borderColor: tierConfig.borderColor,
        }}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: tierConfig.bgColor, border: `2px solid ${tierConfig.color}` }}
          >
            <span className="text-2xl">{isAchievement ? "🏆" : "🎖️"}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ backgroundColor: tierConfig.color, color: "#000" }}
              >
                {notification.item.tier}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                +{notification.pointsEarned} pts
              </span>
            </div>

            <p className="text-sm font-medium text-[var(--muted-foreground)] mb-0.5">
              {title}
            </p>

            <h4 className="font-bold text-[var(--foreground)] truncate">
              {notification.item.name}
            </h4>

            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mt-1">
              {notification.item.description}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(onClose, 300);
            }}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Container component to manage multiple toasts
interface AchievementToastContainerProps {
  notifications: AchievementNotification[];
  onDismiss: (index: number) => void;
}

export function AchievementToastContainer({
  notifications,
  onDismiss,
}: AchievementToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {notifications.map((notification, index) => (
        <div key={`${notification.item.code}-${index}`} className="pointer-events-auto">
          <AchievementToast
            notification={notification}
            onClose={() => onDismiss(index)}
          />
        </div>
      ))}
    </div>
  );
}
