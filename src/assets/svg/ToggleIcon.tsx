export default function ToggleIcon({ on }) {
  return (
    <>
      {on ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
        >
          <rect y="2" width="24" height="10" rx="5" fill="#333333" />
          <circle cx="17" cy="7" r="6.5" fill="white" stroke="#333333" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
        >
          <rect y="2" width="24" height="10" rx="5" fill="#D9D9D9" />
          <circle cx="7" cy="7" r="6.5" fill="white" stroke="#D9D9D9" />
        </svg>
      )}
    </>
  );
}
