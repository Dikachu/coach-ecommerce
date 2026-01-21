export const RenderStar = ({index, rating} : {index: number, rating: number}) => {
    const isFull = rating >= index;
    const isHalf = !isFull && rating >= index - 0.5;
    // console.log(isFull, isHalf);
    

    return (
        <svg
            className={`w-5 h-5 ${isFull ? "text-primary" : "text-gray-300"} `}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            {isHalf && (
                <defs>
                    <linearGradient id={`half-grad-${index - 1}`} x1="0" x2="1">
                        <stop offset="50%" stopColor="#b9855e" />
                        <stop offset="50%" stopColor="#d1d5db" />
                    </linearGradient>
                </defs>
            )}
            <path
                fill={isHalf ? `url(#half-grad-${index - 1})` : "currentColor"}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
        </svg>
    )
}