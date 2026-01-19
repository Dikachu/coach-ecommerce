import Button from '@/components/ui/Button';

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* 404 Number */}
                <h1 className="text-9xl font-bold mb-4" style={{ color: '#b9855e' }}>
                    404
                </h1>

                {/* Message */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant='primary' text='Go Home' linkTo='/' />
                    <Button variant='outline' text='Browse Shop' linkTo='/shop' />
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;