export default function TopBar({ cartCount }) {
  return (
    <header className="sticky top-0 z-10 h-[54px] bg-black">
      <div className="mx-auto flex h-full max-w-[420px] items-center justify-end px-4">
        <button
          type="button"
          aria-label="장바구니"
          className="relative grid h-9 w-9 place-items-center rounded-xl text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-[22px] w-[22px]"
            aria-hidden="true"
          >
            <path
              d="M6.5 9.5H18.2L17.2 20H7.5L6.5 9.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 9.5V7.2C9 5.4 10.4 4 12.2 4C14 4 15.4 5.4 15.4 7.2V9.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          {cartCount > 0 && (
            <span className="absolute right-[2px] top-[2px] min-w-[18px] rounded-full bg-white px-[5px] text-center text-[12px] font-extrabold leading-[18px] text-black">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
