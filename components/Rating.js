export default function Rating({ value }) {
  const yellowStar = (
    <svg
      className="w-4 h-4 fill-current text-yellow-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  )
  const grayStar = (
    <svg
      className="w-4 h-4 fill-current text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  )

  return (
    <div className="flex items-center mt-1">
      {Array.from({ length: 5 }, (item, i) => (Math.round(value) >= i + 1 ? yellowStar : grayStar))}
    </div>
  )
}
