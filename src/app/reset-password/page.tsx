import { Suspense } from 'react';
import ResetPasswordForm from './form';

// A component to show while the form with client-side hooks is loading.
function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Suspense fallback={<Loading />}>
            <ResetPasswordForm />
        </Suspense>
    </div>
  );
}
