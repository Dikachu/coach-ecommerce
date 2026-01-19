import React from "react";

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      {events.map((event, index) => (
        <div key={event.id} className="relative pb-8 last:pb-0">
          {/* Timeline Line */}
          {index !== events.length - 1 && (
            <div
              className={`absolute left-4 top-8 w-0.5 h-full ${
                event.completed ? "bg-black" : "bg-gray-300"
              }`}
            />
          )}

          {/* Timeline Item */}
          <div className="flex gap-4">
            {/* Icon */}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                event.completed ? "bg-black" : "bg-gray-300"
              }`}
            >
              {event.completed ? (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <div className="w-3 h-3 rounded-full bg-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h4
                  className={`font-semibold ${
                    event.completed ? "text-black" : "text-gray-500"
                  }`}
                >
                  {event.title}
                </h4>
                <div className="text-right flex-shrink-0">
                  <p
                    className={`text-xs ${
                      event.completed ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {event.date}
                  </p>
                  <p
                    className={`text-xs ${
                      event.completed ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {event.time}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm ${
                  event.completed ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {event.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;