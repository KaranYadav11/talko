import { Skeleton } from "../ui/skeleton"; // Adjust the import path as needed

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 ${
            idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* Avatar skeleton */}
          <div className="flex-shrink-0">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* Message details */}
          <div>
            <div className="mb-1">
              <Skeleton className="h-4 w-16" />
            </div>
            <div>
              <Skeleton className="h-16 w-[200px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
