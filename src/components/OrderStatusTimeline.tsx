import React from 'react';
import { CheckCircle2, Circle, Truck, Package, Home } from 'lucide-react'; // Example icons
import { cn } from "@/lib/utils";

interface TimelineStatus {
  id: string | number;
  name: string;
  date?: string;
  completed: boolean;
  current?: boolean;
  icon?: React.ReactNode;
}

interface OrderStatusTimelineProps {
  statuses: TimelineStatus[];
  orientation?: 'vertical' | 'horizontal';
}

const getDefaultIcon = (statusName: string) => {
  if (statusName.toLowerCase().includes('placed')) return <Package className="h-5 w-5" />;
  if (statusName.toLowerCase().includes('shipped')) return <Truck className="h-5 w-5" />;
  if (statusName.toLowerCase().includes('delivered')) return <Home className="h-5 w-5" />;
  return <Circle className="h-5 w-5" />;
};

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  statuses,
  orientation = 'vertical',
}) => {
  console.log("Rendering OrderStatusTimeline with statuses:", statuses.length);

  if (!statuses || statuses.length === 0) {
    return <p className="text-muted-foreground">No status information available.</p>;
  }

  return (
    <div className={cn("flex", orientation === 'vertical' ? "flex-col" : "flex-row items-start justify-between")}>
      {statuses.map((status, index) => {
        const isLast = index === statuses.length - 1;
        const IconComponent = status.completed ? CheckCircle2 : (status.icon || getDefaultIcon(status.name));

        return (
          <div
            key={status.id}
            className={cn(
              "flex",
              orientation === 'vertical' ? "flex-row items-start" : "flex-col items-center text-center flex-1",
              !isLast && (orientation === 'vertical' ? "pb-8" : "pr-4")
            )}
          >
            {/* Icon and Line */}
            <div className={cn(
                "flex",
                orientation === 'vertical' ? "flex-col items-center mr-4" : "flex-row items-center mb-2"
            )}>
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  status.completed ? "bg-green-500 text-white" : (status.current ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300")
                )}
              >
                {status.completed ? <CheckCircle2 className="h-5 w-5" /> : IconComponent}
              </span>
              {!isLast && (
                <div
                  className={cn(
                    "flex-auto",
                    orientation === 'vertical' ? "h-full w-0.5" : "w-full h-0.5",
                    status.completed ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700",
                    orientation === 'vertical' ? "min-h-[2rem]" : "min-w-[2rem]"
                  )}
                />
              )}
            </div>

            {/* Text Content */}
            <div className={cn("flex-grow", orientation === 'horizontal' && "w-full")}>
              <h3 className={cn(
                  "font-semibold",
                  status.completed ? "text-green-700 dark:text-green-400" : (status.current ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-gray-200")
                )}
              >
                {status.name}
              </h3>
              {status.date && (
                <p className="text-xs text-muted-foreground">{status.date}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusTimeline;