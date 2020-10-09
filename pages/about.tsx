import Link from 'next/link';

function About() {
  return (
    <div>
      <Link href="/">
        <a>Go back to main page</a>
      </Link>
      <h3>About weather APP</h3>
    </div>
  );
}

export default About;
