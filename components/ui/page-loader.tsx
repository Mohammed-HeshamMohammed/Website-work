// components/ui/page-loader.tsx

interface PageLoaderProps {
     message?: string;
   }
   
   export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
     return (
       <div className="flex items-center justify-center h-96">
         <div className="text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
           <p>{message}</p>
         </div>
       </div>
     );
   }