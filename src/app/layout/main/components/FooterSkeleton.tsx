import { Skeleton } from "@/components/ui/skeleton"

const FooterSkeleton = () => {
  return (
    <footer className="bg-white border-t-4 border-primary-light py-12 px-8" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + text */}
        <div>
          <Skeleton className="w-32 h-10 mb-4" />
          <Skeleton className="h-3 w-3/4 mb-2" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        {/* Links */}
        <div>
          <Skeleton className="h-4 w-1/3 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>

        {/* Contact */}
        <div>
          <Skeleton className="h-4 w-1/3 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>

          <div className="flex gap-4 mt-4">
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="w-9 h-9 rounded-full" />
          </div>
        </div>

      </div>

      <div className="text-center mt-10">
        <Skeleton className="h-3 w-1/3 mx-auto" />
      </div>
    </footer>
  )
}

export default FooterSkeleton
