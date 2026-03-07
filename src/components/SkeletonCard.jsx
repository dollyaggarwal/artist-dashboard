export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 dark:bg-gray-800" />

      <div className="p-4">
        {/* Category badge */}
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full mb-2" />

        {/* Name */}
        <div className="h-5 w-36 bg-gray-200 dark:bg-gray-800 rounded mb-2" />

        {/* Location */}
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded mb-3" />

        {/* Followers */}
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4" />

        {/* Buttons */}
        <div className="flex gap-2">
          <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="w-10 h-9 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
