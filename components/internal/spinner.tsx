import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // Using lucide loader

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    text?: string; // Optional text below spinner
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
    };

    return (
        <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
            <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
            {text && <p className="text-sm text-muted-foreground mt-1">{text}</p>}
            <span className="sr-only">{text || 'Loading content...'}</span> {/* Accessibility */}
        </div>
    );
}