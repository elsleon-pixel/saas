export default function GlobalStyles() {
  return (
    <style>
      {`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          line-height: 1.5;
        }

        h1 {
          font-size: 24px;
          margin: 0 0 16px 0;
        }

        h2 {
          font-size: 20px;
          margin: 0 0 12px 0;
        }

        h3 {
          font-size: 18px;
          margin: 0 0 10px 0;
        }

        p {
          margin: 0 0 12px 0;
        }

        ul {
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}
    </style>
  );
}