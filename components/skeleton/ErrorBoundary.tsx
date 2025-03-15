function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="flex h-full items-center justify-center text-center text-red-500">
            ❌ 데이터 로드 중 오류가 발생했습니다: {error.message}
        </div>
    );
}

export default ErrorBoundary;